const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const logger = require('morgan')

const routes = require('./routes/routes')
const sett = require('./public/js/settings')

const hbs = exphbs.create({
    defaultLayout: sett.defLayouts,
    extname: sett.extName
})

const app = express()

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(logger(sett.morganMode))
app.use(express.urlencoded({ extended: true }))

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




