const express = require('express');
const router = express.Router();
const indexController = require('../controller/index');
const authRoute = require('./auth-routes');

router.get('/', indexController.renderIndexPage);
router.use('/', authRoute); 

module.exports = router;
