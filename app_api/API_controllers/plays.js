var mongoose = require('mongoose');
//grabs the schema for theater from models/schemas.js and puts it in this variable
var Play = mongoose.model('Play');
var Theater = mongoose.model('Theater');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*gets list of plays by specific theater from database
and sends to app_server/controller */
module.exports.listByDate = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

/*adds play to database and sends confirmation to app_server/controller */
module.exports.playsCreate = function(req, res) {
  Play.create({
    name: req.body.name,
    URL: req.body.URL,
    theaterURL: req.params.theaterURL,
    description: req.body.description,
    poster: req.body.poster,
    ticketWebsite: req.body.ticketWebsite,
    cast: req.body.cast.split(","),
    prices: req.body.prices.split(",")
    }, function(err, play) {
      if(err) {
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 201, play);
      }
  });
};

/* gets play by specific theater from database
and sends to app_server/controller */
module.exports.playsReadOne = function(req, res) {
  if(req.params && req.params.theaterURL && req.params.playURL) {
    Play
      .findOne({ 'URL': req.params.playURL }).where('theaterURL', req.params.theaterURL)
      .exec(function(err, play) {
        console.log(play);
        if(!play) {
          sendJsonResponse(res, 404, {"message" : "play not found"}
        );
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      sendJsonResponse(res, 200, play);
    });
  } else {
    sendJsonResponse(res, 404, {
      "message" : "both theater and play needed in request"
    });
  }
};

/* makes changes to play by specific theater in database
and sends confirmation to app_server/controller */
module.exports.playsUpdateOne = function(req, res) {
  if(!req.params.theaterURL && !req.params.playURL) {
    sendJsonResponse(res, 404, {"message": "Not found, theater and playURL required"});
    return;
  }
  Play
    .findOne({ 'URL': req.params.playURL}).where('theaterURL', req.params.theaterURL)
    .select('-reviews -rating')
    .exec(
      function(err, play) {
        if(!play) {
          sendJsonResponse(res, 404, {"message": "play not found"});
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if(req.body.name) {play.name = req.body.name;}
        if(req.body.theaterURL) {play.theaterURL = req.body.theaterURL;}
        if(req.body.URL) {play.URL = req.body.URL;}
        if(req.body.description) {play.description = req.body.description;}
        if(req.body.ticketWebsite) {play.ticketWebsite = req.body.ticketWebsite;}
        if(req.body.poster) {play.poster = req.body.poster;}
        if(req.body.cast) {play.cast = req.body.cast.split(",");}
        if(req.body.prices) {play.prices = req.body.prices.split(",");}
        play.save(function(err, play) {
          if(err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, play);
          }
        });
      }
    );
};

/* deletes play in database and sends confirmation to app_server/controller */
module.exports.playsDeleteOne = function(req, res) {
  if(req.params.theaterURL && req.params.playURL) {
    Play
      .findOneAndRemove({ 'URL': req.params.playURL }).where('theaterURL', req.params.theaterURL)
      .exec(
        function(err, play) {
          if(err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 204, null);
        }
      );
  } else {
    sendJsonResponse(res, 404, {"message": "No theaterURL or playURL"});
  }
};
