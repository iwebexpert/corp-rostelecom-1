const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

const Items = require('./models/items')

const app = express()

app.use(express.json())

// обработки данных с формы
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))

//express + hbs
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

app.set('view engine', 'hbs')

app.get('/', async (req, res) => {
    const items = await Items.getAll()
    res.render('items', { layout: 'default', items })
})

// Обрабатываем Post запрос
app.post('/', async (req, res) => {
    console.log(req.body)

    if (req.body.addName) {
        Items.add(req.body.addName)
    }

    if (req.body.updateID) {
        Items.update(req.body.updateID, req.body.status ? req.body.status : false)
    }

    if (req.body.deleteID) {
        Items.delete(req.body.deleteID)
    }

    res.end()
    //res.redirect('/')
})


app.listen(3000, function (err) {
    if (err)
        console.error(err)
    else
        console.log(`Running server at port 3000!`)
});
