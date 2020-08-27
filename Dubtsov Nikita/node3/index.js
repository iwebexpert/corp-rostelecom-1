const express = require('express')
const exphbs = require('express-handlebars')
const cookie = require('cookie-parser')

const router = require('./routes/recipes')
const recipesRouter = require('./routes/recipes')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.listen(PORT, () => {
    console.log('Server started');
})

app.use(cookie())
app.use(express.urlencoded({ extended: true }))

app.use(recipesRouter)

