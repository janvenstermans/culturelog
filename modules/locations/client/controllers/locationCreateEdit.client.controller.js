'use strict';

// Controller for creating or editing a Location object
angular.module('locations').controller('LocationCreateEditController', ['$scope', '$stateParams', '$location', 'Authentication', 'Locations', 'Geocoder',
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
            draggable: true
        }
    };

    $scope.events = {
       markers:{
         enable: [ 'dragend' ]
       }
    };

    $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
        $scope.location.lat = args.model.lat;
        $scope.location.lng = args.model.lng;
    });

    $scope.updateLocationInfo = function(location) {
       if (location.address && location.address !== null) {
          Geocoder.findSingleLocation(location.address).then(function(result){
              location.lng = result.lng;
              location.lat = result.lat;
              updateMapCenter(location);
              updateMarkerPosition(location);
          });
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

    // CREATE SECTION START

    // Create new Location
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'locationForm');

        return false;
      }

      // Create new Location object
      var location = new Locations({
        description: $scope.location.description,
        address: $scope.location.address,
        lat: $scope.location.lat,
        lng: $scope.location.lng,
      });

      // Redirect after save
      location.$save(function (response) {
        $location.path('locations/' + response._id);

        // Clear form fields
        $scope.initCreate();
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // CREATE SECTION END

    // UPDATE SECTION START

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

    // Find existing Location
    $scope.findOne = function () {
     Locations.get({
        locationId: $stateParams.locationId
      }).$promise.then(function(result) {
        $scope.location = result;
        updateMapCenter(result);
        updateMarkerPosition(result);
      });
    };

    // Setup create location
    $scope.initCreate = function () {
      $scope.location = {};
    };
  }
]);
