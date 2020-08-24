const request = require('request')
const cheerio = require('cheerio')
var clc = require("cli-color")

request('https://72.ru/text/', (err, res, body) => {
    if (!err && res.statusCode === 200) {
        const $ = cheerio.load(body)

        let newsHead = [];
        $('.I3bz a').each(function (i, elem) {
            newsHead[i] = $(this).text();
        });
        
        let newsContent = [];
        $('.I3ahr a').each(function (i, elem) {
            newsContent[i] = $(this).text();
        });
                
        for (i = 0; i < newsHead.length; i++) {
            console.log(clc.red(newsHead[i])+'\r\n'+clc.blue(newsContent[i])+'\r\n\r\n')
        }

    }
})
