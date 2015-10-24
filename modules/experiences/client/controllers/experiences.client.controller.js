'use strict';

// Experiences controller
angular.module('experiences').controller('ExperiencesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media) {
    $scope.authentication = Authentication;

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

    // Find a list of Experiences
    $scope.find = function () {
      $scope.experiences = Experiences.query();
    };

    // Find existing Experience
    $scope.findOne = function () {
      $scope.experience = Experiences.get({
        experienceId: $stateParams.experienceId
      });
    };
  }
]);
