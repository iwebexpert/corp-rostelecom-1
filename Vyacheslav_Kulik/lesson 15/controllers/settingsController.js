exports.settings = function (req, res, next) {

    res.render('settings', {
        title: 'Settings',
        quantityNewsParam: req.cookies.quantityNewsParam ? req.cookies.quantityNewsParam : 30,
        quantitySymbolsParam: req.cookies.quantitySymbolsParam ? req.cookies.quantitySymbolsParam : 3000
    })
}

exports.settings_post = function (req, res, next) {
    res.cookie('quantityNewsParam', req.body.quantityNewsParam)
    res.cookie('quantitySymbolsParam', req.body.quantitySymbolsParam)
    res.redirect('/settings')
}