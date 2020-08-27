var express = require('express');
var news_controller = require('../controllers/newsController');

var router = express.Router();

router.get('/', news_controller.index);

router.post('/', news_controller.index_post);

router.get('/rubrics/:id', news_controller.rubrics);

router.get('/rubrics/:id/:id_news', news_controller.one_news);


module.exports = router;
