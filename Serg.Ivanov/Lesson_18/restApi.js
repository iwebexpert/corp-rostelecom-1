const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

// mongoose.connect('mongodb://localhost:27017/todolists?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

mongoose.connect('mongodb://root:1234@localhost:27017/todolists?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })


//Модели
const todolistsModel = require('./models/todolists')
const usersModel = require('./models/users')

const passport = require('./auth')

const app = express()

app.use(express.json())
app.use(cors())

const TOKEN_SECRET_KEY = 'fhkdsfhksdahfkdashfkudyshaifytiassfffdfd'

const isAuthenticated = (req, res, next) => {
    if (req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(' ')

        jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send()
            }

            req.user = decoded
            next()
        })
    } else {
        return res.status(403).send()
    }

}

//Проверка на авторизацию пользователя
app.use('/todolists', isAuthenticated)

app.get('/', (req, res) => {
    res.redirect('/todolists')
})

//Работа с mongoDB
app.get('/todolists', async (req, res) => {
    const { _id } = req.user
    const todolists = await todolistsModel.find({ user: _id }).lean()

    res.status(200).json(todolists)
})


app.post('/todolists', async (req, res) => {
    const { _id } = req.user
    const { dataList } = req.body

    const todolistModel = new todolistsModel({ user: _id, dataList, record: [{ time: "12-00", task: "Обед" }] })
    todolistModel.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }

        res.status(201).send(doc)
    })
})

app.get('/todolists/:id', async (req, res) => {
    const { _id } = req.user
    const id = req.params.id;
    const todolist = await todolistsModel.findById({ _id: id, user: _id }).lean()

    if (!todolist) {
        res.status(400).json({ message: "Записи не существует" })
        return
    }

    res.status(200).json(todolist)
})

app.delete('/todolists/:id', async (req, res) => {
    const id = req.params.id;
    const todolist = await todolistsModel.findByIdAndRemove(id, (err, obj) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить запись', id })
        } else {
            res.json(obj)
        }
    })
})


app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body
    if (restBody.password === repassword) {
        const user = new usersModel(restBody)
        await user.save()
        res.status(201).send()
    } else {
        res.status(400).json({ message: 'Пользователь не найден' })
    }

})

app.post('/auth', async (req, res) => {
    const { username, password } = req.body
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

    res.status(200).json({
        ...plainUser,
        token: jwt.sign(plainUser, TOKEN_SECRET_KEY),
    })
})

// app.get('/logout', (req, res) => {
//     req.logout()
//     res.redirect('/auth')
// })


app.listen(4000, () => {
    console.log('Server started...')
})