var passport = require("passport");
var config = require("../connect/database");
const checkToken = require('../connect/Passport')
var express = require("express");
var multer = require("multer");
const fs = require("fs");
var jwt = require("jsonwebtoken");
var router = express.Router();
var User = require("../models/user");
var Product = require("../models/product");
const request = require("request");
const mongoose = require('mongoose');


const bodyParser = require("body-parser");
// // parse requests of content-type - application/json
router.use(bodyParser.json());

const parser = bodyParser.urlencoded({ extended: true });


const uri = 'mongodb://localhost:27017/Manager'


router.use(parser);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //neu chua co folder thi tao ra folder
    if (
      file.mimetyp == "image/jpeg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png"
    ) {
      var dir = "./uploads";

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, "uploads");
    } else {
      cb(new Error("Không phải là ảnh"));
    }
  },

  filename: function (req, file, cb) {
    let fileName = file.originalname;
    arr = fileName.split(".");

    let newFileName = "";

    for (let i = 0; i < arr.length; i++) {
      if (i != arr.length - 1) {
        newFileName += arr[i];
      } else {
        newFileName += "-" + Date.now() + "." + arr[i];
      }
    }
    cb(null, newFileName);
  },
});

var upload = multer({ storage: storage });


router.get("/signup", async (req, res) => {
  res.render("dangKy", signUpObj);
});
router.post("/signup", upload.single("file"), async function (req, res) {
  const name = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  if (name != '' && email != '' && password != '') {


        try {
          // Load ảnh từ buffer bằng Jimp
    
          // Chuyển đổi ảnh sang base64 string
    
          // Lưu user vào MongoDB
          const user = new User({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
            permission: 'user',
            image: upload.fileName
          })
    
          await user.save();
          // res.send('User created successfully!');
          res.cookie('dataUser', email)                                 // lưu cookie (kiểu shearefeferent)
          res.render('index', { user: user })

        } catch (error) {
          console.error(error);
          res.render('dangKy', { signup_failed: 'server error' });
        }
      
  } else {
    res.render('dangKy', { signup_failed: 'Signup failed, check again' });
  }
});

const signInObj = {
  pageTitle: "Sign in",
  task: "Sign in",
  actionTask: "/api/signin",
  optionsRegister: true,
};

router.get("/signin", async (req, res) => {
  res.render("dangNhap", signInObj);
});

router.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.pass;

  console.log("đã vào hàm post " + email + password)

  
    console.log('connect succes')

    User.findOne({email: email, password: comparePassword(password)})
    .then((data) => {
      console.log(data);
      if(data[0]){
        var token = ""
        if(data[0].permission == "admin"){
          token = jwt.sign({ user: {email: data[0].email,permission: data[0].role} }, "SecretToken", { expiresIn: "1h", });
        }else{
          token = jwt.sign({ user: {email: data[0].email,permission: data[0].role} }, "SecretToken", { expiresIn: "1h", });
        }
        // req.session.token = token;
        res.cookie("token", token);
        res.redirect("/");
      }else{
        res.render('dangNhap');
      }
      })
    .catch((err) => {
      console.log(err);
      res.send('find failed')
    })
  

});



router.get(
  "/users",
  checkToken,
  async function (req, res) {
    var token = req.cookies.token;

    console.log(token);

  //   if (token) {
  //     // var token = jwt.sign(user.toJSON(), config.secret);
  //     //   req.session.user = user.toObject();
  //       // req.session.token = "JWT " + token;

  //       request.get(
  //         "http://localhost:3000/api/listUser",
  //         {
  //           headers: { Authorization: "JWT " + token },
  //         },
  //         function (error, response, body) {
  //           res.send(body);
  //         }
  //       );
  //   } else {
  //     return res.redirect("/api/signin");
  //   }
  }
);

router.get("/listUser", async (req, res) => {
  let users = await User.find().lean();

      return res.render("danhSachNguoiDung", {
        users, 
      });
})

router.get(
  "/aaa", passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    var token = getToken(req.headers)
    console.log(token);
    
  }
);


router.get(
  "/user/delete/:id",
  async (req, res) => {
    var token = req.body.headers
    console.log(token);
    try {
      const user = await User.deleteOne(req.params.id, req.body);
      if (!user) {
        res.status(404).send("Khong co user de xoa");
      } else {
        var token = jwt.sign(user.toJSON(), config.secret);
        homeObj.user = user.toObject();
        req.session.user = user.toObject();
        req.session.token = "JWT " + token;

        // request.get(
        //   "http://localhost:3000/api/users",
        //   {
        //     headers: { Authorization: "JWT " + token },
        //   },
        //   function (error, response, body) {
        //     res.send(body);
        //   }
        // );
        res.redirect('/api/users');

      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.get("/user/updateScreen/:id", async (req, res) => {
  await User
  .findById(req.params.id)
  .then((user) => {
    res.render("themNguoiDung", {
      user: user.toJSON(),
    });
    console.log("Data: ", user);
  })
  .catch((err) => {
    console.error("err: ", err);
  });
})


router.post("/user/update/:id",upload.single("file"), async (req, res, next) => {
  User
      .updateOne(
        { _id: req.params.id },
        {
          username: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      image: req.file.filename,
      permission: req.body.permission,
        }
      )
      
})



module.exports = router;
