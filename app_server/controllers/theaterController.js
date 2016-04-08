/* function for rendering 'theater' page, called by app_server/routes/index.js
go to app_server/views/theater.jade for actual html */
module.exports.show = function(req, res) {
  res.render('index', { title: 'Specific Theater Main Page' });
};
