class MyNews {
    constructor() {
        this.newsList = []
    }

    addNews(annotation, href, text) {
        this.newsList.push({
            "annotaion": annotation,
            "href": href,
            "text": text
        })
    }
}

const mn = new MyNews()
const newsSite = 'https://lenta.ru'
const axios = require('axios')
const cheerio = require('cheerio')

async function parseNews() {
    const getHTML = async (url) => {
        const { data } = await axios.get(url)
        console.log('Info: Получаем содержимое страницы ' + url)
        return cheerio.load(data)
    }
    const $ = await getHTML(newsSite)
    const divNews = $('section.b-yellow-box').find('a')
    for (let i = 0; i < divNews.length; i++) {
        //Переходим по ссылке чтобы получить текст новости
        const news = await getHTML(newsSite + divNews[i].children[0].parent.attribs.href)

        mn.addNews(divNews[i].children[0].data, //заголовок новости с главной страницы
            newsSite + divNews[i].children[0].parent.attribs.href, //ссылка на новость с главной страницы
            news('.js-topic__text').find('p').text() //содержимое новости, полученное по ссылке
        )
    }
    console.log(mn.newsList)

}
parseNews()
