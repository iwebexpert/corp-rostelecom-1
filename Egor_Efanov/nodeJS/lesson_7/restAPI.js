const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const http = require('http')
const socketIO = require('socket.io')

// mongoose.connect('mongodb://root:1234@localhost:27017/messenger?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

//Модели
const todoModel = require('./models/todoModels')
const usersModel = require('./models/users')

const passport = require('./auth')

const bodyParser = require("body-parser")



const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const TOKEN_SECRET_KEY = 'fhkdsfhksdahfkdashfkudyshaifytias'

//Работа с websocket
io.use((socket, next) => {
    const token = socket.handshake.query.token


    jwt.verify(token, TOKEN_SECRET_KEY, (err) => {
        if (err) {
            return next(new Error('Auth error'))
        }

        // const tokenObj = jwt.decode(token)
        // console.log(tokenObj.iat)

        next()
    })

    return next(new Error('Auth error'))
})

io.on('connection', (socket) => {
    console.log('New connection')

    socket.on('create', async (data) => {
        console.log('Пришло событие из браузера - create')
        const chat = new todoModel(data)
        const savedChat = await chat.save()

        socket.broadcast.emit(`created:${savedChat.user}`, savedChat) //Сработает у всех, кроме отправителя
        socket.emit(`created:${savedChat.user}`, savedChat) //Сработает только у отправителя
    })

    socket.on('delete', async (chatId) => {
        console.log('Пришло событие из браузера - delete')

        const chat = await todoModel.findOne({ _id: chatId }).lean()
        await todoModel.findByIdAndRemove(chatId, (err) => {
            if (err) {
                return
            }
            socket.broadcast.emit(`deleted:${chat.user}`, chatId)
            socket.emit(`deleted:${chat.user}`, chatId)
        })
    })


    socket.on('update', async (todoId) => {
        console.log('Пришло событие из браузера - update')

        const todo = await todoModel.findOne({ _id: todoId }).lean()
        const isDone = !todo.isDone
        await todoModel.findByIdAndUpdate(todoId, { isDone: isDone }, (err) => {
            if (err) {
                return
            }
            todo.isDone = isDone
            socket.broadcast.emit(`updated:${todo.user}`, todo)
            socket.emit(`updated:${todo.user}`, todo)
        })
    })
})


io.on('disconnect', (socket) => {
    console.log('Client was disconnected')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'websocket', 'index.html'))
})

app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'websocket', 'auth.html'))
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'websocket', 'register.html'))
})


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
    const { _id } = req.user
    const chats = await todoModel.find({ user: _id }).lean()

    res.status(200).json(chats)
})


app.post('/todo', async (req, res) => {
    const { _id } = req.user
    const { title } = req.body

    const chatModel = new todoModel({ user: _id, title: title, items: [{ text: "погладить кота" }, { text: "погладить енота" }] })
    chatModel.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }

        res.status(201).send(doc)
    })
})

app.get('/todo/:id', async (req, res) => {
    const { _id } = req.user
    const id = req.params.id;
    const chat = await todoModel.findById({ _id: id, user: _id }).lean()

    if (!chat) {
        res.status(400).json({ message: "Cписка не существует" })
        return
    }

    res.status(200).json(chat)
})

app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const chat = await todoModel.findByIdAndRemove(id, (err, obj) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить список', id })
        } else {
            res.json(obj)
        }
    })
})


app.post('/register', async (req, res) => {

    if (restBody.password === repassword) {
        const user = new usersModel(restBody)
        await user.save()


        const plainUser = JSON.parse(JSON.stringify(user))
        delete plainUser.password

        res.status(200).json({
            ...plainUser,
            token: jwt.sign(plainUser, TOKEN_SECRET_KEY),
        })

    } else {
        res.status(400).json({ message: 'Не совпадает пароль' })
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

app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})


const port = 3000
async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/todoApp',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
    } catch (err) {
        console.log(err)
    }
    server.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
}

start() 