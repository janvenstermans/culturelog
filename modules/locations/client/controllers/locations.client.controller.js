'use strict';

// Controller for viewing info of Locations and single Location
angular.module('locations').controller('LocationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Locations', 'Geocoder',
  function ($scope, $stateParams, $location, Authentication, Locations, Geocoder) {
    $scope.authentication = Authentication;

    var isAdmin = $scope.authentication.user.roles.indexOf('admin') > -1;
    var isUser = $scope.authentication.user.roles.indexOf('user') > -1;

    $scope.onlyGeneral = isAdmin;

    // MAP SECTION START

    $scope.defaults = {
        scrollWheelZoom: false
    };

    // map center
    $scope.center = {};

    // one marker only
    $scope.markers = {
        marker : {
            lat: 0,
            lng: 0,
            focus: true,
            draggable: false
        }
    };

    $scope.hasLngLat = function(location) {
        if (location && location.lng && location.lng !== null && location.lat && location.lat !== null) {
            return true;
        }
        return false;
    };

    function updateMapCenter(location) {
      $scope.center = {
        lat: location.lat,
        lng: location.lng,
        zoom: 15
      };
    }

    function updateMarkerPosition(location) {
      $scope.markers.marker.lat = location.lat;
      $scope.markers.marker.lng = location.lng;
    }

    // MAP SECTION END

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

    // Find a list of Locations
    $scope.find = function () {
      $scope.locations = Locations.query();
    };

    // Find existing Location
    $scope.findOne = function () {
      Locations.get({
        locationId: $stateParams.locationId
      }).$promise.then(function(result) {
        $scope.location = result;
        $scope.isGeneral = isGeneral($scope.location);
        $scope.canEdit = canEdit($scope.location);
        updateMapCenter(result);
        updateMarkerPosition(result);
      });
    };

    function isGeneral(location) {
      if (location.user) {
        return false;
      }
      return true;
    }

    function canEdit(location) {
      if (isGeneral(location)) {
        return isAdmin;
      }
      return isUser;
    }
  }
]);
