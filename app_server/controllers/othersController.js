/* function for rendering 'about' page, called by app_server/routes/index.js
go to app_server/views/about.jade for actual html */
module.exports.about = function(req, res) {
  res.render('about', { title: 'About Page' });
};

/* function for rendering 'terms and conditions' page, called by app_server/routes/index.js
go to app_server/views/terms.jade for actual html */
module.exports.terms = function(req, res) {
  res.render('terms', { title: 'Terms and Conditions Page' });
};

/* function for rendering 'FAQ' page, called by app_server/routes/index.js
go to app_server/views/FAQ.jade for actual html */
module.exports.faq = function(req, res) {
  res.render('faq', { title: 'Frequently Asked Questions Page' });
};
