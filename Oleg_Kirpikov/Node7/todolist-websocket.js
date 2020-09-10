const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const http = require('http')
const socketIO = require('socket.io')
const socketioJwt = require('socketio-jwt')


//Конфиг подключения к БД
const config = require('./config')

//Модель
const tasksModel = require('./models/tasks')
const usersModel = require('./models/users')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.use(express.static('public'))
app.use(express.json())


io.use(socketioJwt.authorize({
    secret: config.TOKEN_SECRET_KEY,
    handshake: true,
    auth_header_required: false
}));

io.on('connection', (socket) => {
    console.log(`hello! ${socket.decoded_token._id} ${socket.decoded_token.firstName} ${socket.decoded_token.lastName}`);

    socket.on(`get_tasks:${socket.decoded_token._id}`, async (user) => {
        console.dir(`list tasks ${user.email}`)
        console.log(`hello list tasks! ${socket.decoded_token._id} ${socket.decoded_token.firstName} ${socket.decoded_token.lastName}`);
        const tasks = await tasksModel.list(user._id)

        socket.broadcast.emit(`tasks_list:${socket.decoded_token._id}`, tasks)
        socket.emit(`tasks_list:${socket.decoded_token._id}`, tasks)
    })

    socket.on(`switch_task:${socket.decoded_token._id}`, async (task) => {
        console.dir(`switch task id:${task.id} done:${task.done}`)
        let id = task.id
        let model_res
        if (task.done) {
            model_res = await tasksModel.update({ _id: id, done: true, closeDate: new Date() })

            socket.broadcast.emit(`task_closed:${socket.decoded_token._id}`, task.id)
            socket.emit(`task_closed:${socket.decoded_token._id}`, task.id)
        } else {
            model_res = await tasksModel.update({ _id: id, done: false, closeDate: null })

            socket.broadcast.emit(`task_opened:${socket.decoded_token._id}`, task.id)
            socket.emit(`task_opened:${socket.decoded_token._id}`, task.id)
        }

    })

    socket.on(`delete_task:${socket.decoded_token._id}`, async (task_id) => {
        let model_res = await tasksModel.delete(task_id)

        socket.broadcast.emit(`task_deleted:${socket.decoded_token._id}`, task_id)
        socket.emit(`task_deleted:${socket.decoded_token._id}`, task_id)
    })

    socket.on(`create_task:${socket.decoded_token._id}`, async (task) => {
        let newTask = await tasksModel.add(socket.decoded_token._id, { name: task.name, desc: task.desc })
        console.log(newTask)
        if (newTask._id) {

            socket.broadcast.emit(`task_created:${socket.decoded_token._id}`, newTask)
            socket.emit(`task_created:${socket.decoded_token._id}`, newTask)
        }
    })

    socket.on('disconnect', (socket) => {
        console.log('Client was disconnected')
    })

});



app.use(express.urlencoded({ extended: false }))



//Зарегистрировать пользователя
app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body
    const email = req.body.email

    const dbEmails = await usersModel.exists({ email: email })

    if (dbEmails) {
        console.log('User exist!!')
        return res.status(409).json({ message: 'Пользователь уже существует' })
    }
    if (restBody.password === repassword && email.length > 0 && restBody.password.length > 0) {
        const user = new usersModel(restBody)
        await user.save()
        return res.status(201).json(user)
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
    delete req.user
    return res.status(401).json({ message: "Logout" })
})

server.listen(5000, () => {
    console.log('Server websocket started...')
})


config.connectDb()
    .on('error', console.log)
    .on('disconnected', config.connectDb)
    .once('open', () => {
        app.listen(4000, () => {
            console.log('Server started...')
        })
    })

