/*
    1)  Создать на основе express и handlebars веб-сервис с HTML-интерфейсом
        для динамической загрузки информации с одного из нескольких сайтов в выбранном формате.
        Зайдя на этот сервис, пользователь сможет с помощью формы настроить параметры
        информационной подборки (например, количество отображаемых
        новостей или их категорию) и получить ее в удобном виде.
        Форма должна отправляться на сервер методом POST.

    2)  Реализовать запоминание с помощью cookie текущих настроек
        формы и при заходе на сайт показывать последние использованные
        настройки. Если cookie не существует, можно при отображении
        формы дополнительно учитывать передаваемые GET-запросы
        (например, ?count=10&lang=ru и т.д.)
*/

const express = require('express')
const path = require('path')
const Parser = require('rss-parser')
const app = express()

// Middleware для получения настроек из Cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use((req, res, next) => {
    let settings = (req.cookies || {}).settings || null
    if (!settings) {
        const query = req.query || {}
        settings = {
            perPage: query.pp || 5,
            cat: query.cat || 'all/all',
            site: query.site || 'https://habr.com/ru/rss/'
        }
        res.cookie('settings', JSON.stringify(settings), {
            maxAge: 900000,
            httpOnly: true
        })
    } else {
        settings = JSON.parse(settings)
    }
    res.settings = settings
    next()
})

// Middleware для получения POST-параметров
app.use(express.json())

// Задаём движок шаблонизатора
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '..', 'views'))

// Главная - страница настроек
app.get('/', (req, res) => {
    res.render('index', res.settings || {})
})

// Сохранение настроек
app.post('/', (req, res) => {
    res.cookie('settings', JSON.stringify(req.body || {}), {
        maxAge: 900000,
        httpOnly: true
    })
    res.send(JSON.stringify({
        message: 'Настройки сохранены!'
    }))
    res.end()
})

// Получение и постраничный вывод новостей
app.get('/news', async (req, res) => {
    const settings = res.settings || {}
    const feed = await (new Parser()).parseURL(settings.site + settings.cat)
    const page = req.query.page || 1
    const pages = Math.ceil(feed.items.length / settings.perPage)
    const indexStart = (page - 1) * settings.perPage
    const indexEnd = page * settings.perPage - 1
    const news = []
    feed.items.forEach((item, index) => {
        if (index < indexStart || index > indexEnd) {
            return
        }
        news.push({
            index,
            title: item.title || '',
            content: (item.content || '').replace('img align="left"', 'img align="center"'),
            link: item.link || null,
            categories: (item.categories || []).length && item.categories[0] ? item.categories : null
        })
    })
    res.render('news', Object.assign(settings, {
        news,
        page,
        pages
    }))
})

const port = 3000
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
