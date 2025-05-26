const JWT = require("jsonwebtoken");
const argon2 = require('argon2');

const pg_pool_db = require('../config/db-config');
const dbPoolManager = require("../config/db-pool-manager");
const { use } = require("../routes");
const readDB = dbPoolManager.get("readDB", pg_pool_db);


// checking user is Authenticated
exports.isAuthenticatedUser = async (req, res, next) => {
    const {token} = req.cookies
    console.log('token ===<<<<>>>>', token) 

    if (!token) {
        return next(new ErrorHandler("Please Login To access this route", 401))
    } else {
        const decoded = await JWT.verify(token, process.env.JWT_SECRET)
        console.log('decode ===<<<>>>', decoded)
        req.user = await User.findById(decoded.userId)
        console.log('req.user ===<<<>>>>', req.user);
        next()
    }
}




// verifying user 
module.exports.verify_user = async (Login_details) => {
    const email = Login_details.email.trim();
    const password = Login_details.password.trim();
  
    const sql = {
      text: `SELECT id, username, email, role, password FROM users WHERE email = $1 AND active = true;`,
      values: [email]
    };
  
    const data = await readDB.query(sql);
    if (data.rowCount === 0) {
      return {
        status: 404,
        message: 'User not found'
      };
    }
  
    const user = data.rows[0];
  
    console.log('Stored hash:', user.password);
    if (user.password === password) {
      return { status: 200, message: "User verified", data: user };
    } else {
      return { status: 401, message: "Incorrect password" };
    }

  };
  