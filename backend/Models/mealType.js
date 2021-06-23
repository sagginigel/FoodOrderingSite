/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 30/05/2021 - 14:16:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/05/2021
    * - Author          : 
    * - Modification    : 
**/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealTypeSchema = new Schema({
    id: {
        type : String,
        require : true
    },
    name: {
        type: String,
        require: true
    },
    content :{
        type: String,
        require: true
    },
    image :{
        type : String,
        require : true
    }
});

module.exports = mongoose.model('mealType',mealTypeSchema,'mealtype'); /* (model_name, schema, collection_name)*/