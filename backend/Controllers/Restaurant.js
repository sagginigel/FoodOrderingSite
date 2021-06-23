const Restaurant = require('../Models/Restaurant');

exports.filter = (req, res) => {
    const mealtype_id = req.body.mealtype_id;
    const cuisines = req.body.cuisine_ids;
    const city_name = req.body.city_name;
    const costRange = req.body.costRange;
    const sortBy = req.body.sortBy;
    const city = req.body.city;
    let page = req.body.page;

    let payload = {
        'type.mealtype': mealtype_id,
    };

    if (page === undefined) { page = Number(1); }
    let start = Number(page * 2) - 2;
    let end = Number(page * 2);

    /**
     * To display all records when no cousine is selected
     */
    if (cuisines && cuisines.length > 0) {
        payload['Cuisine.cuisine'] = {
            $in: cuisines
        };
    }

    if (city_name) {
        payload['city_name'] = {
            $in: city_name
        }
    }

    if (costRange) {
        const minCost = costRange.split("-")[0];
        const maxCost = costRange.split("-")[1];
        // console.log(`${minCost} and ${maxCost}`);
        payload['cost'] = {
            $gt: minCost,
            $lt: maxCost
        }
    }
    // console.log(req.body.cuisine_ids);

    if (Number(city) >= 1) {
        payload['city'] = {
            $in: city
        }
    }

    Restaurant.find(payload).sort({ 'cost': sortBy })
        .then(result => {
            const count = Math.ceil(result.length / 2);
            const resultValues = result.slice(start, end);
            console.log(result);
            // console.log(start, end);
            res.status(200).json({
                message: "Filtered list fetched successfully",
                restaurants: resultValues,
                pageCount: count
            });
            console.log(count);
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                message: error
            });
        })
}

// exports.filter = (req, res) => {
//     const mealtype_id = req.body.mealtype_id;
//     const cuisines = req.body.cuisine_ids;

//     let payload = {
//         'type.mealtype': mealtype_id,
//         // 'Cuisine.cuisine' : cuisine
//     };

//     /**
//      * To display all records when no cousine is selected
//      */
//     if (cuisines && cuisines.length > 0) {
//         payload ['Cuisine.cuisine'] = {
//             $in : cuisines
//         };
//     }

//     console.log(req.body.cuisine_ids);

//     Restaurant.find(payload)
//         .then(result => {
//             // console.log(result);
//             res.status(200).json({
//                 message : "Filtered list fetched successfully",
//                 restaurants : result
//             });
//         }).catch(error => {
//             console.log(error);
//             res.status(500).json({
//                 message: error
//             });
//         })
// }

exports.getrestaurantbyid = (req, res) => {
    Restaurant.find({
        _id: req.params.id
    }).then(result => {
        res.status(200).json({
            restaurant: result[0],
            message: "Success"
        });
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    });
}