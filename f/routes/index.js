var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("dangKy");
});

router.get('/login', function(req, res, next) {
  res.render("dangNhap");
});

module.exports = router;
