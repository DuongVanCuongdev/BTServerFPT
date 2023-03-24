var express = require('express');
var router = express.Router();

var accountsController = require('../controllers/accounts.controlller');

router.get('/', accountsController.list);

module.exports = router;