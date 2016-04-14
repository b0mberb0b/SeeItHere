/* function for rendering 'new review' page, called by app_server/routes/index.js
go to app_server/views/review.jade for html structure */
module.exports.show = function(req, res) {
  res.render('review', {
    title: 'Write New Review Page',
    pageHeader: {title: 'Write a Review'},
    dates: ['May 8th, 8:00 pm', 'May 9th, 2:30 pm', 'June 1st, 8:00 pm']
  });
};
