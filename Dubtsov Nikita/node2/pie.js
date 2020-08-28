// Получаем названия пирогов и их описание с сайта rutxt.ru
// Если не сложно, то можно по полной раскритиковать код, который написан

const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')

const recipesUrl = 'https://rutxt.ru/pirogi' // Ссылка на рецепты пирогов

// Функция для получения тела по ссылке
function getBody(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        resolve(body)
      }
      reject(err)
    })
  })
}

// Функция для получения ссылки на конкретный рецепт
async function getUrl(url, num) {
  try {
    const body = await getBody(url)
    const $ = cheerio.load(body)
    const newUrl = url.slice(0, -6) + '/' + $('.teaser-ul').find('h4').find('a').eq(num).attr('href')
    return newUrl
  } catch (err) {
    console.log(err)
  }
}

// Получение названий и описаний конкретных рецептов
async function getRecipes(url) {
  try {
    for (i = 1; i <= 3; i++) {
      const pieUrl = await getUrl(url, i)
      const body = await getBody(pieUrl)
      const $ = cheerio.load(body)
      const pieTitle = $('h1').text()
      const pieDescr = $('.instructions').find('p').eq(0).text()
      console.log(chalk.bold('Имя пирога:'), pieTitle)
      console.log(chalk.bold('Описание Пирога:'), pieDescr)
    }
  } catch (err) {
    console.log(err)
  }
}

getRecipes(recipesUrl)
