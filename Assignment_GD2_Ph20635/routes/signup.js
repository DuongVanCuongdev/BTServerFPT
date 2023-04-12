var express = require("express");

const mongoose = require("mongoose");
const UserModel = require("../public/model/UserModel");

const bodyParser = require("body-parser");
const multer = require("multer");
const Jimp = require("jimp");
const { url } = require("inspector");

var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017/Manager";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/", upload.single("file"), async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (name != "" && email != "" && password != "") {
    try {
      const image = await Jimp.read(req.file.buffer);

      const avatar = await image.getBase64Async(Jimp.AUTO);

      const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "user",
        path: avatar,
      });

      await user.save();
      res.cookie("dataUser", email);
      res.render("login");
    } catch (error) {
      console.error(error);
      res.render("signup", { signup_failed: "server error" });
    }
  } else {
    res.render("signup", { signup_failed: "Signup failed, check again" });
  }
});

router.get("/", function (req, res, next) {
  res.render("signup", { signup_failed: "" });
});

module.exports = router;
