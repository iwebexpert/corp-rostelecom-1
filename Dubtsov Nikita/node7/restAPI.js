const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const socketIO = require('socket.io')
const http = require('http')
const path = require('path')

const routes = require('./routes/routes')
const sett = require('./public/js/settings')

const TodosModel = require('./models/todos')

const app = express()
const server = http.Server(app)
const io = socketIO(server)


app.use(express.json())
app.use(logger(sett.morganMode))
app.use(cors())

const TOKEN_SECRET_KEY = 'nwduqggr89q3grbqufqo82teqgeyqidggwbqhvwq8i1h2ni1j2n1oidn'

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
    const todo = new TodosModel(data)
    const savedTodo = await todo.save()

    socket.broadcast.emit(`created:${savedTodo.user}`, savedTodo)
    socket.emit(`created:${savedTodo.user}`, savedTodo)
  })

  socket.on('delete', async (todoId) => {
    console.log('Пришло событие из браузера - delete')

    const todo = await TodosModel.findOne({ _id: todoId }).lean()
    await TodosModel.findByIdAndRemove(todoId, (err) => {
      if (err) {
        return
      }
      socket.broadcast.emit(`deleted:${todo.user}`, todoId)
      socket.emit(`deleted:${todo.user}`, todoId)
    })
  })
  socket.on('update', async (todoId) => {
    console.log('Пришло событие из браузера - update')

    const todo = await TodosModel.findOne({ _id: todoId }).lean()
    const isDone = !todo.isDone
    await TodosModel.findByIdAndUpdate(todoId, { isDone: isDone }, (err) => {
      if (err) {
        return
      }
      todo.isDone = isDone
      socket.broadcast.emit(`updated:${todo.user}`, todo)
      socket.emit(`updated:${todo.user}`, todo)
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

app.use('/todos', isAuthenticated)

app.use(routes)

async function start() {
  try {
    await mongoose.connect(
      `mongodb://${sett.userName}:${sett.password}@localhost:${sett.dbPort}/${sett.dbName}?authSource=admin&w=1`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    server.listen(sett.PORT, () => {
      console.log(`Server started on port ${sett.PORT}...`)
    })
  } catch (err) {
    console.log(err);
  }
}

start()