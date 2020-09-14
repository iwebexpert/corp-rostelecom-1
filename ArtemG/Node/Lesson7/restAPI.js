const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const http = require('http')
const socketIO = require('socket.io')

mongoose.connect('mongodb://root:1234@172.20.10.9:27017/todo?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

//Модели
const todoModel = require('./models/todo')
const usersModel = require('./models/users')


const passport = require('./auth')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.use(cors())
app.use(express.json())

const TOKEN_SECRET_KEY = 'fddnc34jfbfbajkdnflasnckla'
//Работа с websocket
io.use((socket, next) => {
    const token = socket.handshake.query.token

    jwt.verify(token, TOKEN_SECRET_KEY, (err) => {
        if(err){
            return next(new Error("Auth error"))
        }

        next()
    })
    return next(new Error("Auth error"))
})

io.on('connection', (socket) => {
    console.log('New connection')

    socket.on('create', async(data) => {
        console.log('Пришло событие из браузера - create');
        const deal = new todoModel(data)
        const savedDeal = await deal.save()

        socket.broadcast.emit(`created:${savedDeal.user}`, savedDeal) //сработает у всех кроме отправителя
        socket.emit(`created:${savedDeal.user}`, savedDeal) //сработает только у отправителя
    })

    socket.on('delete', async(dealId) => {
        console.log('Пришло событие из браузера - delete');

        const deal = await todoModel.findOne({_id: dealId}).lean()
        await todoModel.findByIdAndRemove(dealId, (err)=> {
            if(err){
                return
            }
            socket.broadcast.emit(`deleted:${deal.user}`, dealId) //сработает у всех кроме отправителя
            socket.emit(`deleted:${deal.user}`, dealId) //сработает только у отправителя
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

const isAuthenticated = (req, res, next) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(' ')

        jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
            if(err){
                return res.status(403).send()
            }

            req.user = decoded
            next()
        })
    } else {
        return res.status(403).send()
    }
}

//Проверка а авторизацию пользователя

app.use('/todolist', isAuthenticated)



//Работа с MongoDB



app.get('/todolist', async (req, res) => {
    const {_id} = req.user
    const deals = await todoModel.find({user: _id}).lean()

    res.status(200).json(deals)
    })

app.post('/todolist', async(req,res) => {
    const {_id} = req.user
    const{title} = req.body

    const todoItem = new todoModel({user: _id, title, text: "New deal"})
    todoItem.save(function(err, doc){
        if(err){
            res.json(err)
            return
        }
        res.status(200).send(doc)
    })
})

app.get('/todolist/:id', async (req, res) => {
    const {_id} = req.user
    const id = req.params.id
    const deal = await todoModel.findById({_id: id, user: _id}).lean()
    
    if(!deal) {
        res.status(400).json({message: "задача не существует"})
        return
    }
    res.status(200).json(deal)
})

app.delete('/todolist/:id', async (req, res) => {
    const id = req.params.id
    const deal = await todoModel.findByIdAndRemove(id, (err, obj) => {
        if(err){
            res.status(400).json({error: 'Не удалось удалить задачу', id})
        } else {
            res.json(obj)
        }
    })
})

app.post('/register', async (req, res) => {
    const {repassword, ...restBody} =  req.body

    if(restBody.password === repassword){
        const user = new usersModel(restBody)
        await user.save()
        res.status(201).send()
    } else {
        res.status(400).json({message: 'User not exists'})
    }
})

app.post('/auth', async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(401).json({message: 'Не передан логин и пароль'})
    }

    const user = await usersModel.findOne({email: username})

    if(!user){
        return res.status(401).json({message: 'Пользователь не найден'})
    }

    if(!user.validatePassword(password)){
        return res.status(401).json({message: 'Не верный логин или пароль'})
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

server.listen(5000, () => {
    console.log('server is listened on port 5000...')
})





