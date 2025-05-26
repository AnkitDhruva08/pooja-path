const dashboardService = require('../services/dashboard-service');
const dashboardModels = require('../models/dashboard-model');
module.exports.renderDashboard = async (req, res, next) => {
  try {
    const user = req.session.user;

    console.log('userDetails ===<<<<>>', user); 
    const response = await dashboardService.dashboardService(user);
    console.log('data ==<<<>>', response);

    if (!user) {
      return res.redirect('/login'); 
    }

    // Extract bookings from response
    const bookings = response.data || [];

    res.render('dashboard', {
      title: 'Welcome to PUJAPATH Dashboard',
      message: 'Your trusted place to book Pandits online',
      user: user,
      bookings: bookings,
    });
  } catch (error) {
    next(error);
  }
};


module.exports.insertBooking = async (req, res) => {
  const { pandit_id, service, date, location } = req.body;
  const user = req.session.user;
  console.log('req.body:', req.body);

  if (!user || user.role !== 'user') {
    return res.status(403).send('Unauthorized access');
  }

  if (!pandit_id || !service || !date || !location) {
    return res.status(400).send('All fields are required');
  }

  try {
    await dashboardService.insertBooking(user.id, pandit_id, service, date, location);
    res.status(200).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error inserting booking:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log('req.body:, id', req.body);
  console.log('req.params.id:', id);
  try {
    await dashboardService.updateBookingStatus(id, status);
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).send('Internal Server Error');
  }
};



module.exports.getPandits = async (req, res) => {
  const result = await dashboardModels.getAllPandits();
  console.log('result ===<<<<<>>>>>', result);
  res.status(result.status).json(result);
};



