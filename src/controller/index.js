// src/controller/indexController.js




module.exports.renderIndexPage = async(req, res, next) => {
    res.render('index', {
    title: 'Welcome to PUJAPATH',
    message: 'Your trusted place to book Pandits online'
  });
}
