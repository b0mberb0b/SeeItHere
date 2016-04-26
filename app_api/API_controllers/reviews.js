var mongoose = require('mongoose');
//grabs the schema for theater from models/schemas.js and puts it in this variable
var Play = mongoose.model('Play');
var Theater = mongoose.model('Theater');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* Calculates the play rating based on review average */
var updateAverageRating = function(playid) {
  Play
    .findById(playid)
    .select('rating reviews')
    .exec(
      function(err, play) {
        if(!err) {
          doSetAverageRating(play);
        }
      });
};

/* Helper method for calculating play rating */
var doSetAverageRating = function(play) {
  var i, reviewCount, ratingAverage, ratingTotal;
  if(play.reviews && play.reviews.length > 0) {
    reviewCount = play.reviews.length;
    ratingTotal = 0;
    for(i = 0; i < reviewCount; i++) {
      ratingTotal += play.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    play.rating = ratingAverage;
    play.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("Average rating updated to" + ratingAverage);
      }
    });
  }
};

/* A helper method to create a review */
var doAddReview = function(req, res, play) {
  if(!play) {
    sendJsonResponse(res, 404, {"message": "play not found"});
  } else {
    play.reviews.push({
      author: req.body.author,
      text: req.body.text,
      rating: req.body.rating
    });
    play.save(function(err, play) {
      var thisReview;
      if(err) {
        sendJsonResponse(res, 400, err);
      } else {
        updateAverageRating(play._id);
        //updateTheaterPlaylist(req.params.theaterURL, req.body.URL);
        thisReview = play.reviews[play.reviews.length - 1];
        sendJsonResponse(res, 201, thisReview);
      }
    });
  }
};

/* adds review from specific theater to database
and sends confirmation to app_server/controller */
module.exports.reviewsCreate = function(req, res) {
  if(req.params.theaterURL && req.params.playURL) {
    Play
      .findOne({ 'URL': req.params.playURL }).where('theaterURL', req.params.theaterURL)
      .select('reviews')
      .exec(
        function(err, play) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            doAddReview(req, res, play);
          }
        }
      );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, production required"}
    );
  }
};

/* gets review by specific theater from database
and sends to app_server/controller */
module.exports.reviewsReadOne = function(req, res) {
  if(req.params && req.params.theaterURL && req.params.playURL && req.params.reviewid) {
    Play
      .findOne({ 'URL': req.params.playURL }).where('theaterURL', req.params.theaterURL)
      .select('name reviews')
      .exec(function(err, play) {
        var response, review;
        if(!play) {
          sendJsonResponse(res, 404, {"message" : "play not found"}
        );
        return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        if(play.reviews && play.reviews.length > 0) {
          review = play.reviews.id(req.params.reviewid);
          if(!review) {
            sendJsonResponse(res, 404, {"message": "review not found"}
            );
          } else {
            response = {
              play: {
                name: play.name,
                URL: req.params.playURL
              },
              review: review
            };
            sendJsonResponse(res, 200, response);
          }
        } else {
          sendJsonResponse(res, 404, {"message": "No reviews found"}
          );
        }
      }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, theater, play, and review all required"
    });
  }
};

/* makes changes to specific review in database
and sends confirmation to app_server/controller */
module.exports.reviewsUpdateOne = function(req, res) {
  if(!req.params.theaterURL && !req.params.playURL && !req.params.reviewid) {
    sendJsonResponse(res, 404, {"message": "Not found, theater, play, and reviewid all required"});
    return;
  }
  Play
    .findOne({ 'URL': req.params.playURL}).where('theaterURL', req.params.theaterURL)
    .select('reviews')
    .exec(
      function(err, play) {
        var thisReview;
        if(!play) {
          sendJsonResponse(res, 404, {"message": "play not found"});
          return;
        } else if(err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if(play.reviews && play.reviews.length > 0) {
          thisReview = play.reviews.id(req.params.reviewid);
          if(!thisReview) {
            sendJsonResponse(res, 404, {"message": "reviewid not found"});
          } else {
            if(req.body.author) {thisReview.author = req.body.author;}
            if(req.body.rating) {thisReview.rating = req.body.rating;}
            if(req.body.text) {thisReview.text = req.body.text;}
            play.save(function(err, play) {
              if(err) {
                sendJsonResponse(res, 404, err);
              } else {
                updateAverageRating(play._id);
                sendJsonResponse(res, 200, thisReview);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {"message": "No review to update"});
        }
      }
  );
};

/*deletes review by specific theater from database
and sends confirmation to app_server/controller */
module.exports.reviewsDeleteOne = function(req, res) {
  if(!req.params.theaterURL && !req.params.playURL && !req.params.reviewid) {
    sendJsonResponse(res, 404, {"message": "Not found, theaterURL, playURL, and reviewid all required"});
    return;
  }
  Play
    .findOne({ 'URL': req.params.playURL}).where('theaterURL', req.params.theaterURL)
    .select('reviews')
    .exec(
      function(err, play) {
        if(!play) {
          sendJsonResponse(res, 404, {"message": "play not found"});
          return;
        } else if(err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if(play.reviews && play.reviews.length > 0) {
          if(!play.reviews.id(req.params.reviewid)) {
            sendJsonResponse(res, 404, {"message": "reviewid not found"});
          } else {
            play.reviews.id(req.params.reviewid).remove();
            play.save(function(err) {
              if(err) {
                sendJsonResponse(res, 404, err);
              } else {
                updateAverageRating(play._id);
                sendJsonResponse(res, 204, null);
              }
            });
          }
        } else {
          sendJsonResponse(res, 404, {"message": "no review to delete"});
        }
      }
  );
};
