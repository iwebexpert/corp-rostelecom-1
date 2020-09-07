const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})


//Модели
const todoModel = require('./models/todo')
const usersModel = require('./models/users')

const app = express()

app.use(express.json())
app.use(cors())

const TOKEN_SECRET_KEY = 'fhkdsfhksdahfkdashfkudyshaifytias'


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
app.use('/todo', isAuthenticated)

app.get('/', (req, res) => {
    res.redirect('/todo')
})


//Работа с mongoDB
app.get('/todo', async (req, res) => {
    const {_id} = req.user
    const tasks = await todoModel.find({user: _id}).lean()

    res.status(200).json(tasks)
})


app.post('/todo', async (req, res) => {
    const {_id} = req.user
    const {title} = req.body

    const taskModel = new todoModel({
        user: _id,
        title: title,
        items: [{text: "Посмотреть вебинар"}, {text: "Сделать ДЗ"}]
    })
    taskModel.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }

        res.status(201).send(doc)
    })
})

app.get('/todo/:id', async (req, res) => {
    const {_id} = req.user
    const id = req.params.id
    const task = await todoModel.findById({_id: id, user: _id}).lean()

    if (!task) {
        res.status(400).json({message: "Задач не существует"})
        return
    }

    res.status(200).json(task)
})

app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const task = await todoModel.findByIdAndRemove(id, (err, obj) => {
        if (err) {
            res.status(400).json({error: 'Не удалось удалить список', id})
        } else {
            res.json(obj)
        }
    })
})


app.post('/register', async (req, res) => {
    const {repassword, ...restBody} = req.body

    if (restBody.password === repassword) {
        const user = new usersModel(restBody)
        await user.save()
        res.status(201).send()
    } else {
        res.status(400).json({message: 'User not exists'})
    }

})

app.post('/auth', async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(401).json({message: "Не передан логин или пароль"})
    }

    const user = await usersModel.findOne({email: username})

    if (!user) {
        return res.status(401).json({message: "Пользователь не найден"})
    }

    if (!user.validatePassword(password)) {
        return res.status(401).json({message: "Неправильный логин/пароль"})
    }

    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password

    res.status(200).json({
        ...plainUser,
        token: jwt.sign(plainUser, TOKEN_SECRET_KEY),
    })
})

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})


app.listen(4000, () => {
    console.log('Server started...')
})
