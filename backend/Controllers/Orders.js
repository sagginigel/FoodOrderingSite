/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 01/06/2021 - 01:23:02
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/06/2021
    * - Author          : 
    * - Modification    : 
**/
const Orders = require('../Models/Orders');

exports.getOrders = (req,res) => {
    orders.find({
        username : req.params.username
    }).then(result => {
        res.status(200).json({
            orders : result,
            message : "Success"
        })
    }).catch(error => {
        res.status(500).json({
            message : error
        });
    });
}

exports.saveOrders = (req,res) => {
    const username = req.body.username;
    const mobileNumber = req.body.mobileNumber;
    const total = req.body.total;
    const item_name =req.body.item_name;
    const item_quantity = req.body.item_quantity;

    const placeNewOrder = new Orders({
        username : username,
        mobileNumber : mobileNumber,
        total : total,
        items : {
            item_name : item_name,
            item_quantity : item_quantity
        }
    });

    // console.log(placeNewOrder);


    placeNewOrder.save().then(result => {
        res.status(200).json({
            message : "Order Saved succesfully",
            data : result
        })
        console.log(result);
    }).catch(error =>{
        res.status(500).json({
            message : error
        })
    });
}