const express = require('express')
const router = express.Router()

const rp = require('../public/js/recipeParse')


router.get('/', (req, res) => {
    res.render('home', {
        recCount: req.cookies.recipescount,
    })

})

router.get('/recipesList', (req, res) => {
    const recCount = req.cookies.recipescount
    const recParse = new rp(recCount)
    const recData = async () => {
        const data = await recParse.getRecipes()
        res.render('recipesList', {
            data,
            recCount: req.cookies.recipescount,
        })
    }

    recData()
})

router.post('/recipesParse', (req, res) => {
    const recCount = req.body.count
    res.cookie('recipescount', recCount)
    res.redirect('/recipesList')
})

module.exports = router