const argon2 = require('argon2');
const user_models = require('../models/auth-model');

const user_verification = require('../middlware/auth-middleware');

module.exports.user_registration_service = async(reistrationData) => {
    console.log('registrationData in service ====<<<>>>', reistrationData);
    const hashedPassword = await argon2.hash(reistrationData.password);
    console.log('hashedPassword ===<<<<>>>', hashedPassword);

    const userRegistrationData = {username : reistrationData.name,email : reistrationData.email,
                                password : hashedPassword, role: reistrationData.role};

    console.log('userRegistrationData ====<<<<<>>>', userRegistrationData);


    const data = await user_models.user_registration_model(userRegistrationData);
    
    return data;
} 




// user login service 

module.exports.user_login_service = async(login_details) => {

    const verify_user = await user_verification.verify_user(login_details);
    return verify_user
}