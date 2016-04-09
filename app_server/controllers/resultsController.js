/* function for rendering 'results' page, called by app_server/routes/index.js
go to app_server/views/results.jade for actual html */
module.exports.show = function(req, res) {
  res.render('results', { title: 'Results Page' });
};
