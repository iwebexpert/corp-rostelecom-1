const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

// Подключаем настройки
const SECRET = '12qwasZX!23wesdXC!34erdfCV!'

// Подключаемся к БД и подключаем модели
mongoose.connect(`mongodb://localhost/local?authSource=admin&w=1`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
const TodoItemsModel = require(path.join(__dirname, 'models', 'todo'))
const UsersModel = require(path.join(__dirname, 'models', 'users'))

// Подключаем express, настраиваем middleware и точки входа запросов
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())
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
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'auth.html'))
})
app.post('/api/register', async (req, res) => {
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
    res.ok(user)
})
app.post('/api/login', async (req, res) => {
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
        user: plainUser,
        token: jwt.sign(plainUser, SECRET),
    })
})

// Массив уникальных пользователей в JSON-виде и функции для работы с ним
let jsonUsers = new Set()
const emitUsers = (socket = null) => {
    const emitter = socket || io
    const usersArray = Array.from(jsonUsers).map(i => JSON.parse(i))
    emitter.emit('users', usersArray)
}
const deleteUser = (socketInfo = null) => {
    jsonUsers.delete(JSON.stringify(socketInfo))
    emitUsers()
}

// Создаём сервер, подключаем и создаём сокет, настраиваем middleware и событие подключения
const http = require('http').createServer(app)
const io = require('socket.io')(http)
io.use((socket, next) => {
    const token = socket.handshake.query.token
    jwt.verify(token, SECRET, (err) => {
        if (err) {
            return next(new Error('Неправильный токен'))
        }
        next()
    })
    return next(new Error('Непредвиденная ошибка авторизации'))
})
io.on('connection', (socket) => {
    // При подключении клиента, автоматически отправляем ему список пользователей онлайн
    emitUsers(socket)

    // Переменная для определения, подключен ли пользователь
    let addedUser = false

    // При отключении, если пользователь был добавлен,
    // то удаляем его из массива и рассылаем список
    socket.on('disconnect', () => {
        if (!addedUser) {
            return
        }
        deleteUser(socket.info)
        addedUser = false
    })

    // При добавлении пользователя, если он ещё не был добавлен,
    // сохраняем его в сокете, добавляем в массив, рассылаем список
    socket.on('auth', (user) => {
        socket.info = user
        const jsonUser = JSON.stringify(socket.info)
        if (!addedUser) {
            jsonUsers.add(jsonUser)
        } else {
            const usersArray = Array.from(jsonUsers)
            const index = usersArray.findIndex(i => JSON.parse(i).id === socket.info.id)
            usersArray[index] = jsonUser
            jsonUsers = new Set(usersArray)
        }
        addedUser = true
        emitUsers()
    })

    // далее работа со списком задач
    socket.on('todo/list', async () => {
        console.log('Пришло событие из браузера - todo/list')
        const list = await TodoItemsModel.find({}).lean()
        list.sort((a, b) => a.planned === b.planned ? 0 : (a.planned > b.planned ? 1 : -1))
        socket.emit('list', [
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
    socket.on('todo/add', async (data) => {
        const todo = await (new TodoItemsModel(data)).save()
        socket.emit('add', todo)
    })
    socket.on('todo/delete', async (id) => {
        await TodoItemsModel.findByIdAndRemove(id, (err) => {
            if (err) {
                return
            }
            socket.emit('delete', id)
        })
    })
    socket.on('todo/update', async (data) => {
        const todo = await TodoItemsModel.findOne({ _id: data._id }).lean()
        await TodoItemsModel.findByIdAndUpdate(data._id, {
            name: data.name || '',
            desc: data.desc || '',
            done: data.done || false,
            important: data.important || false,
            planned: data.planned || null
        })
        socket.emit('update', todo)
    })
})

// Запускаем приложение
http.listen(3000, () => {
    console.log(`listening on http://localhost:3000`)
})
