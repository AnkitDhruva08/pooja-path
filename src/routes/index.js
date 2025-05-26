const express = require('express');
const router = express.Router();
const indexController = require('../controller/index');
const authRoute = require('./auth-routes');
const dashboardRout = require('./dashboard-routes');

router.get('/', indexController.renderIndexPage);
router.use('/', authRoute); 
router.use('/', dashboardRout); 


module.exports = router;
