const express = require('express')
var createError = require('http-errors')
const cookieParser = require('cookie-parser')
const hbs = require('hbs')
const logger = require('morgan')
const path = require('path')
var debug = require('debug')('lesson-16:server')
var http = require('http');
const mongoose = require('mongoose')
let toDo = require('./models/todolist')
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser: true, useUnifiedTopology: true});

let app = express()


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.static('public'));

// Handelbars engine
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.get('/', function (req, res, next) {
    res.redirect('/todo')
})

app.get('/todo', async function (req, res, next) {
    const toDoAll = await toDo.find({}).exec()
    res.render('todo', {title: 'ToDo', toDoAll : toDoAll})
})

app.post('/todo', async function (req, res, next) {

    if (req.body.add_button) {
        const toDoAdd = new toDo({text: req.body.add})
        toDoAdd.save(function (error, doc) {
            if (error) console.log(error)
        })
    }
    if (req.body.delete) {
        toDo.deleteOne({_id: req.body.delete}, function (error, doc) {
            if (error) console.log(error)
        })
    }
    if (req.body.edit) {
        toDo.updateOne({_id: req.body.edit}, {text: req.body[`data-${req.body.edit}`]}, function (error, doc) {
            if (error) console.log(error)
        })
    }
    res.redirect('/todo')
})


// Если нет обработчиков, то  ошибка 404
app.use(function (req, res, next) {
    next(createError(404));
});

// Обработчик ошибок
app.use((err, req, res, next) => {
    //console.log(err.message)
    //console.log(err, 'err')
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
})

app.listen('4000', function () {
    console.log('http://localhost:4000')
    debug('Listening on 4000')
})





