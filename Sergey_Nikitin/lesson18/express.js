const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://root:1234@localhost:27017/toDoBase?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

//const passport = require('./auth')

//Модели
const chatsModel = require('./models/chats')
const toDoListModel = require('./models/toDoList')
const usersModel = require('./models/users')

const app = express()

app.use(express.json())
app.use(cors())

const TOKEN_SECRET_KEY = 'ddfdsfdsfewrwfsdfdfsfddfsdgsfdhsdfgfgsdsdftrgvcvbnml'

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
app.use('/messages', isAuthenticated)
app.use('/todolist', isAuthenticated)
app.use('/todolist/:id', isAuthenticated)
app.use('/todolistadd', isAuthenticated)


app.get('/', (req, res) => {
    res.send("Ok!")
})


//Работа с mongoDB
app.get('/chats', async (req, res) => {
    const { _id } = req.user
    const chats = await chatsModel.find({ user: _id }).lean()

    res.status(200).json(chats)
})


app.post('/chats', async (req, res) => {
    const { _id } = req.user
    const { title } = req.body

    const chatModel = new chatsModel({ user: _id, title, messages: [{ author: "Test", text: "Test" }] })
    chatModel.save(function (err, doc) {
        if (err) {
            res.json(err)
            return
        }

        res.status(201).send(doc)
    })
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

    // const restBody = req.body
    // const repassword = restBody.repassword
    // delete restBody.repassword

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
    return res.status(200).json({ message: "Успешно вышел" })
})

//ДЗ ToDoList
app.get('/todolist', async (req, res) => {
    const { _id } = req.user
    const toDolist = await toDoListModel.find({ user: _id }).lean()
    console.log(toDolist)
    res.status(200).json(toDolist)
})
app.get('/todolist/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null;
    const toDolistItem = await toDoListModel.findById({ _id: id }).lean()
    res.status(200).json(toDolistItem)
})
app.patch('/todolist/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null;
    const toDolistItem = await toDoListModel.findById({ _id: id })
    if (req.body.name && req.body.description && req.body.checked) {
        toDolistItem.description = req.body.description
        toDoListModel.updateOne({ _id: id }, { name: req.body.name, description: req.body.description, checked: req.body.checked }, function (err) {
            if (!err) {
                console.log('Success!')
                // const toDolistItemNew = await toDoListModel.findById({ _id: id })
                return res.status(200).json({ message: "Удалось обновить дело" })
            }
            else {

                return res.status(400).json({ message: "Не удалось обновить дело" })
            }
        })
    }
    else {
        res.status(400).json({ message: "Не то послали" })
    }

})
app.delete('/todolist/:id', async (req, res) => {
    const id = req.params.id ? req.params.id : null;
    const toDolistItem = await toDoListModel.findById({ _id: id }, (err, obj) => {
        if (err) {
            res.status(400).json({ error: 'Не удалось удалить дело', id })
        } else {
            res.json(obj)
        }
    })
})

app.post('/todolistadd', (req, res) => {
    const { _id } = req.user
    if (req.body.name && req.body.description) {
        // name = parseInt(req.body.name)
        let toDoitemCurr = new toDoListModel({ user: _id, name: req.body.name, description: req.body.description })
        toDoitemCurr.save(function (err, book) {
            if (err) return console.error(err);
            console.log(toDoitemCurr.name + " saved to collection.");
            return res.status(200).json({ message: toDoitemCurr.name + " saved to collection." })
        })
    }
    else {
        return res.status(200).json({ message: "Упс... что то пошло не так..." })
    }
})






app.listen(4000, () => {
    console.log('Server started...')
})