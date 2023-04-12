var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    permission: {
        type: String
    }
});



module.exports = mongoose.model('User', UserSchema);
