const express = require('express')
const createError = require('http-errors')
const logger = require('morgan')
const path = require('path')
const debug = require('debug')('lesson-16:server')
const http = require('http')
const socketIO = require('socket.io')

const jwt = require('jsonwebtoken')
const TOKEN_SECRET_KEY = 'asdasdassaasf22132asdfcsd233wefTGJHDGHhgsdghagha7123123!'

const validator = require('express-validator')

const mongoose = require('mongoose')
let toDo = require('./models/todolist')
let Users = require('./models/users')
let toDoItems = require('./models/todoitems')

//доступ к БД
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true, useUnifiedTopology: true});

//схема подключения websocket с Express
let app = express()
let server = http.createServer(app); // создаем сервер с экспрессом внутри
const io = socketIO(server) //экземпляр вебсокета передаем в наш сервер

//middleware websocket для  авторизации
io.use((socket, next) => {
    // получаем токен от клиента в такой  строке: const socket = io.connect(`http://localhost:4000?token=${TOKEN}`)
    const token = socket.handshake.query.token
    //верификация, если неудачная - то прокидываем дальше ошибку
    jwt.verify(token, TOKEN_SECRET_KEY, (err) => {
        if (err) {
            return next(new Error('Auth error'))
        }
        next()
    })
    return next(new Error('Auth error'))
})

//подписываемся на событие от клиента - соединение (io.connect(`http://localhost:4000?token=${TOKEN}`))
io.on('connection', (socket) => {
    //подписываемся на событие от клиента - create (socket.emit('create', dataAdding)) и получаем отправленные данные
    socket.on('create', async (data) => {

        //получили даные от клиента - data

        const toDoUser = await toDo.findOne({user: data.user}).exec()
        const toDoItem = new toDoItems({
            text: data.text,
            done: false
        })
        const toDoItemAdd = JSON.parse(JSON.stringify(toDoItem))
        toDoUser.text.push(toDoItemAdd)
        toDoUser.save(function (error, doc) {
            if (error) {
                console.log(error)
            } else {
                //если данные успешно обработаны, то отправляемм всем клиентам в данный момент инфомарцию о обновлении данных на сервере
                socket.broadcast.emit(`created:${data.user}`, toDoItemAdd) //Сработает у всех, кроме отправителя
                socket.emit(`created:${data.user}`, toDoItemAdd) //Сработает только у отправителя
            }

        })
    })
    socket.on('doneToDo', async data => {
        const toDoUser = await toDo.findOne({user: data.user}).exec()

        let indexUpdate
        toDoUser.text.forEach((el, index) => {
            if (el._id === data.toDoId) {
                indexUpdate = index
            }
        })
        const newToDoItem = toDoUser.text[indexUpdate]
        newToDoItem.done = !newToDoItem.done
        toDoUser.text.splice(indexUpdate, 1, newToDoItem)
        await toDoUser.save(function (error, doc) {
            if (error) {
                console.log(error)
            } else {
                socket.broadcast.emit(`updateDone:${data.user}`, newToDoItem) //Сработает у всех, кроме отправителя
                socket.emit(`updateDone:${data.user}`, newToDoItem) //Сработает только у отправителя
            }
        })
    })
    socket.on('delete', async data => {

        const toDoUser = await toDo.findOne({user: data.user}).exec()
        let indexDelete
        toDoUser.text.forEach((el, index) => {
            if (el._id === data.toDoId) {
                indexDelete = index
            }
        })
        const deletedData = toDoUser.text.splice(indexDelete, 1)
        await toDoUser.save(function (error, doc) {
            if (error) {
                console.log(error)
            } else {
                socket.broadcast.emit(`deleted:${data.user}`, deletedData[0]) //Сработает у всех, кроме отправителя
                socket.emit(`deleted:${data.user}`, deletedData[0]) //Сработает только у отправителя
            }
        })
    })
    socket.on('update', async data => {
        const toDoUser = await toDo.findOne({user: data.user}).exec()
        let indexUpdate
        toDoUser.text.forEach((el, index) => {
            if (el._id === data.toDoId) {
                indexUpdate = index
            }
        })

        const newToDoItem = toDoUser.text[indexUpdate]
        newToDoItem.text = data.value
        toDoUser.text.splice(indexUpdate, 1, newToDoItem)
        await toDoUser.save(function (error) {
            if (error) {
                console.log(error)
            } else {
                socket.broadcast.emit(`updatedToDoItem:${data.user}`, newToDoItem) //Сработает у всех, кроме отправителя
                socket.emit(`updatedToDoItem:${data.user}`, newToDoItem) //Сработает только у отправителя
            }
        })
    })


})

