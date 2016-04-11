/* function for rendering 'theater production' page, called by app_server/routes/index.js
go to app_server/views/play.jade for actual html */
module.exports.show = function(req, res) {
  res.render('play', {
    title: 'Specific Theater Production Page',
    pageHeader: {
      title: 'Josephy and His Amazing Technicolor Dreamcoat',
      strapline: 'Production Details and Ticket Info'
    },
    play: {
      theater: 'Theatre House',
      address: '125 Booker Road, Tahoca, 98504',
      rating: 3,
      description: 'Joseph is a chill dude, until his brothers pick on him. then he unleashes the fury of God on their butts because his holier-than-thou attitude actually is legit.',
      cast: ['Bobby McBobberson as Joseph', 'Joan Joansters as The Dreamcoat', 'Ruddy on the lights', 'Buddy on the Soundboard', 'Chad the Director'],
      poster: '../images/joseph.jpg',
      link: 'http://edmondsdriftwoodplayers.org/',
      prices: ['$10 for ages 15 and under', '$20 for adults', '$50 for old people'],
      dates: ['Feb. 14, 8:00 pm', 'Feb. 15, 2:30 pm', 'Feb. 26, 8:00 pm'],
      reviews: [{
        author: 'Louis Louise',
        rating: 5,
        timestamp: 'April 9 2016',
        text: 'Fabulous stuff. I very much like.',
      }, {
        author: 'Sir Lancelot',
        rating: 1,
        timestamp: 'April 1 2016',
        text: 'I wish I had remained dead so I wouldnt have seen this.',
      }]
    }
   });
};
