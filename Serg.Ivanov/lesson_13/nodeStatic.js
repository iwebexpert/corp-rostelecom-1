const http = require('http')
const nodeStatic = require('node-static')

const resource = new (nodeStatic.Server)('./www')

http.createServer((req, res) => {
    resource.serve(req, res)
}).listen(8080)
