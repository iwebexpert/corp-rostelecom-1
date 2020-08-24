const request = require('request')
const cheerio = require('cheerio')

request('https://habr.com/ru/top/weekly/', (err, res, body) => {
  if (!err && res.statusCode === 200) {
    const $ = cheerio.load(body)
    console.log('Топ 5 статей хабра за неделю')
    for (let i = 0; i < 5; i++) {
      const articleDate = $('.post__time').eq(i).text()
      const articleTitle = $('.post__title').eq(i).find('a').text()
      const articleLink = $('.post__title_link').eq(i).attr('href')
      const articleRating = $('.post-stats__result-counter').eq(i).text()

      console.log(`Дата и время: ${articleDate}`
        + '\n' + `Заголовок: ${articleTitle}`
        + '\n' + `Ссылка: ${articleLink}`
        + '\n' + `Рейтинг: ${articleRating}`
        + '\n' + '----------------------------')
    }
  }
}
)