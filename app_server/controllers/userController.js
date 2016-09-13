/* function for rendering 'user home' page, called by app_server/routes/index.js
go to app_server/views/user.jade for actual html */
module.exports.show = function(req, res) {
  res.render('user', { title: 'User Home Page' });
};
