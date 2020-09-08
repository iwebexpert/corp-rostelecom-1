const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const config = require('./config')

const TodoItemsModel = require(path.join(__dirname, '..', 'models', 'todo'))
const UsersModel = require(path.join(__dirname, '..', 'models', 'users'))

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.ok = data => res.status(200).json({
        status: 200,
        error: '',
        data
    })
    res.err = (status, error) => res.status(status || 500).json({
        status: status || 500,
        error: error || 'Непредвиденная ошибка',
        data: null
    })
    next()
})

// Подключаем статику, чтобы не делать клиента отдельно
app.use(express.static(path.join(__dirname, '..', 'public')))

// Защищаем запросы API
const isAuthenticated = (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
        return res.err(403, 'Нет доступа')
    }
    const [, token] = req.headers.authorization.split(' ')
    jwt.verify(token, config.app.secret || '', (err, decoded) => {
        if (err) {
            return res.err(403, 'Нет доступа')
        }
        req.user = decoded
        next()
    })
}
app.use('/api*', isAuthenticated)
app.get('/api/todo', async (req, res) => {
    const list = await TodoItemsModel.find({}).lean()
    list.sort((a, b) => a.planned === b.planned ? 0 : (a.planned > b.planned ? 1 : -1))
    res.ok([
        { header: 'Важное' },
        { divider: true },
        ...list.filter(i => i.important),

        { header: 'Сделать сегодня' },
        { divider: true },
        ...list.filter(i => !i.important && i.planned <= new Date()),

        { header: 'Сделать позднее' },
        { divider: true },
        ...list.filter(i => !i.important && i.planned > new Date())
    ])
})
app.post('/api/todo', async (req, res) => {
    await (new TodoItemsModel({
        name: req.body.name || '',
        desc: req.body.desc || '',
        done: false,
        important: req.body.important || false,
        planned: req.body.planned || null,
        created: new Date()
    })).save()
    res.ok(true)
})
app.post('/api/todo/:id', async (req, res) => {
    await TodoItemsModel.findByIdAndUpdate(req.body._id, {
        name: req.body.name || '',
        desc: req.body.desc || '',
        done: req.body.done || false,
        important: req.body.important || false,
        planned: req.body.planned || null
    })
    res.ok(true)
})
app.delete('/api/todo/:id', async (req, res) => {
    await TodoItemsModel.findByIdAndDelete(req.params.id).exec()
    res.ok(true)
})

// Маршруты авторизации
app.get('/auth/logout', (req, res) => {
    req.logout()
    res.ok(true)
})
app.post('/auth/register', async (req, res) => {
    const { email, name, password } = req.body
    if (!password || !email) {
        return res.err(400, 'Не все обязательные поля заполнены')
    }
    const userExists = await UsersModel.exists({ email })
    if (userExists) {
        return res.err(400, 'Пользователь уже существует')
    }
    const user = await new UsersModel({
        email,
        name,
        password
    }).save()
    res.ok(true)
})
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.err(401, 'Не передан логин или пароль')
    }
    const user = await UsersModel.findOne({ email })
    if (!user) {
        return res.err(401, 'Пользователь не найден')
    }
    if (!user.validatePassword(password)) {
        return res.err(401, 'Неправильный логин/пароль')
    }
    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password
    res.ok({
        ...plainUser,
        token: jwt.sign(plainUser, config.app.secret || ''),
    })
})

// Подключаемся к БД и запускаем приложение
mongoose.connect(
    `mongodb+srv://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.base}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
app.listen(config.app.port, () => {
    console.log(`http://localhost:${config.app.port}`)
})