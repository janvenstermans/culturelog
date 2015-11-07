'use strict';

// Controller for viewing info of a location on the map
angular.module('locations').controller('LocationMapController', ['$scope', 'Authentication', 'Locations', 'editable', 'location',
  function ($scope, Authentication, Locations, editable, location) {
    $scope.authentication = Authentication;

    if (!location) {
      //TODO: prevent from going on
    }

    //MAP PARAMETERS

    $scope.defaults = {
          scrollWheelZoom: true
      };

    // map center
    $scope.center = {};

    // one marker only
    $scope.markers = {
        marker : {
            lat: 0,
            lng: 0,
            focus: true,
            draggable: editable
        }
    };

    // apply input location

    updateMapCenter(location);
    updateMarkerPosition(location);

    // helper functions

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

  }
]);
