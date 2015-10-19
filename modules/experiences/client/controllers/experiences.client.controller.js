'use strict';

// Experiences controller
angular.module('experiences').controller('ExperiencesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media) {
    $scope.authentication = Authentication;

    // find all media
    $scope.media = Media.query();

    // CREATE SECTION START

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

    // CREATE SECTION END

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

    //UPDATE SECTION START

    $scope.addSpecEdit = function() {
          if ($scope.newSpecTemp) {
           $scope.experience.specifications.push($scope.newSpecTemp);
           $scope.newSpecTemp = '';
          }
         };

        $scope.removeSpecEdit = function(index) {
           $scope.experience.specifications.splice(index, 1);
         };

    // Update existing Experience
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'experienceForm');

        return false;
      }

      var experience = $scope.experience;

      experience.$update(function () {
        $location.path('experiences/' + experience._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    //UPDATE SECTION END

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
