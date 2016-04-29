var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://afternoon-taiga-87750.herokuapp.com/";
}

var _showError = function(req, res, status) {
  var title, content;
  if(status === 404) {
    title = "404, page not found";
    content = "Oh dear! Looks like we can't find this page. Sorry!";
  } else {
    title = status + ", something's gone wrong";
    content: "We don't have answers but people will be fired for this";
  }
  res.status(status);
  res.render('error', {
    title : title,
    content : content
  });
};

/* function for rendering 'theater' page, called by app_server/routes/index.js
go to app_server/views/theater.jade for actual html */
module.exports.showTheater = function(req, res) {
  getTheaterInfo(req, res, function(req, res, theater, plays) {
    renderTheaterPage(req, res, theater, plays);
  });
};

/* Makes a request to the API theaterController.js for a particular theater's info */
var getTheaterInfo = function(req, res, callback) {
  var requestOptions, path;
  var theaterURL = "";
  var playURL = "";
  if(req.params && req.params.theaterURL) {theaterURL = req.params.theaterURL};
  if(req.params && req.params.playURL) {playURL = "/" + req.params.playURL};
  path = "/api/results/" + theaterURL + playURL;
  requestOptions = {
    url: apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var plays = body.plays;
      var theater = body.theater;
      if(response.statusCode === 200) {
        if(theater.cords) {
          theater.coords = {
            lng : body.theater.coords[0],
            lat : body.theater.coords[1]
          };
        };
        callback(req, res, theater, plays);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

//function that does the actual rendering of the theater page
var renderTheaterPage = function(req, res, theaterData, playData) {
  var message;
  if(!(playData instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if(!playData.length) {
      message = "Theater has no scheduled plays";
    }
  }
  res.render('theater', {
    title: theaterData.name,
    pageHeader: {
      title: theaterData.name,
      strapline: 'Check Out Their Productions'
    },
    theater: theaterData,
    plays: playData,
    message: message
  });
};

/* function for rendering 'theater production' page, called by app_server/routes/index.js
go to app_server/views/play.jade for actual html */
module.exports.showPlay = function(req, res) {
  getPlayInfo(req, res, function(req, res, theater, play) {
    renderPlayPage(req, res, theater, play);
  });
};

/* Makes a request to the API playController.js for a particular play's info */
var getPlayInfo = function(req, res, callback) {
  var requestOptions, path;
  path = "/api/results/" + req.params.theaterURL + "/" + req.params.playURL;
  requestOptions = {
    url: apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var theater = body.theater;
      var play = body.play;
      play.prettyDates = [];
      if(response.statusCode === 200) {
        if(play.dates.length) {
          for(i=0; i<play.dates.length; i++) {
            play.prettyDates.push(formatDatetoString(play.dates[i]));
          }
        }
        callback(req, res, theater, play);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

//function that does the actual rendering of the theater page
var renderPlayPage = function(req, res, theater, play) {
  res.render('play', {
    title: theater.name + "\'s " + play.name,
    pageHeader: {
      title: theater.name + "\'s " + play.name,
      strapline: 'Production Details and Ticket Info'
    },
    theater: theater,
    play: play
  });
};

/* function for rendering 'new review' page, called by app_server/routes/index.js
go to app_server/views/review.jade for html structure */
module.exports.makeReview = function(req, res) {
  getReviewInfo(req, res, function(req, res, theater, play) {
    renderReviewForm(req, res, theater, play);
  });
};

/* Makes a request to the API Review controller for info to make a review */
var getReviewInfo = function(req, res, callback) {
  var requestOptions, path;
  path = "/api/results/" + req.params.theaterURL + "/" + req.params.playURL + "/new-review";
  requestOptions = {
    url: apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var theater = body.theater;
      var play = body.play;
      play.prettyDates = [];
      if(response.statusCode === 200) {
        if(play.dates.length) {
          for(i=0; i<play.dates.length; i++) {
            play.prettyDates.push(formatDatetoString(play.dates[i]));
          }
        }
        callback(req, res, theater, play);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};


//function that does the actual rendering of the theater page
var renderReviewForm = function(req, res, theater, play) {
  res.render('review', {
    title: play.name + " review",
    pageHeader: {
      title: "New Review",
      strapline: "Write a Review of " + theater.name + "\'s production of " + play.name
    },
    theater: theater,
    play: play,
    error: req.query.err
  });
};

module.exports.addReview = function(req, res) {
  var requestOptions, path, theaterURL, playURL, postdata;
  theaterURL = req.params.theaterURL;
  playURL = req.params.playURL;
  path = '/api/results/' + theaterURL + '/' + playURL + '/new-review';
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    playDate: req.body.date,
    text: req.body.review
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if(!postdata.author || !postdata.rating || !postdata.text || !postdata.playDate) {
    res.redirect('/results/' + theaterURL + '/' + playURL + '/new-review?err=val');
  } else {
    request(
      requestOptions,
      function (err, response, body) {
        if(response.statusCode === 201) {
          res.redirect('/results/' + theaterURL + '/' + playURL)
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
          res.redirect('/results/' + theaterURL + '/' + playURL + '/new-review?err=val')
        } else {
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};

//makes legible date and times from javascript Date object
var formatDatetoString = function(date) {
  var date = new Date(date);
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var min = date.getMinutes();
  min = min < 10 ? "0"+min : min;
  var h = date.getHours();
  var ampm = h >= 12 ? " pm" : " am";
  h = h % 12;
  h = h ? h : 12;
  var d = date.getDate();
  var m = monthNames[date.getMonth()];
  var formattedDate = m + " " + d + " at " + h + ":" + min + ampm;
  return formattedDate
};
