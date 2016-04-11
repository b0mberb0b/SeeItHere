/* function for rendering 'new review' page, called by app_server/routes/index.js
go to app_server/views/review.jade for html structure */
module.exports.show = function(req, res) {
  res.render('review', {
    title: 'Write New Review Page',
    pageHeader: {title: 'Write a Review'},
    plays: [{
      name: 'Joseph and the Amazing Technicolor Dreamcoat',
      dates: ['May 8th, 8:00 pm', 'May 9th, 2:30 pm', 'June 1st, 8:00 pm']
    }, {
      name: 'Annie Get Your Gun',
      dates: ['August 8th, 8:00 pm', 'August 9th, 2:30 pm', 'Sept. 1st, 8:00 pm']
    }, {
      name: 'Waiting for Godot',
      dates: ['Dec. 8th, 8:00 pm', 'Dec. 9th, 2:30 pm', 'January 1st, 8:00 pm']
    }]
  });
};
