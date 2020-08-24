const request = require('request')
const cheerio  = require("cheerio")

request('https://ria.ru', function (error, response, body) {
    if(!error && response.statusCode === 200){
        const $ = cheerio.load(body)
        $(".cell-list__item-title").each(function ( i, elem) {
            console.log($(this).text())
        })
    }
})