const request = require('request');
const cheerio = require('cheerio');


exports.getRubrics = function () {
    const urlSite = 'https://lenta.ru'
    return new Promise(res => {
        request({
            url: urlSite,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36'
            }
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                const allData = []
                const $ = cheerio.load(body);
                const allRubrics = $('.js-menu-item')
                allRubrics.each(function (index, element) {
                    allData.push({
                        url: urlSite + $(element).attr('href'),
                        urlLocal: $(element).attr('href').replace('/news', ''),
                        text: $(element).text()
                    })


                })

                allData.splice(allData.length - 6, 6);
                allData.splice(0, 1);
                res(allData);


            }
        })
    })

}

exports.getAllNewsFromRubric = function (rubric) {
    const urlSite = 'https://lenta.ru'
    const fullUrl = urlSite + `/rubrics/${rubric}/`
    return new Promise(res => {
        request({
            url: fullUrl,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36'
            }
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                const allData = []
                const $ = cheerio.load(body);
                const textBlock = $('section').eq(1).find('.titles')
                textBlock.each(function (index, element) {

                    const href = $(element).find('a').attr('href');
                    const text = $(element).find('a').find('span').text();
                    const additionalText = $(element).find('div').text();
                    allData.push({
                        url: urlSite + '/' + href.substring(1),
                        text: text + '. ' + (additionalText !== '' ? additionalText : ''),
                        index: index
                    })


                })
                res(allData);


            }
        })
    })
}

exports.getNewsData = function (rubric, id) {

    return new Promise((res) => {
        this.getAllNewsFromRubric(rubric).then(result => {
            //console.log(result[id].url)
            request({
                url: result[id].url,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36'
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    const $ = cheerio.load(body);

                    res({
                        titleNews: $('.b-topic__title').text(),
                        textNews: $('.b-text').find('p').text(),
                        imgUrl: $('.g-picture').attr('src')

                    })

                }
            }
            )



            }
        )
    })
}

// const getAllRubrics = function() {
//     getRubrics(urlSite)
//         .then((res, rej) => {
//             console.log(res)
//         })
// }
