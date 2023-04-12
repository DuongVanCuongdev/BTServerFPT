var express = require('express');

const mongoose = require('mongoose');
const UserModel = require('../public/model/UserModel')

const bodyParser = require("body-parser");
const multer = require('multer')
const Jimp = require('jimp');
const { url } = require('inspector');

var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const uri = 'mongodb://localhost:27017/Manager'
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var upload = multer({          
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
})


router.post('/', upload.single('file'), async (req, res) => {

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  if (name != '' && email != '' && password != '' && confirmpassword != '') {

      if (password == confirmpassword) {

        try {
          const image = await Jimp.read(req.file.buffer);
    
          const avatar = await image.getBase64Async(Jimp.AUTO);
    
          const user = new UserModel({
            name: req.body.name,
            email: req.body.name,
            password: req.body.name,
            role: 'user',
            path: avatar
          })
    
          await user.save();
          res.cookie('dataUser', email)                               
          res.json({ success: true, msg: 'Successful created new user.' });
        } catch (error) {
          console.error(error);
          res.json({ success: true, msg: 'failed.' });
        }
      } else {
        res.json({ success: true, msg: 'failed.' });
      }
  } else {
    res.json({ success: false, msg: 'Failed created new user.' });
  }

});

module.exports = router;