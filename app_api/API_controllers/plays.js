var mongoose = require('mongoose');
//grabs the schema for theater from models/schemas.js and puts it in this variable
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
  sendJsonResponse(res, 200, {"status" : "success"});
};

/* gets play by specific theater from database
and sends to app_server/controller */
module.exports.playsReadOne = function(req, res) {
  if(req.params && req.params.theaterid && req.params.playid) {
    Theater
      .findById(req.params.theaterid)
      .select('name plays')
      .exec(function(err, theater) {
        var response, play;
        if(!theater) {
          sendJsonResponse(res, 404, {"message" : "theater not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      if (theater.plays && theater.plays.length > 0) {
        play = theater.plays.id(req.params.playid);
        if(!play) {
          sendJsonResponse(res, 404, {
            "message" : "play not found"
          });
        } else {
          response = {
            theater : {
              name : theater.name,
              id : req.params.theaterid
            },
            play : play
          };
          sendJsonResponse(res, 200, response);
        }
      } else {
        sendJsonResponse(res, 404, {
          "message" : "No plays found"
        });
      }
    }
  );
  } else {
    sendJsonResponse(res, 404, {
      "message" : "Not found, theater and play are both required"
    });
  }
};

/* makes changes to play by specific theater in database
and sends confirmation to app_server/controller */
module.exports.playsUpdateOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

/* deletes play in database and sends confirmation to app_server/controller */
module.exports.playsDeleteOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
