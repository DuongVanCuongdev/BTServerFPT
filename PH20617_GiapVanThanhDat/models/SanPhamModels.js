const mongoose = require('mongoose');

const ProductModels = new mongoose.Schema({
  tenSP: {
    type: String,
    require
  },
  giaSP: {
    type: Number,
    require,
  },
  sizeGiay: {
    type: Number,
    require
  },
  anhSP: {
    type: String,
    require
  }
})

const Product = mongoose.model('product', ProductModels);
module.exports = Product;