'use strict';

// Experience controller
angular.module('experiences').controller('ExperienceViewController', ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media) {
    $scope.authentication = Authentication;

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

    // Remove existing Experience
    $scope.remove = function (experience) {
      if (experience) {
        experience.$remove();

        for (var i in $scope.experiences) {
          if ($scope.experiences[i] === experience) {
            $scope.experiences.splice(i, 1);
          }
        }
      } else {
        $scope.experience.$remove(function () {
          $location.path('experiences');
        });
      }
    };

    // Find existing Experience
    $scope.findOne = function () {
      Experiences.get({
        experienceId: $stateParams.experienceId
      }).$promise.then(function(result) {
        $scope.experience = result;
        if (result.location) {
          updateMapCenter(result.location);
          updateMarkerPosition(result.location);
        }
      });
    };
  }
]);
