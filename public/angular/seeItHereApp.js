angular.module('seeItHereApp', []);

var _isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//turns the distance input into a far more readable measure
var formatDistance = function() {
  return function (distance) {
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
};

/* Calls services to get user's location (geolocation) to get data
(resultsData) and add it to scope, which is sent to jade and rendered */
var resultsController = function ($scope, resultsData, geolocation) {
  $scope.message = "Checking your location";

  $scope.getData = function (position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude;
    $scope.message = "Searching for theaters near you!";
    resultsData.locationByCoords(lat, lng)
      .success(function(data) {
        $scope.message = data.length > 0 ? "" : "No theaters within 20 km!";
        $scope.data = { theaters: data };
      })
      .error(function (e) {
        $scope.message = "Sorry, something's gone wrong!";
      });
  };

  $scope.showError = function (error) {
    $scope.$apply(function() {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function () {
    $scope.$apply(function() {
      $scope.message = "Geolocation is not supported by this browser.";
    });
  };

  geolocation.getPosition($scope.getData,$scope.showError,$scope.noGeo);
};

/* Adds correct rating to the scope */
var ratingStars = function () {
  return {
    scope: {
      thisRating : '=rating'
    },
    templateUrl: '/angular/rating-stars.html'
  };
};

/* Makes request to our resultsController API to send back theater data */
var resultsData = function ($http) {
  var locationByCoords = function (lat, lng) {
    return $http.get('/api/results?lng=' + lng + '&lat=' + lat);
  };
  return {
    locationByCoords : locationByCoords
  };
};

/* Uses HTML 5's geolocation API to get the user's location */
var geolocation = function () {
  var getPosition = function(cbSuccess, cbError, cbNoGeo) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    }
    else {
      cbNoGeo();
    }
  };
  return {
    getPosition : getPosition
  };
};

angular
  .module('seeItHereApp')
  .controller('resultsController', resultsController)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('resultsData', resultsData)
  .service('geolocation', geolocation);