io.on('disconnect', (socket) => {
    console.log('Client was disconnected')
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));


app.get('/', function (req, res, next) {
    res.redirect('/auth')
})

app.get('/auth', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'www', 'index.html'))
})


app.post('/auth', [

    validator.body('email_address').trim()
        .isEmail().withMessage('Email field not correct')
        .isLowercase()
        .custom(async (value) => await Users.checkUserAuth(value))
        .bail()
        .escape(),
    validator.body('password').trim()
        .custom(async (value, {req}) => await Users.checkUserAuth(req.body.email_address))
        .bail() // если пользователя нет - то пароль проверять не требуется
        .custom(async (value, {req}) => {
            const user = await Users.findOne({email: req.body.email_address})
            return await user.validatePasswordCheck(value)
        })
        .escape(),

    async function (req, res, next) {
        const errors = validator.validationResult(req);
        // console.log(req.body)
        // console.log(errors)

        if (!errors.isEmpty()) {
            res.status(401).json({
                title: 'Authentication',
                errors: errors.array(),
                formField: {
                    email_address: req.body.email_address
                }
            })
        } else {
            const user = JSON.parse(JSON.stringify(await Users.findOne({email: req.body.email_address}))) // payload for token
            delete user.password //  delete password from payload data
            const token = jwt.sign(user, TOKEN_SECRET_KEY)  //create token
            res.status(200).json({
                ...user,
                token: token
            })
        }
    }

])

app.get('/reg', function (req, res, next) { //проверяем, что пользователь уже не авторизован
    res.sendFile(path.join(__dirname, 'www', 'reg.html'))
})

app.post('/reg', [

    //Валидация
    validator.body('first_name').trim()
        .isLength({min: 3, max: 20}).withMessage('First Name must be from 3 to 20 symbols')
        .isAlpha().withMessage('First Name is not Alpha')
        .escape(),

    validator.body('last_name').trim()
        .isLength({min: 3, max: 20}).withMessage('Last Name must be from 3 to 20 symbols')
        .isAlpha().withMessage('Last Name is not Alpha')
        .escape(),

    validator.body('email_address').trim()
        .isEmail().withMessage('Email field not correct')
        .isLowercase()
        .custom(async (value) => await Users.checkUser(value))
        .escape(),

    validator.body('password').trim()
        .isLength({min: 3}).withMessage('Password must be at least 3 symbols long')
        .escape(),

    validator.check('repassword', 'Field "Return password" not equal "Password"').trim()
        .custom((value, {req}) => value === req.body.password)
        .escape(),


    function (req, res, next) {

        const errors = validator.validationResult(req);
        let errors_field = []
        errors.errors.forEach((el) => {
            errors_field.push(el.param)
        })


        if (!errors.isEmpty()) {
            res.status(400).json({
                title: 'Registration',
                formField: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email_address: req.body.email_address
                },
                errors: errors.array(),
                errors_field: errors_field
            })
        } else {
            const user = new Users({
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email_address,
                password: req.body.password
            })

            user.save(function (err, result) {
                if (err) {
                    next(err)
                }
                res.status(200).send()
            })
        }


    }
])


app.get('/todo', async function (req, res, next) {
    res.sendFile(path.join(__dirname, 'www', 'todo.html'))
})

app.get('/todo/all', async function (req, res, next) { //защищаем от неавторизованных пользователей
    if(req.query.user !== 'undefined') {
        const toDoAll = await toDo.find({user: req.query.user}).exec()
        const user = await Users.findById(req.query.user).exec()
        res.status(200).json({title: 'ToDo', toDoAll: toDoAll[0].text, user: user})
    } else {
        res.status(401).json({error: 'Auth error'})
    }

})

app.get('/logout', function (req, res) {
    res.sendFile(path.join(__dirname, 'www', 'logout.html'))
})


// Если нет обработчиков, то  ошибка 404
app.use(function (req, res, next) {
    next(createError(404));
})

// Обработчик ошибок
app.use((err, req, res, next) => {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send();
})

server.listen('4000', function () {
    console.log('http://localhost:4000')
    debug('Listening on 4000')
})





