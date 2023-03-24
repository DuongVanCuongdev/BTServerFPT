var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home.controller');

router.get('/', homeController.home);

module.exports = router;