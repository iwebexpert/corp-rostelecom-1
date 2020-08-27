// Получение новостей с сайтов Яндекса, Майл.ру и Лента.ру

const request = require('request')
const cheerio = require('cheerio')

var limitItemNews = 3 // лимит на кол-во новостей
const limitTextNews = 500 // лимит на кол-во символов в тексте новостей

//** Функции

function getBodyAsync(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

//** Новости от Яндекс.ру
async function getNewsYandexText(url) {
    let body = await getBodyAsync(url)
    let $ = cheerio.load(body)
    let result = $('.news-story__text').text()
    if (!result)
        result = $('.text').text()
    return result.substr(0, limitTextNews)
}

async function getNewsYandex() {
    const body = await getBodyAsync('https://yandex.ru/')

    let html = "<h2>" + "Новости от Яндекс.ру" + "</h2>"
    const $ = cheerio.load(body)

    const newsContent = $('.list__item_icon').find('a')
    for (let i = 0; i < newsContent.length; i++) {
        if (i > limitItemNews - 1) break // ограничение на кол-во новостей         
        html += "<h3>" + (i + 1) + ". " + newsContent.eq(i).text() + "</h3>" //заголовок новости          
        let text = await getNewsYandexText(newsContent.eq(i).attr("href"))
        html += "<p>" + text + "/p" // текст новости       
    }
    return html
}

//** Новости от Майл.ру
async function getNewsMailText(url) {
    let body = await getBodyAsync(url)
    let $ = cheerio.load(body)
    let result = $('.article__item').find("p").text() //article__intro
    return result.substr(0, limitTextNews)
}

async function getNewsMail() {
    const body = await getBodyAsync('https://mail.ru/')

    console.log('Новости от Майл.ру')
    const $ = cheerio.load(body)

    const newsContent = $('.news__list__item')
    for (let i = 0; i < newsContent.length; i++) {
        if (i > limitItemNews - 1) break // ограничение на кол-во новостей
        console.log(" " + (i + 1) + ". " + newsContent.eq(i).text())  //заголовок новости          
        let text = await getNewsMailText(newsContent.eq(i).find("a").attr("href"))
        console.log(" ".repeat((" " + (i + 1) + ". ").length) + text) // текст новости
    }
}

//** Новости от Лента.ру
async function getNewsLentaText(url) {
    if (url.indexOf("http") == -1)
        url = "https://lenta.ru" + url

    let body = await getBodyAsync(url)
    let $ = cheerio.load(body)
    let result = $('.js-topic__text').text()
    if (!result)
        result = $('.text').text()
    return result.substr(0, limitTextNews)
}

async function getNewsLenta() {
    const body = await getBodyAsync('https://lenta.ru/')

    console.log('Новости от Лента.ру')
    const $ = cheerio.load(body)

    const newsContent = $('.js-top-seven').find('.item').find('a')
    for (let i = 0; i < newsContent.length; i++) {
        if (i > limitItemNews - 1) break // ограничение на кол-во новостей
        console.log(" " + (i + 1) + ". " + newsContent.eq(i).text())  //заголовок новости          
        let text = await getNewsLentaText(newsContent.eq(i).attr("href"))
        console.log(" ".repeat((" " + (i + 1) + ". ").length) + text) // текст новости
    }
}


module.exports.getNews = function (limitItemNews_) {
    limitItemNews = limitItemNews_
    return getNewsYandex()
}