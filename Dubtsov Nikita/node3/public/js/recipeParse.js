const request = require('request')
const cheerio = require('cheerio')


module.exports = class RecipeParse {
    constructor(recipeCount) {
        this.recipeUrl = 'https://rutxt.ru/pirogi'
        this.recipeCount = recipeCount || 3
        this.recipes = []
    }

    randomInteger(min, max) {
        let randomInt = min + Math.random() * (max - min + 1)
        return Math.floor(randomInt)
    }

    getBody(url) {
        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    resolve(body)
                }
                reject(err)
            })
        })
    }

    async getUrl(url, num) {
        try {
            const body = await this.getBody(this.recipeUrl)
            const $ = cheerio.load(body)
            const newUrl = url.slice(0, -6) + $('.teaser-ul').find('h4').find('a').eq(num).attr('href')
            return newUrl
        } catch (err) {
            console.log(err)
        }
    }

    async getRecipes() {
        try {
            for (let i = 1; i <= this.recipeCount; i++) {
                const pieUrl = await this.getUrl(this.recipeUrl, this.randomInteger(1, 30))
                const body = await this.getBody(pieUrl)
                const $ = cheerio.load(body)
                const pieTitle = $('h1').text()
                const pieDescr = $('.instructions').find('p').eq(0).text()
                const pieImg = this.recipeUrl.slice(0, -6) + $('.txt-teaser-center').find('img').attr('src')
                this.recipes.push({
                    'title': pieTitle,
                    'description': pieDescr,
                    'img': pieImg,
                    'url': pieUrl,
                })
            }
            return this.recipes
        } catch (err) {
            console.log(err)
        }
    }
}