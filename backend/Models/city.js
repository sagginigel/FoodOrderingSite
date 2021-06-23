const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const citySchema = new Schema({
//     location_name: {
//         type: String,
//         require : true
//     },
//     name: {
//         type: String,
//         require: true
//     },
//     city_id: {
//         type: String,
//         require: true
//     },
//     location_id: {
//         type: String,
//         require: true
//     },
//     country_name: {
//         type: String,
//         require: true
//     }
// });

// module.exports = mongoose.model('city', citySchema, 'location'); /* (model_name, schema, collection_name)*/

const citySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    city_id: {
        type: String,
        require: true
    },
    country_name: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('city', citySchema, 'location'); /* (model_name, schema, collection_name)*/
