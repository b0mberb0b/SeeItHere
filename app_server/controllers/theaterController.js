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
      }]
    }
  });
};
