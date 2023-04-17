const express = require('express');
const router = express.Router();
const multer = require('multer');
const SanPhamModel = require('../models/SanPhamModels')

var Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        let filename = file.originalname;
        arr = filename.split('.');
        let newFileName = '';
        for (let i = 0; i < arr.length; i++) {
            if (i != arr.length - 1) {
                newFileName += arr[i];
            } else {
                newFileName += ('-' + Date.now() + "1" + '.' + "png");
            }
        }
        cb(null, newFileName)

    }
})
var upload = multer({ storage: Storage })

router.get('/list', async(req, res) => {
    await SanPhamModel.find({}).then(sanPham => {
        res.render('DanhSachSanPham', { sanPham: sanPham.map(sanPham => sanPham.toJSON()) })
    })
})

router.get('/add', (req, res) => {
    res.render('ThemSanPham')
})

router.post('/add', upload.single('anhSP'), async(req, res) => {
  if(!req.body.id) {
    addSanPham(req, res)
  } else {
    updateSanPham(req, res)
  }
})

router.get('/delete/:id', async(req, res) => {
    try {
        const sanPham = await SanPhamModel.findByIdAndDelete(req.params.id, req.body);
        if (!sanPham) {
            res.status(404).send("Khong co san pham de xoa");
        } else {
            res.redirect('/sanpham/list')
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/edit/:id', async(req, res) => {
  await SanPhamModel.findById(req.params.id).then(sanPham => {
          res.render('ThemSanPham', {
              sanPham: sanPham.toJSON(),
              viewTitle: "Chỉnh sửa san pham"
          })
          console.log("Data: ", sanPham);
      })
      .catch(err => {
          console.error("err: ", err);
      })
})


async function updateSanPham(req, res) {
  const tenSP = req.body.tenSP;
  const giaSP = req.body.giaSP;
  const sizeGiay = req.body.sizeGiay;
  const anhSP = req.file.filename;
  
  var sanPham = await SanPhamModel.findByIdAndUpdate({_id: req.body.id});
  sanPham.tenSP = tenSP;
  sanPham.giaSP = giaSP;
  sanPham.sizeGiay = sizeGiay;
  sanPham.anhSP = anhSP;
  
  await sanPham.save();
  res.redirect('/sanpham/list');
}

async function addSanPham(req, res) {
  const tenSP = req.body.tenSP;
  const giaSP = req.body.giaSP;
  const sizeGiay = req.body.sizeGiay;
  const anhSP = req.file.filename;

  var newSanPham = new SanPhamModel({
      tenSP: tenSP,
      giaSP: giaSP,
      sizeGiay: sizeGiay,
      anhSP: anhSP,
  })

  await newSanPham.save().then(sanPham => {
      console.log('Dada added: ', sanPham);
      res.redirect('/sanpham/list')
  }).catch(err => {
      console.log('err add: ', err);

  })
}

router.get('/search', async function(req, res) {
    res.render('search')
})

router.post('/search', async(req, res) => {
    try {
        const regex = new RegExp(req.query.tenSP, 'i');
        const sanpham = await SanPhamModel.find({ tenSP: regex });

        if(sanpham.length > 0) {
            res.render('search', { sanpham: sanpham });
            console.log('data searched: ', sanpham);
        }
      } catch (err) {
        console.log('err: ', err);
      }
})

router.get('/detail/:id', async(req, res) => {
  await SanPhamModel.findById(req.params.id).then(sanPham => {
          res.render('ChiTietSanPham', {
              sanPham: sanPham.toJSON()
          })
          console.log("Data: ", sanPham);
      })
      .catch(err => {
          console.error("err: ", err);
      })
})




module.exports = router