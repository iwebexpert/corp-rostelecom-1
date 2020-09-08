const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')



mongoose.connect('mongodb://localhost:27017/todolist', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

const todoModel = require('./models/todo_item')
const usersModel = require('./models/users')


const app = express()
app.use(express.json())
app.use(cors())

const TOKEN_SECRET_KEY = 'kjhuiggaiusdfiuhiuaudigfuisdgfuil;hiugg'

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

app.use(express.urlencoded({extended: false}))


app.use(express.static('public'))



//Проверка на авторизацию пользователя
app.use('/users', isAuthenticated)
app.use('/todo', isAuthenticated)


app.get('/todo', async (req, res) => {
    const {_id} = req.user
    const todo_items = await todoModel.find({user: _id}).lean()
    res.status(200).json(todo_items)
})

//Создание новой записи
app.post('/todo',  async (req, res) => {
    const id = req.body._id
    const {_id} = req.user
    const {title} = req.body
    const {text} = req.body

    if(!id || id == "") { //Создание новой задачи
        const item = new todoModel({user : _id, title: title, text: text, doneAt: null})
        item.save(function (err, doc) {
            if (err) {
                res.json(err)
                return
            }else {
                res.status(201).json(item)
            }
        })
    }else{
        const item = await todoModel.updateOne({_id: id}, {title : req.body.title, text: req.body.text}, async function (err, doc) {
            if (err) {
                res.json(err)
                return
            }else {
                const modified_item = await todoModel.findById({_id : id})
                res.status(200).json(modified_item)
            }
        })
    }
})

//Пометить элемент как выполненный
app.post('/todo/check', async (req, res) => {
    const id = req.body._id
    if(!id) {
        res.status(400).json({message: "Не выбран элемент"})
        return
    }
    const item = await todoModel.updateOne({_id: id}, {doneAt : new Date()}, async function (err, doc) {
        if (err) {
            res.json(err)
            return
        }else {
            const modified_item = await todoModel.findById({_id : id})
            res.status(200).json(modified_item)
        }
    })

})

//Пометить элемент как не выполненный
app.post('/todo/uncheck', async (req, res) => {
    const id = req.body._id
    if(!id) {
        res.status(400).json({message: "Не выбран элемент"})
        return
    }
    const item = await todoModel.updateOne({_id: id}, {doneAt : null}, async function (err, doc) {
        if (err) {
            res.json(err)
            return
        }else {
            const modified_item = await todoModel.findById({_id : id})
            res.status(200).json(modified_item)
        }
    })

})

//Удалить элемент
app.del('/todo', async (req, res)=>{
    const id = req.body._id
    console.log(id)
    if(!id) {
        res.status(400).json({message: "Не выбран элемент"})
        return
    }
    await todoModel.findByIdAndRemove(id, (err, doc) =>{
        if(err){
            res.status(400).json({error: 'Не удалось удалить элемент', id})
        } else {
            res.json(doc)
        }
    })

})



//Регистрация пользователя
app.post('/register', async (req, res) => {
    const {repassword, ...restBody} =  req.body

    // const restBody = req.body
    // const repassword = restBody.repassword
    // delete restBody.repassword

    if(restBody.password === repassword){
        const user = new usersModel(restBody)
        await user.save()
        res.status(201).send()
    }
    else{
        res.status(400).json({message: 'User not exists'})
    }
})


// Авторизация пользователя
app.post('/auth', async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(401).json({message: "Не передан логин или пароль"})
    }

    const user = await usersModel.findOne({email: username})

    if(!user){
        return res.status(401).json({message: "Пользователь не найден"})
    }

    if(!user.validatePassword(password)){
        return res.status(401).json({message: "Неправильный логин/пароль"})
    }

    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password

    res.status(200).json({
        ...plainUser,
        token: jwt.sign(plainUser, TOKEN_SECRET_KEY),
    })
})
app.listen(4000, () => {
    console.log('Server started...')
})


