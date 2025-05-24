const express = require('express');
const router = express.Router();
const authController = require('../controller/auth-controller');

// Register route
router.get('/register', authController.renderRegisterPage);
router.post('/register', authController.registerUser);
router.get('/login', authController.loginPageRender);
router.post('/login', authController.user_login_controller);

module.exports = router;
