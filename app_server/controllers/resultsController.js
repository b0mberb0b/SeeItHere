var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://afternoon-taiga-87750.herokuapp.com";
}

//function that does the actual rendering of the results page
var renderResults = function(req, res) {
  res.render('results', {
    title: 'SeeItHere',
    pageHeader: {
      title: 'SeeItHere',
      strapline: 'Stuf stuf stuf'
    },
  })
}

/* function for rendering 'results' page, called by app_server/routes/index.js
go to app_server/views/results.jade for actual html */
module.exports.listResults = function(req, res) {
  renderResults(req, res);
};
