const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Registering the Restaurant Schema
const RestaurantSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city_name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    thumb: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
  
    type: {
        type: Array,
        required: true
    },
    Cuisine: {
        type: Array,
        required: true
    },
    mealtype: { 
        type : String,
        required: true
    },
    cuisine_id : {
        type : Number,
        required : true
    }
});

// checking the model existence, if not exist then create collection in DB
module.exports = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema, 'restaurantdata');