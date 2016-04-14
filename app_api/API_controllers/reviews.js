var mongoose = require('mongoose');
//grabs the schema for theater from models/schemas.js and puts it in this variable
var Theater = mongoose.model('Theater');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* adds review from specific theater to database
and sends confirmation to app_server/controller */
module.exports.reviewsCreate = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

/* gets review by specific theater from database 
and sends to app_server/controller */
module.exports.reviewsReadOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

/* makes changes to specific review in database
and sends confirmation to app_server/controller */
module.exports.reviewsUpdateOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};

/*deletes review by specific theater from database
and sends confirmation to app_server/controller */
module.exports.reviewsDeleteOne = function(req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
