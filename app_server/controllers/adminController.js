/* function for rendering 'theater admin' page, called by app_server/routes/index.js
go to app_server/views/admin.jade for actual html */
module.exports.show = function(req, res) {
  res.render('admin', { title: 'Theater Admin Page' });
};
