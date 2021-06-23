const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email : {
        type : String,
        required : true
    },passwd : {
        type : String,
        required : true
    },firstName : {
        type : String,
        required : true
    },lastName : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('user',UserSchema);