const cheerio = require('cheerio')
const axios = require('axios')

module.exports = class Articles {
  constructor(articleCount = 5) {
    this.articleCount = articleCount
    this.articleList = []
  }

  addArticle(header, link, rating) {
    this.articleList.push({
      "header": header,
      "link": link,
      "rating": rating
    })
  }

  async fetchPage(url, n) {
    //ловим ошибки при неудачном получении html страницы, пробуем снова через таймаут
    try {
      const result = await axios.get(url)
      console.log('fetching html on ' + url)
      return result.data
    } catch (err) {
      if (n === 0) throw err
      console.log("fetchPage(): Пробуем снова через 3 секунды")
      await waitFor(3000)
      console.log(`Попыток: ${7 - n} ====> URL: ${url}`)
      return await fetchPage(url, n - 1)
    }
  }

  getArticles = async () => {
    const pageHtml = await this.fetchPage('https://habr.com/ru/top/weekly/', 6)
    const $ = cheerio.load(pageHtml)
    for (let i = 0; i < this.articleCount; i++) {
      const articleTitle = $('.post__title').eq(i).find('a').text()
      const articleLink = $('.post__title_link').eq(i).attr('href')
      const articleRating = $('.post-stats__result-counter').eq(i).text()
      this.addArticle(articleTitle, articleLink, articleRating)
    }
    //console.log(this.articleList)
    return this.articleList
  }
}