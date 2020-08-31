const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const todoTasks = require('./models/todoModel')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//Подключение handlebars
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'default',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
}))
app.set('view engine', 'hbs')


app.get('/', async (req, res) => {
  const tasks = await todoTasks.find({}).lean()
  res.render('tasks', { layout: 'default', tasks })
})

app.post('/createTask', async (req, res) => {
  const newTask = new todoTasks({ task: req.body.newTaskText })
  await newTask.save(function (err) {
    if (err) {
      res.json(err)
      return
    }
  })
  res.redirect('/')
})


const port = 3000
async function start() {
  //MongoDB запускается через OpenServer
  try {
    await mongoose.connect('mongodb://127.0.0.1/todoApp',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
  } catch (err) {
    console.log(err)
  }
  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })
}

start()