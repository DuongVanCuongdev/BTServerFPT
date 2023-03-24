var express = require('express');
var router = express.Router();

var settingsController = require('../controllers/settings.controller');

router.get('/login', settingsController.login);
router.get('/register', settingsController.register);

module.exports = router;