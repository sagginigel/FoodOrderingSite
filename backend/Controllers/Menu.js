/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 30/05/2021 - 13:58:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/05/2021
    * - Author          : 
    * - Modification    : 
**/
const Menu = require('../Models/Menu');

exports.getMenuForRestaurants = (req,res) => {
    Menu.find({
        restaurantId : req.params.id
    }).then(result => {
        res.status(200).json({
            message : "Success",
            menu : result
        })
        console.log(result);
    }).catch(error => {
        res.status(500).json({
            message : error
        })
    });
}

