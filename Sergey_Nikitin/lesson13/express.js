const express = require('express')
const path = require('path')

const app = express() //Целиком приложение
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(express.static(path.join(__dirname, 'www')))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
