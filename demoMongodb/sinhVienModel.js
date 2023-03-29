const mongoose = require('mongoose');

const SinhVienSchema = new mongoose.Schema ({
    ten: {
        type: String
    },
    tuoi: {
        type: Number,
        default: 0
    },
    diachi: {
        type: String,
        required: true
    }
});

const SinhVienModel = new mongoose.model('sinhvien',SinhVienSchema );

module.exports = SinhVienModel;



