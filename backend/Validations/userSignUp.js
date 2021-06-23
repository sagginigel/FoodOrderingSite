exports.validateUserSignUp = (signUpData) => {
    console.log(signUpData.email);
    // if (!signUpData){
    //     return false;
    // }

    if(!signUpData.email){
        return false;
    }
}