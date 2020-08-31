const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect('mongodb://root:1234@localhost:27017/messenger?authSource=admin&w=1', { useNewUrlParser: true, useUnifiedTopology: true })

//Модели
const todoModel = require(path.join(__dirname, 'models', 'todolist.js'))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//express + hbs
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.redirect('/todos')
})

//Работа с mongoDB
app.get('/todos', async (req, res) => {
    const todos = await todoModel.find({}).lean()
    //console.log(todos)
    res.render('todos', { layout: 'default', todos: todos })
})


app.post('/todosadd', async (req, res) => {
    var todoText = req.body.todotext
    console.log('Add todo...', todoText)
    if (todoText.length > 1) {
        var todo = new todoModel({ todo: todoText, checked: false })
        await todo.save(function (err, doc) {
            if (err) {
                res.json(err)
                return
            }
        })
    }
    res.redirect('/todos')
})


app.post('/todosedit', async (req, res) => {
    //Изменение (сохранение чек-бокса, либо удаление) 
    for (let k in req.body) {
        var idArr = k.match(/(save|del)_(.+)/)
        if (idArr) {
            //console.log(idArr)
            switch (idArr[1]) {
                case 'del':
                    await todoModel.deleteOne({ _id: idArr[2] }, function (err, doc) {
                        if (err) {
                            res.json(err)
                            return
                        }
                    })
                    console.log('Delete todo _id=', idArr[2])
                    break
                case 'save':
                    var flag = (req.body[`todoid_${idArr[2]}`] === 'on') //если checked, вернется true
                    await todoModel.updateOne({ _id: idArr[2] }, { checked: flag }, function (err, doc) {
                        if (err) {
                            res.json(err)
                            return
                        }
                    })
                    console.log(`Save checked = ${flag} for todo _id = ${idArr[2]}`)
                    break
                default:
                    return
            }
        }
    }
    res.redirect('/todos')
})

app.listen(4000, () => {
    console.log('Server started...')
})
