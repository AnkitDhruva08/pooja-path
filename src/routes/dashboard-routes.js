const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboard-controller');

// dashboard route
router.get('/dashboard', dashboardController.renderDashboard);
router.post('/book-pandit', dashboardController.insertBooking);
router.post('/dashboard/booking/:id/update', dashboardController.updateBookingStatus);
router.get('/pandits', dashboardController.getPandits);



module.exports = router;