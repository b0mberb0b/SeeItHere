var mongoose = require('mongoose');
//grabs the schema for theater from models/schemas.js and puts it in this variable
var Theater = mongoose.model('Theater');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//adds any restrictions to results that are requested by user
var buildWithRestrictions = function(req, res, results, stats) {
  var theaters = [];
  results.forEach(function(doc) {
    theaters.push({
    distance: doc.dis/1000, //give dist in km rather than meters
    name: doc.obj.name,
    address: doc.obj.address,
    _id: doc.obj._id,
    });
  });
  return theaters;
};

/*gets list of theaters from database and sends to app_server/controller */
module.exports.listByDistance = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var dist;
  if (req.query.dist){ //if changing distance limit from location, set it
    dist = parseFloat(req.query.dist) * 1000; //takes params in km
  } else {
    dist = 20000; //otherwise default 20 km
  }
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    maxDistance: dist,
    num: 100
  };
  if ((!lng && lng!==0) || (!lat && lat!==0)){
    sendJsonResponse(res, 404, {
      "message": "lng and lat query parameters are required"
    });
    return;
  }
  Theater.geoNear(point, geoOptions, function(err, results, stats){
    var theaters = [];
    if (err){
      sendJsonResponse(res, 404, err);
    } else {
      theaters = buildWithRestrictions(req, res, results, stats);
      sendJsonResponse(res, 200, theaters);
    }
  });
};

//gets theater from database and sends to app_server/controller
module.exports.theatersReadOne = function(req, res) {
  if(req.params && req.params.theaterURL) {
    Theater
      .findOne({ URL: req.params.theaterURL })
      .exec(function(err, theater) {
        if(!theater) {
          sendJsonResponse(res, 404, {"message" : "theater not found"}
        );
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

//adds theater to database and sends confirmation to app_server/controller
module.exports.theatersCreate = function(req, res) {
  Theater.create({
    name: req.body.name,
    URL: req.body.URL,
    address: req.body.address,
    website: req.body.website,
    admin: req.body.admin,
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    description: req.body.description
    }, function(err, theater) {
      if(err) {
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 201, theater);
    }
  });
};

/*makes changes to specific theater in database
and sends confirmation to app_server/controller*/
module.exports.theatersUpdateOne = function(req, res) {
  if(!req.params.theaterURL) {
    sendJsonResponse(res, 404, {"message": "Not found, theater is required"});
    return;
  }
  Theater
    .findOne({ 'URL': req.params.theaterURL })
    .select('-playids -rating')
    .exec(
      function(err, theater) {
        if(!theater) {
          sendJsonResponse(res, 404, {"message": "theaterURL not found"});
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if(req.body.name) {theater.name = req.body.name;}
        //TO DO: if theater changes name, must change URL, must change plays theaterURLs
        //update playids when a play is added or deleted
        if(req.body.address) {theater.address = req.body.address;}
        if(req.body.URL) {theater.URL = req.body.URL;}
        if(req.body.description) {theater.description = req.body.description;}
        if(req.body.website) {theater.website = req.body.website;}
        if(req.body.admin) {theater.admin = req.body.admin;}
        if(req.body.lng && req.body.lat) {
          theater.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        }
        theater.save(function(err, theater) {
          if(err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, theater);
          }
        });
      }
    );
};

//deletes theater from database and sends confirmation to app_server/controller
module.exports.theatersDeleteOne = function(req, res) {
  if(req.params.theaterURL) {
    Theater
      .findOneAndRemove({ 'URL': req.params.theaterURL })
      .exec(
        function(err, theater) {
          if(err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 204, null);
        }
      );
  } else {
    sendJsonResponse(res, 404, {"message": "No theaterURL"});
  }
};
