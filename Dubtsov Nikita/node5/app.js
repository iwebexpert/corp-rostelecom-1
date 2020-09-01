const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const logger = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const routes = require('./routes/routes')
const sett = require('./public/js/settings')

const passport = require('./auth')

const hbs = exphbs.create({
    defaultLayout: sett.defLayouts,
    extname: sett.extName
})

const app = express()

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.json())
app.use(logger(sett.morganMode))
app.use(express.urlencoded({ extended: true }))



app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'jgiodhfo5aihnfh2iuahow294y87rg3bdqiu2ihnedqvj90h4g83bf',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(passport.initialize)
app.use(passport.session)

app.use('/home', passport.isAuthenticated)

app.use(routes)

async function start() {
    try {
        await mongoose.connect(
            `mongodb://${sett.userName}:${sett.password}@localhost:${sett.dbPort}/${sett.dbName}?authSource=admin&w=1`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
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




