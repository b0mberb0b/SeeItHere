/* function for rendering index page, called by app_server/routes/index.js
go to app_server/views/index.jade for actual html */
module.exports.index = function(req, res) {
  res.render('index', { title: 'SeeItHere Theater' });
};
