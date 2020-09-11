const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const http = require('http')
const socketIO = require('socket.io')

mongoose.connect('mongodb://root:1234@localhost:27017/messenger?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true })

//Модели
const todoModel = require(path.join(__dirname, 'models', 'todolist.js'))
const usersModel = require(path.join(__dirname, 'models', 'users.js'))

//const passport = require('./auth')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.use(express.json())
app.use(cors())

const TOKEN_SECRET_KEY = 'fhliqtwrsksfldfsdrdsdfsfrfqwserepesd'

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


//Работа с websocket
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
        console.log('Add todo...', data.todo)
        const todo = new todoModel(data)
        const savedTodo = await todo.save()
        socket.broadcast.emit(`created:`, savedTodo) //Сработает у всех, кроме отправителя
        socket.emit(`created:`, savedTodo) //Сработает только у отправителя
    })

    socket.on('delete', async (todoId) => {
        console.log('Пришло событие из браузера - delete')
        const todo = await todoModel.deleteOne({ _id: todoId }, function (err, doc) {
            if (err) {
                res.status(400).json({ error: 'Error delete todo', todoId })
                console.log('Error delete todo _id=', todoId)
                return
            }
            else {
                console.log('Delete todo _id=', todoId)
                socket.broadcast.emit(`deleted:`, todoId)
                socket.emit(`deleted:`, todoId)
            }
        })
    })


    socket.on('patch', async (data) => {
        console.log('Пришло событие из браузера - patch')
        const todo = await todoModel.updateOne({ _id: data.todoId }, { checked: data.checked }, function (err, doc) {
            if (err) {
                console.log('Error update todo _id=', data.todoId)
                return
            }
            else {
                console.log(`Save checked = ${data.checked} for todo _id = ${data.todoId}`)
                socket.broadcast.emit(`patched:`, data)
                socket.emit(`patched:`, data)
            }
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

//Проверка на авторизацию пользователя
app.use('/todos', isAuthenticated)


// app.get('/', (req, res) => {
//     res.redirect('/todos')
// })

//Работа с mongoDB
app.get('/todos', async (req, res) => {
    const todos = await todoModel.find({}).lean()
    //console.log(todos)
    res.status(200).json(todos)
})


app.post('/todos', async (req, res) => {
    const { todoText } = req.body
    console.log('Add todo...', todoText)
    if (todoText.length > 1) {
        var todo = new todoModel({ todo: todoText, checked: false })
        await todo.save(function (err, doc) {
            if (err) {
                res.json(err)
                return
            }
            res.status(201).send(doc)
        })
    }
})


app.patch('/todos/:id', async (req, res) => {
    //Сохраниение TODO пометка о выполнении
    const id = req.params.id;
    const { checked } = req.body
    var flag = (checked === 'on') //если checked, вернется true
    await todoModel.updateOne({ _id: id }, { checked: flag }, function (err, doc) {
        if (err) {
            res.status(400).json({ error: 'Error update todo', id })
        }
        else {
            console.log(`Save checked = ${flag} for todo _id = ${id}`)
            res.json(doc)
        }
    })
})

app.delete('/todos/:id', async (req, res) => {
    //Удаление TODO
    const id = req.params.id;
    await todoModel.deleteOne({ _id: id }, function (err, doc) {
        if (err) {
            res.status(400).json({ error: 'Error delete todo', id })
        }
        else {
            console.log('Delete todo _id=', id)
            res.json(doc)
        }
    })
})



app.post('/register', async (req, res) => {
    console.log(req.body)
    const { repassword, ...restBody } = req.body
    if (!restBody.password || !restBody.email || restBody.password == '' || restBody.email == '') {
        res.status(400).json({ message: 'Error data' })
    }
    else if (restBody.password !== repassword) {
        res.status(400).json({ message: 'Invalid repassword' })
    }
    else {
        const user = new usersModel(restBody)
        await user.save()
        res.status(201).send()
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


// app.listen(4000, () => {
//     console.log('Server started...')
// })

server.listen(4000, () => {
    console.log('Server started...')
})