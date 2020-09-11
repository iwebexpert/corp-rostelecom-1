const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const http = require('http')            // подключаем http для поднятия сервера
const socketIO = require('socket.io')   // подключаем сокет


mongoose.connect('mongodb://localhost:27017/TodoList', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

//Модели
const usersModel = require('./models/users')
const todoModels = require('./models/todomodels')

const app = express()
const server = http.Server(app)    // создаем сервер
const io = socketIO(server)        // чтобы соект ио тоже стар работать с сервером 

app.use(express.json())
// никто не должен знать, т.к. могут подписать токин
const TOKEN_SECRET_KEY = 'aaaaaaaaaaaaaaasfhksdahfkdashfkudyshaifytias'

//Работа с websocket
io.use((socket, next) => {
    // нужно авторизоватся, т.е. получить токен из рукопожатия
    const token = socket.handshake.query.token
    // верифицируем токен через jwt
    jwt.verify(token, TOKEN_SECRET_KEY, (err) => {
        if (err) {
            return next(new Error('Auth error'))
        }
        // const tokenObj = jwt.decode(token)
        // console.log(tokenObj.iat)
        next()
    })
    // если не удалось сделать верификацию
    return next(new Error('Auth error'))
})

// можем тут подписываться на события
// подписываемся на событие connection. т.е. когда придет соединение
io.on('connection', (socket) => {
    console.log('New connection')

    // создание и удаление чатов, событие create отправим с Frontend
    socket.on('create', async (data) => {
        console.log('Пришло событие из браузера - create')
        const todo = new todoModels(data)    // создаем todo
        const savedTodo = await todo.save()

        // говорим frondend что мы создали todo
        socket.broadcast.emit(`created:${savedTodo.user}`, savedTodo) //Сработает у всех, кроме отправителя
        socket.emit(`created:${savedTodo.user}`, savedTodo) //Сработает только у отправителя
    })
    // события ПР: delete придуманное, имена могут быть любые, т.е. delete не зарезервированное имя
    // удаление todo
    socket.on('delete', async (todoId) => {
        console.log('Пришло событие из браузера - delete')

        const todo = await todoModels.findOne({ _id: todoId }).lean()
        await todoModels.findByIdAndRemove(todoId, (err) => {
            if (err) {
                // если ошибка, выходим и ничего браузеру не отдаем
                return
            }
            // передаем браузеру, что мы удаляем 
            socket.broadcast.emit(`deleted:${todo.user}`, todoId)
            socket.emit(`deleted:${todo.user}`, todoId)
        })
    })
})

// событие что мы видим когда клиент отключился.
io.on('disconnect', (socket) => {
    console.log('Client was disconnected')
})

// отдача статических страниц index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'websocket', 'index.html'))
})
// отдача статических страниц, авторизация auth.html
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'websocket', 'auth.html'))
})
// отдача статических страниц, авторизация auth.html
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'websocket', 'register.html'))
})

app.use(cors())

// проверка для токина вместо паспорта
// middleware должна что то вернуть, либо next либо результат.
const isAuthenticated = (req, res, next) => {
    // когда задаем любой токин, отправляем заголовок как authorization
    // в Postman   GET -> Authorization -> Bearer Token -> Token задаем токин
    // и видим этот токин в скрытом заголовке Headers -> Authorization
    // проверяем есть ли заголовок Authorization
    if (req.headers.authorization) {
        // Строка состоит из 2 частей, разбиваем на: тип токина и сам токин, разделенные пробелом
        // Bearer Token и сам токин
        const [type, token] = req.headers.authorization.split(' ')
        // нужно провести верификацию токина, используя уникальный ключ, т.е. мы его выдавали или подделка 
        // 3 парамет это либо ошибка, либо декодированные данные, которые кранятся в ключе
        jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).send() // если ошибка возвращаем статус 403, не авторизирован, нет прав
            }
            // данные из token помещаем в user    
            req.user = decoded
            next()
        })
    } else {
        // если заголовка нет
        return res.status(403).send()  // 403, пользователь не авторизирован, нет прав
    }

}

//Проверка на авторизацию пользователя
app.use('/todo', isAuthenticated)

app.get('/', (req, res) => {
    res.redirect('/todo')
})

//Работа с mongoDB
// смотрим все задачи пользователя 
//  http://localhost:4000/todo
app.get('/todo', async (req, res) => {
    const { _id } = req.user
    todo = await todoModels.find({ user: _id }).lean()

    res.status(200).json(todo)
})

// создание новой задачи для авторизированного пользователя
//  http://localhost:4000/todo
// {
// { "task": "HTML/CSS", "isOK": true }
// { "task": "Git", "isOK": true }
// { "task": "Javascript", "isOK": true }
// { "task": "Node.js", "isOK": false }
// { "task": "REACT.js", "isOK": false }
// }
app.post('/todo', async (req, res) => {
    const { _id } = req.user
    const { task, isOK } = req.body

    const todoModel = new todoModels({ user: _id, task: task, isOK: isOK })
    todoModel.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }

        res.status(201).send(doc)
    })
})

// удаление задачи по идентификатору
//  http://localhost:4000/todo/<id>
app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await todoModels.findByIdAndRemove(id, (err, obj) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить todo', id })
        } else {
            res.json(obj)
        }
    })
})

// получение задачи по идентификатору
//  http://localhost:4000/todo/<id>
app.get('/todo/:id', async (req, res) => {
    const { _id } = req.user
    const id = req.params.id;
    const todo = await todoModels.findById({ _id: id, user: _id }).lean()

    if (!todo) {
        res.status(400).json({ message: "Todo не существует" })
        return
    }

    res.status(200).json(todo)
})

// регистрация нового пользователя по tokin
// http://localhost:4000/register
// { "email": "1@1.ru", "password": "1234", "repassword": "1234", "firstName": "m1","lastName": "First"}
// { "email": "2@2.ru", "password": "1234", "repassword": "1234", "firstName": "m2", "lastName": "Second" }
app.post('/register', async (req, res) => {
    const { repassword, ...restBody } = req.body

    // const restBody = req.body
    // const repassword = restBody.repassword
    // delete restBody.repassword

    if (restBody.password === repassword) {
        const user = new usersModel(restBody)
        await user.save()
        res.status(201).send()  // новый пользователь зарегистрировался/создан, 201 
    } else {
        res.status(400).json({ message: 'User not exists' })   // сбой, пользователя не создан
    }

})

// авторизация пользователя
//  http://localhost:4000/auth
// { "username": "1@1.ru", "password": "1234"}
// { "username": "2@2.ru", "password": "1234"}
app.post('/auth', async (req, res) => {
    // из body забираем username и password
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).json({ message: "Не передан логин или пароль" })
    }
    // ищем в БД первого попавшего пользователя по email
    const user = await usersModel.findOne({ email: username })
    // если пользователь не найден
    if (!user) {
        return res.status(401).json({ message: "Пользователь не найден" })
    }
    // если пароль не совпадает, в модели users.js есть validatePassword
    if (!user.validatePassword(password)) {
        return res.status(401).json({ message: "Неправильный логин/пароль" })
    }
    // если все правильно получаем пользователя 
    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password  // пароль у пользователя удаляем


    res.status(200).json({
        ...plainUser,
        token: jwt.sign(plainUser, TOKEN_SECRET_KEY),    // добавим и подпишем токен
    })
})

app.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/auth')
})


// такая конструкция нам не подойдет
// app.listen(4000, () => {
//     console.log('Server started... http://localhost:4000')
// })
// апгрейдим сервер не express, а http c express
server.listen(4000, () => {
    console.log('Server started... http://localhost:4000')
})
