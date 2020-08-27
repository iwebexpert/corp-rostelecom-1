const request = require('request')
const cheerio  = require("cheerio")
module.exports = async function getPages() {
    let links = []
    await request('https://ria.ru/lenta', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(body)
            $(".list-item__title").each(function (i, elem) {
                //console.log($(this))
                links.push([$(this).text(), $(this).attr('href')])
            })

        }
    })
    console.log(links)
    return links
}

function parsePage(link, linkName) {
    console.log(link, linkName)
    request('https://ria.ru'+link, function (error, response, body) {
        if(!error && response.statusCode === 200){
            const $ = cheerio.load(body)
            $(".article__body").each(function ( i, elem) {
                console.log('********************')
                console.log(linkName)
                console.log($(this).text())
                console.log('+++++++++++++++++++')
            })
        }
    })

}