'use strict';

// Locations controller
angular.module('locations').controller('LocationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Locations', 'Geocoder',
  function ($scope, $stateParams, $location, Authentication, Locations, Geocoder) {
    $scope.authentication = Authentication;

    // GEOCODING

    $scope.updateLocationInfo = function(location) {
       if (location.description && location.description !== null) {
          Geocoder.findSingleLocation(location.description).then(function(result){
              location.lng = result.lng;
              location.lat = result.lat;
          });
       }
    };

    $scope.hasLngLat = function(location) {
        if (location.lng && location.lng !== null && location.lat && location.lat !== null) {
            return true;
        }
        return false;
    };

    // CREATE SECTION START

    $scope.newLocation = {};

    // Create new Location
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'locationForm');

        return false;
      }

      // Create new Location object
      var location = new Locations({
        description: $scope.newLocation.description,
        lat: $scope.newLocation.lat,
        lng: $scope.newLocation.lng,
      });

      // Redirect after save
      location.$save(function (response) {
        $location.path('locations/' + response._id);

        // Clear form fields
        $scope.newLocation = {};
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // CREATE SECTION END

    // Remove existing Location
    $scope.remove = function (location) {
      if (location) {
        location.$remove(function(deleted) {
          for (var i in $scope.locations) {
            if ($scope.locations[i]._id == deleted._id) {
              $scope.locations.splice(i, 1);
            }
          }
        }, function() {
          alert("Cannot remove location");
        });
      } else {
        $scope.location.$remove(function () {
          $location.path('locations');
        });
      }
    };

    //UPDATE SECTION START

    // Update existing Location
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'locationForm');

        return false;
      }

      var location = $scope.location;

      location.$update(function () {
        $location.path('locations/' + location._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    //UPDATE SECTION END

    // Find a list of Locations
    $scope.find = function () {
      $scope.locations = Locations.query();
    };

    // Find existing Location
    $scope.findOne = function () {
      $scope.location = Locations.get({
        locationId: $stateParams.locationId
      });
    };
  }
]);
