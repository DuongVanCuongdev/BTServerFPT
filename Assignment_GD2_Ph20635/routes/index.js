var express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const session = require('express-session');
var jwt = require('jsonwebtoken');
const checkToken = require('../config/checkToken')

const UserModel = require('../public/model/UserModel')
var router = express.Router();

const uri = 'mongodb://localhost:27017/Manager'

mongoose.connect(uri)

router.get('/', checkToken,async function (req, res, next) {
      const users = await UserModel.find({ email: req.user.email })
      res.render('index', {user: users[0]})
      
});

router.get('/logout', function (req, res) {
  res.clearCookie('token')
  res.render('login', { login_failed: '', email: '' });
})


module.exports = router;
