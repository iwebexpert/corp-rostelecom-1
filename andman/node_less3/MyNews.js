const axios = require('axios')
const cheerio = require('cheerio')

module.exports = class MyNews {
    constructor(newsLimit = 3) {
        this.countNews = newsLimit
        this.newsList = []
        this.newsSite = 'https://lenta.ru/rubrics/russia'
        this.newsSiteDetal = 'https://lenta.ru'
    }

    addNews(annotation, href, text) {
        this.newsList.push({
            "annotation": annotation,
            "href": href,
            "text": text
        })
    }

    async getHTML(url) {
        const { data } = await axios.get(url)
        console.log('Info: Получаем содержимое страницы ' + url)
        return cheerio.load(data)
    }

    parseNews = async () => {
        const $ = await this.getHTML(this.newsSite)

        const divNews = $('section.b-layout_rubric').find('h3>a')

        var counter = 1
        for (let i = 0; i < divNews.length; i++) {
            if (/news/.test(divNews[i].children[0].parent.attribs.href) && counter <= this.countNews) {
                counter++;
                //Переходим по ссылке чтобы получить текст новости
                const news = await this.getHTML(this.newsSiteDetal + divNews[i].children[0].parent.attribs.href)

                this.addNews(divNews[i].children[0].children[0].data, //заголовок новости с главной страницы
                    this.newsSiteDetal + divNews[i].children[0].parent.attribs.href, //ссылка на новость с главной страницы
                    news('.js-topic__text').find('p').text() //содержимое новости, полученное по ссылке
                )
            }

        }
        return this.newsList
    }
}