const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const routes = require('./routes/routes')
const sett = require('./public/js/settings')

const app = express()


app.use(express.json())
app.use(logger(sett.morganMode))
app.use(cors())

const TOKEN_SECRET_KEY = 'nwduqggr89q3grbqufqo82teqgeyqidggwbqhvwq8i1h2ni1j2n1oidn'

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
    app.listen(sett.PORT, () => {
      console.log(`Server started on port ${sett.PORT}...`)
    })
  } catch (err) {
    console.log(err);
  }
}

start()