// Создать переводчик слов с английского на русский, который будет
// обрабатывать входящие GET запросы и возвращать ответы,
// полученные через API Яндекс.Переводчика.

const express = require('express')
const path = require('path')
const { translate } = require("google-translate-api-browser") // Google-переводчик, раз у Яндекса халява кончилась

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '..', 'static')))

app.get('/translate/:text', (req, res) => {
    const text = req.params.text
    translate(text, { from: 'en', to: 'ru' }).then(r => {
        res.send(JSON.stringify({
            status: 200,
            data: {
                from: text,
                to: r.text
            }
        }))
    }).catch(err => {
        res.send(JSON.stringify({
            status: 500,
            data: {
                error: err.message
            }
        }))
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
