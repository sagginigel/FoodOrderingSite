/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 28/05/2021 - 15:59:10
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/05/2021
    * - Author          : 
    * - Modification    : 
**/
const express = require('express');
const router = express.Router();

const cityController = require('../Controllers/city');
const mealTypeController = require('../Controllers/mealType')
const restaurantController = require('../Controllers/Restaurant');
const userController = require('../Controllers/User');
const menuController = require('../Controllers/Menu');
const orderController = require('../Controllers/Orders');

const paymentGatewayController = require('../Controllers/paymentGatewayController');

router.get('/cityList',cityController.getCityList);
router.get('/mealType',mealTypeController.getMealType);
router.post('/restaurantfilter', restaurantController.filter);
router.post('/signup',userController.signUp);
router.post('/login',userController.logIn);
router.get('/getrestaurantbycity/:city',cityController.restaurantCityList);
router.get('/getrestaurantbyid/:id',restaurantController.getrestaurantbyid);

router.get('/getmenuforrestaurants/:id',menuController.getMenuForRestaurants);

router.get('/fetchordersofusers/:username',orderController.getOrders);
router.post('/saveordersforuser',orderController.saveOrders);
router.post('/callback',paymentGatewayController.callback);

router.post('/payment',paymentGatewayController.payment);
module.exports = router;
