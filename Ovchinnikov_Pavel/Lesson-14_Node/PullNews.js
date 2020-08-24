// Получение новостей с сайтов Яндекса, Майл.ру и Лента.ру

//** Константы

const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk');
const readline = require('readline')

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

//** задаем цвет заголовка и новостей
const header = chalk.redBright.bgBlack.underline
const text = chalk.cyanBright.bgBlack
const headerNews = chalk.cyanBright.bgBlack
const textNews = chalk.whiteBright.bgBlack

const limitItemNews = 10 // лимит на кол-во новостей
const limitTextNews = 500 // лимит на кол-во символов в тексте новостей

//** Функции

function help() {
    console.log(header('Список команд'))
    console.log(text('? help h - Вызов справки по командам'))
    console.log(text('1 - Новости от Яндекс.ру'))
    console.log(text('2 - Новости от Майл.ру'))
    console.log(text('3 - Новости от Лента.ру'))
    console.log(text('* - Все новости'))
    console.log(text('Прочие команды - Выход из приложения'))
}

function exit() {
    console.log(header('Вы вышли из приложения'))
    read.close()
}

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

    console.log(header('Новости от Яндекс.ру'))
    const $ = cheerio.load(body)

    const newsContent = $('.list__item_icon').find('a')
    for (let i = 0; i < newsContent.length; i++) {
        if (i > limitItemNews - 1) break // ограничение на кол-во новостей
        console.log(" " + (i + 1) + ". " + headerNews(newsContent.eq(i).text()))  //заголовок новости      
        let text = await getNewsYandexText(newsContent.eq(i).attr("href"))
        console.log(" ".repeat((" " + (i + 1) + ". ").length) + textNews(text)) // текст новости
    }
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

    console.log(header('Новости от Майл.ру'))
    const $ = cheerio.load(body)

    const newsContent = $('.news__list__item')
    for (let i = 0; i < newsContent.length; i++) {
        if (i > limitItemNews - 1) break // ограничение на кол-во новостей
        console.log(" " + (i + 1) + ". " + headerNews(newsContent.eq(i).text()))  //заголовок новости          
        let text = await getNewsMailText(newsContent.eq(i).find("a").attr("href"))
        console.log(" ".repeat((" " + (i + 1) + ". ").length) + textNews(text)) // текст новости
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

    console.log(header('Новости от Лента.ру'))
    const $ = cheerio.load(body)

    const newsContent = $('.js-top-seven').find('.item').find('a')
    for (let i = 0; i < newsContent.length; i++) {
        if (i > limitItemNews - 1) break // ограничение на кол-во новостей
        console.log(" " + (i + 1) + ". " + headerNews(newsContent.eq(i).text()))  //заголовок новости          
        let text = await getNewsLentaText(newsContent.eq(i).attr("href"))
        console.log(" ".repeat((" " + (i + 1) + ". ").length) + textNews(text)) // текст новости
    }
}

// Получение новостей
async function getNews(key) {
    switch (key.toUpperCase()) {
        case '?':
        case 'help'.toUpperCase():
        case 'h'.toUpperCase():
            help()
            break
        case '1':
            await getNewsYandex()
            break
        case '2':
            await getNewsMail()
            break
        case '3':
            await getNewsLenta()
            break
        case '*':
            await getNewsYandex()
            await getNewsMail()
            await getNewsLenta()
            break
        default:
            exit()
            break
    }
}


// выводим на экран справку по командам
help()

// ожидаем и анализируем ввод данных от пользователя
read.on('line', (key) => {
    getNews(key)
})
