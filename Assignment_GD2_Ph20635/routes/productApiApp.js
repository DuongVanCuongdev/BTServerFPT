var express = require('express');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const checkToken = require('../config/checkToken')

const bodyParser = require("body-parser");
const multer = require('multer')
const Jimp = require('jimp');

const ProductModel = require('../public/model/ProductModel');
const UserModel = require('../public/model/UserModel');

var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const uri = 'mongodb://localhost:27017/Manager'
mongoose.connect(uri)

var upload = multer({          
  
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
})

// delete
router.delete('/delete/:id', (req, res) => {
  ProductModel.deleteOne({ _id: req.params.id })
    .then(() => { res.json({ success: true, msg: 'Successful delete new product.' }); })
    .catch(() => { res.json({ success: false, msg: 'Successful delete new product.' }); })
})

//edit
router.post('/edit/:id', checkToken, upload.single('file'), async (req, res) => {
  const users = await UserModel.find({ email: req.user.email })

      const name = req.body.name
      const price = req.body.price
      const color = req.body.color
      const type = req.body.type
      const makhachhang = users[0]._id
      const tenkhachhang = users[0].name
      let avatar = req.body.file

      if (name != '' && price != '' && price >= 0 && color != '' && type != '' && makhachhang != '' && tenkhachhang != '') {
        try {
          const image = await Jimp.read(req.file.buffer);
          avatar = await image.getBase64Async(Jimp.AUTO);
        } catch (error) {
          console.log(error);
        }

        ProductModel.updateMany({ _id: req.params.id }, { name: name, price: price, color: color, type: type, path: avatar })
          .then(() => {
            res.json({ success: true, msg: 'Successful edit new product.' });
          }).catch((err) => {
            res.json({ success: false, msg: 'failed created new product.' });
          })

      } else {
        res.json({ success: false, msg: 'failed.' });
      }



})

router.post('/add', checkToken, upload.single('file'), async (req, res) => {
  const users = await UserModel.find({ email: req.user.email })

      const name = req.body.name
      const price = req.body.price
      const color = req.body.color
      const type = req.body.type
      const makhachhang = users[0]._id
      const tenkhachhang = users[0].name
      let avatar = req.body.file


      if (name != '' && price != '' && price >= 0 && color != '' && type != '' && makhachhang != '' && tenkhachhang != '') {

        try {
          const image = await Jimp.read(req.file.buffer);
          avatar = await image.getBase64Async(Jimp.AUTO);
        } catch (error) {
          console.log(error);
        }

        ProductModel.create({ name: name, price: price, color: color, type: type, makhachhang: makhachhang, tenkhachhang: tenkhachhang, path: avatar })
          .then(() => {
            res.json({ success: true, msg: 'Successful created new product.' });
          }).catch((err) => {
            res.json({ success: false, msg: 'failed.' });
          })
      } else {
        res.json({ success: false, msg: 'failed.' });
      }


})

router.get('/', checkToken, async function (req, res, next) {
  const users = await UserModel.find({ email: req.user.email })

      ProductModel.find()
        .then((products) => {
          res.render('product', { user: users[0], products: products, isList: true, product: null })
        })
});


router.get('/form', checkToken, async (req, res) => {
      const users = await UserModel.find({ email: req.user.email })

      res.json({ success: true, data: users });

})

module.exports = router;
