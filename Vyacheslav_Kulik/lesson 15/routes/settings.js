var express = require('express');
var settings_controller = require('../controllers/settingsController');

var router = express.Router();

router.get('/', settings_controller.settings);

router.post('/', settings_controller.settings_post);

module.exports = router;
