const https = require('https')
const http = require('http')
const request = require('request')

request('https://geekbrains.ru', (err, response, body) => {
    if(!err && response.statusCode === 200){
        console.log(body)
    }
})


// https.get('https://geekbrains.ru', (res) => {
//     console.log('StatusCode', res.statusCode)
//     //console.log(res)

//     res.setEncoding('utf8')

//     let contentData = ''
//     //EventEmitter
//     res.on('data', (chunk) => {
//         // console.log(chunk.toString())
//         //console.log(chunk)
//         contentData += chunk
//     })

//     res.on('end', () => {
//         console.log('Data:',  contentData)
//     })
// }).on('error', (error) => {
//     console.log(error.message)
//     console.log('Server is not avaliable now')
// })