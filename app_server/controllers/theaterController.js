/* function for rendering 'theater' page, called by app_server/routes/index.js
go to app_server/views/theater.jade for actual html */
module.exports.show = function(req, res) {
  res.render('theater', {
    title: 'Specific Theater Main Page',
    pageHeader: {
      title: 'Theatre House',
      strapline: 'Check Out Their Productions'
    },
    theater: {
      address: '125 Booker Road, Tahoca, BA, 98504',
      description: 'A lovely little theater, nestled in the Nordic-ruled village of Tahoca, Bashington. Come see quaint little plays and plenty of spiky breast plated women singing operas.',
      rating: 1,
      coordinates: {lat: 51.455041, lng: -0.9690884},
      productions: ['Joseph and His Amazing Technicolor Dreamcoat', 'Pippin', 'A Streetcar Named Desire', 'One Flew Over the Cuckoos Nest'],
      website: 'http://edmondsdriftwoodplayers.org/',
      plays: [{
        name: 'Joseph and The Amazing Technicolored Dreamcoat',
        poster: '../images/joseph.jpg'
      }, {
        name: 'Annie Get Your Gun',
        poster: '../images/annie.jpg'
      }, {
        name: 'Waiting for Godot',
        poster: '../images/godot.jpg'
      }],
      reviews: [{
        author: 'Louis Louise',
        rating: 1,
        timestamp: 'April 8 2016',
        text: 'I was not amused, everything sucked so badly.',
      }, {
        author: 'Agent Smith',
        rating: 2,
        timestamp: 'April 5 2016',
        text: 'If it were not for the delicious swedish meatballs, I might have left',
      }]
    }
  });
};
