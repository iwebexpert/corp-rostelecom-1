const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const http = require('http')
const socketIO = require('socket.io')

// mongoose.connect('mongodb://root:1234@localhost:27017/messenger?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

mongoose.connect('mongodb://localhost:27017/messenger?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const chatsModel = require('./models/chats')
const usersModel = require('./models/users')

const passport = require('./auth')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.use(express.json())

const TOKEN_SECRET_KEY = 'fffcvllgsdszklkhgfxsygcbouhx'

io.use((socket, next) => {
    const token = socket.handshake.query.token


    jwt.verify(token, TOKEN_SECRET_KEY, (err) => {
        if (err) {
            return next(new Error('Auth error'))
        }
        next()
    })

    return next(new Error('Auth error'))
})

io.on('connection', (socket) => {
    console.log('New connection')

    socket.on('create', async (data) => {
        console.log('Пришло событие из браузера - create')
        const chat = new chatsModel(data)
        const savedChat = await chat.save()

        socket.broadcast.emit(`created:${savedChat.user}`, savedChat)
        socket.emit(`created:${savedChat.user}`, savedChat)
    })

    socket.on('update', async (chatId) => {
        console.log('Пришло событие из браузера - update')
        const chat = await chatsModel.findOne({ _id: chatId }).lean()
        let a = chatsModel.status
        if (a === 'Статус: новое') {
            await chatsModel.updateOne({ _id: chatId }, { $set: { status: 'Статус: выполнено' } }, { upsert: true });
        }
        else {
            await chatsModel.updateOne({ _id: chatId }, { $set: { status: 'Статус: новое' } }, { upsert: true });
        }

        socket.broadcast.emit(`updated:${chat.user}`, chatId)
        socket.emit(`updated:${chat.user}`, chatId)
    })

    socket.on('delete', async (chatId) => {
        console.log('Пришло событие из браузера - delete')

        const chat = await chatsModel.findOne({ _id: chatId }).lean()
        await chatsModel.findByIdAndRemove(chatId, (err) => {
            if (err) {
                return
            }
            socket.broadcast.emit(`deleted:${chat.user}`, chatId)
            socket.emit(`deleted:${chat.user}`, chatId)
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

app.use(cors())



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

app.use('/chats', isAuthenticated)

app.get('/', (req, res) => {
    res.redirect('/chats')
})

app.get('/chats', async (req, res) => {
    const { _id } = req.user
    const chats = await chatsModel.find({ user: _id }).lean()

    res.status(200).json(chats)
})

app.get('/chats/:id', async (req, res) => {
    const { _id } = req.user
    const id = req.params.id;
    const chat = await chatsModel.findById({ _id: id, user: _id }).lean()

    if (!chat) {
        res.status(400).json({ message: "Чата не существует" })
        return
    }

    res.status(200).json(chat)
})

app.delete('/chats/:id', async (req, res) => {
    const id = req.params.id;
    const chat = await chatsModel.findByIdAndRemove(id, (err, obj) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить чат', id })
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
        res.status(400).json({ message: 'User not exists' })
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


server.listen(4000, () => {
    console.log('Server started...')
})
