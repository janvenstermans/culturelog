'use strict';

// Experience Create controller
angular.module('experiences').controller('ExperienceCreateController', ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media) {

    $scope.authentication = Authentication;

    // find all media
    $scope.media = Media.query();

    $scope.newExperience = {};

    // Create new Experience
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'experienceForm');

        return false;
      }

      // Create new Experience object
      var experience = new Experiences({
        medium: $scope.newExperience.medium,
        title: $scope.newExperience.title
      });

      // Redirect after save
      experience.$save(function (response) {
        $location.path('experiences/' + response._id);

        // Clear form fields
        $scope.newExperience = {};
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

   }

]);
