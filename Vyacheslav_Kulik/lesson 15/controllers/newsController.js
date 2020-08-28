const dataLenta = require('../data/lentaParser');


exports.index = function (req, res, next) {
    dataLenta.getRubrics().then(
        (result) => {
            res.render('news', {title: 'News', allRubric: result});
        }
    )
}


exports.index_post = function (req, res, next) {
    res.send('This is post method news')
}

exports.rubrics = function (req, res, next) {
    //console.log(req.params.id)
    dataLenta.getAllNewsFromRubric(req.params.id).then(
        (result) => {
            const quantityNewsParam = req.cookies.quantityNewsParam ? req.cookies.quantityNewsParam : 30;
            result.splice(quantityNewsParam,result.length - quantityNewsParam)
            res.render('rubrics', {title: req.params.id.toUpperCase(), allNews: result});
        }
    )
}

exports.one_news = function (req, res, next) {

    dataLenta.getNewsData(req.params.id, req.params.id_news).then(result => {
        const quantitySymbolsParam = req.cookies.quantitySymbolsParam ? req.cookies.quantitySymbolsParam : 3000;
        result.textNews = result.textNews.substring(0, quantitySymbolsParam)
            res.render('news_one', {title: req.params.id.toUpperCase(), newsData: result});
        }
    )
}
