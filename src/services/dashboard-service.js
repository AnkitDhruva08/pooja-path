const dashboardModels = require('../models/dashboard-model');

module.exports.dashboardService = async(user) => {
    const data = await dashboardModels.getDashboardBookings(user)
    return data;
}


module.exports.insertBooking = async (userId, pandit_id, service, date, location) => {
    await dashboardModels.insertBooking(userId, pandit_id, service, date, location);
  };
module.exports.updateBookingStatus = async (bookingId, status) => {
    await dashboardModels.updateBookingStatus(bookingId, status);
    return { message: 'Booking status updated successfully' };
  }

  