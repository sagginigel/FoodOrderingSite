/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 01/06/2021 - 01:03:50
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/06/2021
    * - Author          : 
    * - Modification    : 
**/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    username : {
        type : String,
        required : true
    }, 
    mobileNumber : {
        type : Number,
        required : true
    }, 
    total : {
        type : Number,
        required : true
    }, 
    items : [{
        item_name : {
            type : String,
            required : true
        }, 
        item_quantity : {
            type : String,
            required : true
        }

    }]
});


// const ordersSchema = new Schema({
//     username : {
//         type : String,
//         required : true
//     }, 
//     mobileNumber : {
//         type : Number,
//         required : true
//     }, 
//     items : {
//         type : Array,
//         required : true
//     }, 
//     total : {
//         type : Number,
//         required : true
//     }, 
//     item_name : {
//         type : String,
//         required : true
//     }, 
//     item_quantity : {
//         type : String,
//         required : true
//     }
// });

module.exports = mongoose.model('orders', ordersSchema, 'orders');