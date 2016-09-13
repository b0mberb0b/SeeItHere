/* function for rendering 'about' page, called by app_server/routes/index.js
go to app_server/views/about.jade for actual html */
module.exports.about = function(req, res) {
  res.render('about', {
    title: 'About SeeItHere',
    content: 'SeeItHere Theater App was designed to help you find the productions you want to see. \n\nRainier Reindeer is a team of genius computer programmers consisting of Noah Reyes, Rob Shelton, Nicky Smit, and Nathan Wang. Together, they are an unstoppable programming force.'
  });
};

/* function for rendering 'terms and conditions' page, called by app_server/routes/index.js
go to app_server/views/terms.jade for actual html */
module.exports.terms = function(req, res) {
  res.render('terms', {
    title: 'Terms and Conditions Page',
    content: 'SeeItHere Theater App is not a licensed application, nor is Rainier Reindeer a real organization, and this website is not online, so our terms have no real audience or applicability, this is solely here for authenticity\'s sake.\n\nBut in case that doesn\'t matter to you, in using our website, you agree to donate your spleen and any expensive vehicles you own to us. Also a year\'s worth of pudding per page you visited.'
  });
};

/* function for rendering 'FAQ' page, called by app_server/routes/index.js
go to app_server/views/FAQ.jade for actual html */
module.exports.faq = function(req, res) {
  res.render('faq', {
    title: 'Frequently Asked Questions Page',
    content: 'h2 What does this app do? p SeeItHere Theater helps you locate live theater productions you want to see, by letting you search by play title, by theater, and always by location. h2 How do I search? p There\'s a search bar in the top right corner for just such a purpose. Type in the name of a play or theater that you\'re interested in seeing and you\'ll get results specific to your location.'
   });
};
