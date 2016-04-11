/* function for rendering 'results' page, called by app_server/routes/index.js
go to app_server/views/results.jade for actual html */
module.exports.show = function(req, res) {
  res.render('results', {
    title: 'SeeItHere Search Results',
    pageHeader: {
      title: 'Search Results',
      strapline: 'Productions by You Matching Your Search'
    },
    locations: [{
      name: 'Theatre House',
      address: '125 Booker Road, Tahoca, 98504',
      distance: '100m',
      showTimes: ['May 15th, May 28th, Aug. 20th']
    }, {
      name: 'Flaming Theater',
      address: '666 Devils Lane, Hell, 52680',
      distance: '99999m',
      showTimes: ['For Eternity']
    }, {
      name: 'Another Theater',
      address: '1000 Default Drive, Standard, 11001',
      distance: '1m',
      showTimes: ['January 1st', 'February 1st', 'March 1st', 'April 1st']
    }]
  });
};
