/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 30/05/2021 - 14:16:49
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/05/2021
    * - Author          : 
    * - Modification    : 
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    item : {
        type : String,
        required : true
    },cost : {
        type : Number,
        required : true
    },description : {
        type : String,
        required : true
    },restaurantId : {
        type : String,
        required : true
    },
    _id : {
        type : String,
        required : true
    },
})

module.exports = mongoose.model('Menu',menuSchema,'menu');