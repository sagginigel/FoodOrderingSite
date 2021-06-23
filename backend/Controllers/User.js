const User = require('../Models/User');
// const userSignUp = require('../Validations/userSignUp');

exports.signUp = (req, res) => {

    // console.log(req.body);
    // const isValid = userSignUp.validateUserSignUp(req.body);
    // if (!isValid) {
    //     res.status(401).json({
    //         message: "Input Invalid"
    //     });
    // }

    /**Validation  */
    // if (!req.body.email) {
    //     res.status(401).json({
    //         message: "Input Invalid - No Email"
    //     });
    // }

    const email = req.body.email;
    const passwd = req.body.passwd;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const signUpUser = new User({
        email: email,
        passwd: passwd,
        firstName: firstName,
        lastName: lastName
    });

    signUpUser.save().then(result => {
        res.status(200).json({
            message: "User Signed up succesfully",
            user: result
        })
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    });
}

exports.logIn = (req, res) => {
    const email = req.body.email;
    const passwd = req.body.passwd;
    User.find({
        email: email,
        passwd: passwd
    }).then(result => {
        if (result.length >= 1) {
           res.status(200).json({
               message : "User logged in Succesfully",
               isAuthenticated : true,
               user : result 
           })
        } else {
            res.status(200).json({
                messgae: "User NOT logged in succesfully",
                isAuthenticated: false,
                user: result
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    })

}