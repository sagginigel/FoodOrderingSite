/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 28/05/2021 - 15:52:25
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/05/2021
    * - Author          : 
    * - Modification    : 
**/
const city = require('../Models/city');

const restaurantCity = require('../Models/Restaurant');

exports.getCityList = (req, res) => {
    city.find().then(result => {

        const resultFilter = [...result.reduce((accumulator, element) =>
            accumulator.set(element.city_id, element), new Map()).values()];

        res.status(200).json({
            message: "City list fetched succesfully",
            cities: resultFilter
        });
        // console.log(result);
    }).catch(error => {
        res.status(500).json({ // 500 are server side errors 
            message: error
        });
    });
}

exports.restaurantCityList = (req, res) => {
    const city = req.params.city.toString();
    console.log(city);
    restaurantCity.find({
        city: city
    }).then(result => {
        res.status(200).json({
            message: "List fetched succesfully",
            restaurant: result
        })
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
}