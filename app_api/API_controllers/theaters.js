var mongoose = require('mongoose');
//grabs the schema for theater from models/schemas.js and puts it in this variable
var Theater = mongoose.model('Theater');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*gets list of theaters from database and sends to app_server/controller */
module.exports.listByDistance = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

//adds theater to database and sends confirmation to app_server/controller
module.exports.theatersCreate = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

//gets theater from database and sends to app_server/controller
module.exports.theatersReadOne = function(req, res) {
  if(req.params && req.params.theaterid) {
    Theater
      .findById(req.params.theaterid)
      .exec(function(err, theater) {
        if(!theater) {
          sendJsonResponse(res, 404, {"message" : "theater not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      sendJsonResponse(res, 200, theater);
    });
  } else {
    sendJsonResponse(res, 404, {
      "message" : "No theater in request"
    });
  }
};

/*makes changes to specific theater in database
and sends confirmation to app_server/controller*/
module.exports.theatersUpdateOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

//deletes theater from database and sends confirmation to app_server/controller
module.exports.theatersDeleteOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
