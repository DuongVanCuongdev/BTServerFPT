const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const SanPhamModelsMB = require('../models/SanPhamModels');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

router.post('/add', upload.single('anhSP'), async(req, res) => {
  const tenSP = req.body.tenSP;
  const giaSP = req.body.giaSP;
  const sizeGiay = req.body.sizeGiay;
  const anhSP = req.file.filename;

    const newSanPham = new SanPhamModelsMB({
      tenSP: tenSP,
      giaSP: giaSP,
      sizeGiay: sizeGiay,
      anhSP: anhSP,
    })
    newSanPham.save()
        .then(sanpham => {
            res.status(200).json(newSanPham)
            console.log("Data added: ", sanpham);
        })
        .catch(err => {
            console.log("Lỗi add: ", err);
            res.status(500).send(err);
        })
})

router.get('/list', async(req, res) => {
    await SanPhamModelsMB.find({}).then(sanpham => {
        res.status(200).json(sanpham)
    }).catch(err => {
        res.status(500).send(err);
    })

})


router.put('/edit/:id', async(req, res) => {
  const tenSP = req.body.tenSP;
  const giaSP = req.body.giaSP;
  const sizeGiay = req.body.sizeGiay;
  const anhSP = req.file;

    SanPhamModelsMB.findByIdAndUpdate({ _id: req.params.id }, { tenSP, giaSP, sizeGiay, anhSP }, { new: true })
        .then(sanpham => {
            console.log('Updated sp:', sanpham);
            res.status(200).json(sanpham);
        })
        .catch(err => {
            console.error('Error updating:', err);
        })
});


router.delete('/delete/:id', async function(req, res) {

    try {
        const sanPham = await SanPhamModelsMB.findByIdAndDelete(req.params.id, req.body);
        if (!sanPham) {
            res.status(404).send("Khong co sp de xoa");
        } else {
          console.log('Deleted sp: ', sanPham);
          
            res.json(sanPham);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


router.get('/search/:key', async(req, res) => {
    try {
        var search = req.params.key;
        var data = await SanPhamModelsMB.find({ "tenSP": { $regex: ".*" + search + ".*" } })

        if (data.length > 0) {
            res.status(200).send({ isSuccess: true, msg: "thong tin: ", data: data })
        } else {
            res.status(200).send({ isSuccess: false, msg: "khong tim thay thong tin" })
        }
    } catch (err) {
        res.status(400).send({ isSuccess: false, msg: err.message })
    }

})

module.exports = router