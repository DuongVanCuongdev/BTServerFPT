const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const session = require('express-session');
const checkToken = require('../config/checkToken')


const UserModel = require('../public/model/UserModel')

var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const uri = 'mongodb://localhost:27017/Manager'

router.use(session({
  secret: 'my-secret-key', 
  resave: false, 
  saveUninitialized: false, 
}));

router.post('/', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;


  mongoose.connect(uri)
  .then(() =>{
    console.log('connect succes')

    UserModel.find({email: email, password: password})
    .then((data) => {
      if(data[0]){
        var token = ""
        if(data[0].role == "admin"){
          token = jwt.sign({ user: {email: data[0].email,role: data[0].role} }, "SecretToken", { expiresIn: "1h", });
        }else{
          token = jwt.sign({ user: {email: data[0].email,role: data[0].role} }, "SecretToken", { expiresIn: "1h", });
        }
        res.cookie("token", token);
        res.redirect("/");
      }else{
        res.render('login', { login_failed: 'Login failed', email: email });
      }
      })
    .catch((err) => {
      res.send('find failed')
    })
  })
  .catch((err)=>{ res.send('connect failed') })

 
});


router.get('/' , function(req, res, next) {
  
  res.render('login')
});

module.exports = router;