'use strict';

// Experience controller
angular.module('experiences').controller('ExperienceViewController', ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media', '$modal',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media, $modal) {
    $scope.authentication = Authentication;

     $scope.hasLngLat = function(location) {
        if (location && location.lng && location.lng !== null && location.lat && location.lat !== null) {
            return true;
        }
        return false;
    };

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

    $scope.openMap = function () {

        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'modules/locations/client/views/locationMap.client.view.html',
          controller: 'LocationMapController',
          size: 'lg',
          resolve: {
            editable: false,
            location: $scope.experience.location
          }
        });
      };

    // Find existing Experience
    $scope.findOne = function () {
      Experiences.get({
        experienceId: $stateParams.experienceId
      }).$promise.then(function(result) {
        $scope.experience = result;
        $scope.canEdit = ($scope.authentication.user._id == result.user._id);
      });
    };
  }
]);
