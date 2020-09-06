const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

//Конфиг подключения к БД
const config = require('./config')

const passport = require('./auth-jwt')

//Модель
const tasksModel = require('./models/tasks')
const usersModel = require('./models/users')

const app = express()

app.use(express.json())

//разрешить отдать fetch'у заголовок
app.use(cors({
    exposedHeaders: ['Authorization'],
}));

app.use(express.urlencoded({ extended: false }))

app.use(passport.initialize)

//Проверка на авторизацию пользователя
app.use('/tasks*', passport.authenticate)


//Прочитать список задач  пользователя user
app.get('/tasks', async (req, res) => {
    const { _id, ...user } = req.user
    console.log('tasks')
    console.log(user)
    const tasks = await tasksModel.list(_id)
    console.dir(tasks)
    res.status(200).json(tasks)

})

//Закрыть задачу
app.patch('/tasks', async (req, res) => {
    console.log(req.body)
    let id = req.body.undone
    let model_res
    if (req.body.done) {
        model_res = await tasksModel.update({ _id: id, done: true, closeDate: new Date() })
    } else {
        model_res = await tasksModel.update({ _id: id, done: false, closeDate: null })
    }
    res.status(200).json(model_res)
})

//Добавить задачу
app.post('/tasks', async (req, res) => {
    console.log(req.body)
    console.log(req.user)
    const { _id } = req.user
    let model_res = await tasksModel.add(_id, { name: req.body.name, desc: req.body.desc })
    res.status(201).json(model_res)
})

//Удалить задачу
app.delete('/tasks/:id', async (req, res) => {
    console.log(req.params)
    let model_res = await tasksModel.delete(req.params.id)
    res.status(200).json(model_res)
})

//Зарегестрировать пользователя
app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body
    const email = req.body.email

    const dbEmails = await usersModel.exists({ email: email })

    if (dbEmails) {
        console.log('User exist!!')
        res.status(409).json({ message: 'Пользователь уже существует' })
    }
    if (restBody.password === repassword && email.length > 0 && restBody.password.length > 0) {
        const user = new usersModel(restBody)
        await user.save()
        res.status(201).json(user)
    }
    res.status(401).json({ message: 'Неверный пароль' })
})

//Войти в систему
app.post('/auth', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const username = email

    if (!username || !password) {
        return res.status(401).json({ message: "Не передан логин или пароль" })
    }

    const user = await usersModel.findOne({ email: username })

    if (!user) {
        return res.status(401).json({ message: "Пользователь не найден" })
    }

    if (!user.validatePassword(password)) {
        return res.status(401).json({ message: "Неправильный логин/пароль" })
    }

    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password
    //записать JWT в заголовок ответа
    res.set('Authorization', 'Bearer ' + jwt.sign(plainUser, config.TOKEN_SECRET_KEY)).status(200).json({ ...plainUser })
})



app.get('/logout', (req, res) => {
    req.logout()
    return res.status(401).json({ message: "Logout" })
})


config.connectDb()
    .on('error', console.log)
    .on('disconnected', config.connectDb)
    .once('open', () => {
        app.listen(4000, () => {
            console.log('Server started...')
        })
    })

