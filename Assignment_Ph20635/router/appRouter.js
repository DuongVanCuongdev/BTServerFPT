var express = require('express');
var router = express.Router();
var multer = require('multer');
const fs = require('fs');


const userss = require('../data/user');
const products = require('../data/product');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //neu chua co folder thi tao ra folder
        if(file.mimetyp == "image/jpeg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
            var dir = './uploads';
  
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
              cb(null, 'uploads')
        } else {
            cb(new Error('Không phải là ảnh'));
  
        } 
    },
  
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        arr = fileName.split('.');
  
        let newFileName = '';
  
        for(let i = 0; i < arr.length; i++) {
          if (i != arr.length - 1) {
            newFileName += arr[i];
          } else {
            newFileName += ('-' + Date.now() + '.' + arr[i]);
          }
        }
        cb(null, newFileName)
        
    }
  })
  
  var upload = multer({ storage: storage })
  
  const users = [];
  
  router.post('/dangky', upload.single('file'), (req, res) => {
    const fullName = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
  
    if (email == "" || password == "" || fullName == "" || !req.file) {
      res.status(400).send('Khong de trong');
    } else {
      const newUser = {
      email,
      password,
      fullName,
      avatar: req.file
      };
      users.push(newUser);
      console.log(users);
      res.redirect('dangNhap')
    }
  });
  
  
  
  
  router.post('/dangnhap', (req, res) => {
    const email = req.body.diaChiEmail
    const password = req.body.matKhau
  
    if(!email == "" && !password == "") {
      if(users.length == 0){
        res.send("Ban chua co tai khoan");
      } else {
        for(let i = 0; i <= users.length; i++) {
          if(email == users[i].email && password == users[i].password) {
            res.redirect('quantri')
          } 
        }
      }
      
    } else {
      res.send("Khong de rong");
    }
  });


  router.get('/dangnhap', function (req, res) {
    res.render('dangNhap') //file name
  })
  
  router.get('/dangky', function (req, res) {
    res.render('dangKy') //file name
  })
  
  router.get('/', (req, res) => {
    res.render('dangNhap')
  });
  
  router.get('/quantri', function(req, res) {
    res.render('quanTri', { userss, products });
  })

  router.get('/themNguoiDung', function(req, res) {
    res.render('themNguoiDung');
  })

  router.get('/themSanPham', function(req, res) {
    res.render('themSanPham');
  })


  module.exports = router