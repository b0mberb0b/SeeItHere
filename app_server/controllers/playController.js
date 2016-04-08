/* function for rendering 'theater production' page, called by app_server/routes/index.js
go to app_server/views/play.jade for actual html */
module.exports.show = function(req, res) {
  res.render('index', { title: 'Specific Theater Production Page' });
};
