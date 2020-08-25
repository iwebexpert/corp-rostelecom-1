const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk');

console.log(chalk.hex('#cee2ed').bgGrey(' Новости сайта: pattayapeople.ru  '))
request('https://pattayapeople.ru/news/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html)
    $('.entry-title').each(function (i, element) {
      if (i !== 0) {
        console.log(chalk.yellow('new ' + i + ': ') + $(element).text())
      }
    })
  }
})
