var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://afternoon-taiga-87750.herokuapp.com/";
}

//function that does the actual rendering of the results page
var renderResults = function(req, res, responseBody) {
  var message;
  if(!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if(!responseBody.length) {
      message = "No theaters found within that distance";
    }
  }
  res.render('results', {
    title: 'SeeItHere Search Results',
    pageHeader: {
      title: 'Search Results',
      strapline: 'Productions Near You Matching Your Search'
    },
    theaters: responseBody,
    message: message
  });
};

//helper method that checks if the input variable is really a number
var _isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//turns the distance input into a far more readable measure
var _formatDistance = function(distance) {
  var numDistance, unit;
  if(distance && _isNumeric(distance)) {
    if(distance > 1) {
      numDistance = parseFloat(distance).toFixed(1);
      unit = ' km';
    } else {
      numDistance = parseInt(distance*100,10);
      unit = ' m';
    }
    return numDistance + unit;
  } else {
    return "?";
  }
};

/* function for rendering 'results' page, called by app_server/routes/index.js
go to app_server/views/results.jade for actual html */
module.exports.listResults = function(req, res) {
  console.log("hi!");
  var requestOptions, path;
  path = '/api/results';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {
      lng : -0.7992599,
      lat : 51.378091,
      dist : 20
    }
  };
  request(
    requestOptions,
    function(err, response, body) {
      var i, data;
      data = body;
      if(response.statusCode === 200 && data.length) {
        for(i=0; i<data.length; i++) {
          data[i].distance = _formatDistance(data[i].distance);
        }
      }
      renderResults(req, res, data);
    }
  );
};
