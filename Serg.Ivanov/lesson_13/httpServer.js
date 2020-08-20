const http = require('http')
const fs = require('fs')
const path = require('path')

const request1 = (req, res) => {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/plain')
    // res.end('Hello, Bro!!!')
    // const user = {
    //     name: 'Sidor',
    //     age: 124,
    // }
    // res.setHeader('Content-Type', 'application/json')
    // res.end(JSON.stringify(user))
    console.log(req.url)

    let page = req.url
    if (page === '/') {
        page = 'index.html'
    }

    fs.readFile(path.join(__dirname, 'www', page), (err, data) => {
        if (err) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(err))
            return
        }
        res.setHeader('Content-Type', 'text/html')
        res.writeHead(200)
        res.end(data)
    })
}

const server = http.createServer(request1)
server.listen(8080)