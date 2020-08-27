module.exports = (req, res, next) => {
    //console.log(req.headers)
    if(req.headers.test && req.headers.test === '1234'){
        req.test = 'Сработала middleware. Передан заголовок test!'
    }
    next()
}