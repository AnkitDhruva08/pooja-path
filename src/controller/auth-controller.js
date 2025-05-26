const user_services = require('../services/auth-service');
const redisStore = require('../utils/redis-util')
const jwtAccesUtils = require('../utils/generate-token')


module.exports.renderRegisterPage = async(req, res, next) => {
    res.render('register');
}


module.exports.registerUser = async(req, res, next) => {
    const { username, email, password, role } = req.body;
  console.log('Received registration data:', req.body);
    console.log('data comming from frontend <<<<<>>>>>', req.body);

   const data = await user_services.user_registration_service(req.body);
   console.log('data ===<<<<<>>>', data)
   
   const statusCode = data.status === 200 ? 200 : data.status;

    res.status(statusCode).json(data)
}


// render login page
module.exports.loginPageRender = async(req,res, next) => {
    res.render('login')
}

module.exports.user_login_controller = async(req, res, next) => {
    console.log('login details comming from frontend <<<>>>>', req.body);
    const verifiedUser = await user_services.user_login_service(req.body);
    console.log('verifiedUser ====<<<<<>>>>>', verifiedUser);
    if(verifiedUser.status !== 200){
        res.status(verifiedUser.status).json({status : verifiedUser.status, message : verifiedUser.status})

    }

    const userDetails = verifiedUser.data;
    // generate user access token 
    const token = await jwtAccesUtils.generateToken(res, userDetails);


    const createUserSession = {
        id : userDetails.id,
        name : userDetails.username,
        email : userDetails.email,
        role : userDetails.role,
        token : token
    }

    // ✅ Set user session
    req.session.user = createUserSession;

    // set user session in redis 
    res.status(200).json({
        status : 200,
        message : 'Logged in successfully',
        data : createUserSession

    })

}