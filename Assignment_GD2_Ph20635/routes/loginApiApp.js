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

/* GET home page. */
router.post('/', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  console.log("đã vào hàm post " + email + password)

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
       
        res.json({ success: true, msg: 'Successful login.' });
      }else{
        res.json({ success: false, msg: 'failed login.' });
      }
      })
    .catch((err) => {
      res.json({ success: false, msg: 'failed login.' });
    })
  })
  .catch((err)=>{ res.json({ success: false, msg: 'Successful created new user.' });})

 
});

module.exports = router;