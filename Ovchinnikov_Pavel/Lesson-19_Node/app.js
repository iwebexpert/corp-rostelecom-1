const express = require('express')
const path = require('path')
const mongoose = require('./models/mongodb')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const http = require('http')
const socketIO = require('socket.io')

mongoose.connectDB()

//Модели
const tasksModel = require('./models/tasks')
const usersModel = require('./models/users')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

// обработки данных с формы
app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(express.static('www'))

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
        const task = new tasksModel(data)
        const savedTask = await task.save()

        socket.broadcast.emit(`created:${savedTask.user}`, savedTask) //Сработает у всех, кроме отправителя
        socket.emit(`created:${savedTask.user}`, savedTask) //Сработает только у отправителя
    })

    socket.on('delete', async (taskId) => {
        console.log('Пришло событие из браузера - delete')

        const task = await tasksModel.findOne({ _id: taskId }).lean()
        await tasksModel.findByIdAndRemove(taskId, (err) => {
            if (err) {
                return
            }
            socket.broadcast.emit(`deleted:${task.user}`, taskId)
            socket.emit(`deleted:${task.user}`, taskId)
        })
    })

    socket.on('update', async (data) => {
        console.log('Пришло событие из браузера - update')

        const taskUpdate = await tasksModel.findOne({ _id: data.id }).lean()
        if (taskUpdate) {
            await tasksModel.updateOne({ _id: data.id }, { status: data.status }, (err) => {
                if (err) {
                    return
                }
                socket.broadcast.emit(`updated:${taskUpdate.user}`, data)
                socket.emit(`updated:${taskUpdate.user}`, data)
            })
        }
    })
})

io.on('disconnect', (socket) => {
    console.log('Client was disconnected')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'todo.html'))
})

app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'auth.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'register.html'))
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

//Проверка на авторизацию пользователя
app.use('/todo', isAuthenticated)

app.get('/', (req, res) => {
    res.redirect('/todo')
})

//Работа с mongoDB
app.get('/todo', async (req, res) => {
    const { _id } = req.user
    const tasks = await tasksModel.find({ user: _id }).lean()

    res.status(200).json(tasks)
})

app.post('/todo', async (req, res) => {
    const { _id } = req.user
    const { name } = req.body

    const tasks = new tasksModel({ user: _id, name: name, items: [{ name: "Купить хлеба" }, { name: "Сделать ДЗ" }] })
    tasks.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }

        res.status(201).send(doc)
    })
})

app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body

    console.log(req.body)
    // const restBody = req.body
    // const repassword = restBody.repassword
    // delete restBody.repassword

    if (restBody.password === repassword) {
        const user = new usersModel(restBody)
        await user.save()
        // res.status(201).send()  

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

/*app.listen(3000, () => {
    console.log('Server started...')
})
*/

server.listen(3000, () => {
    console.log('Server started...')
})
