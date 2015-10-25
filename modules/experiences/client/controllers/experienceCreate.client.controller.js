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
        title: $scope.newExperience.title,
        date: $scope.newExperience.date,
        author: $scope.newExperience.author,
        description: $scope.newExperience.description,
        review: $scope.newExperience.review,
        rating: $scope.newExperience.rating,
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

    //DATE methods section start
    $scope.today = function() {
      $scope.newExperience.date = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.newExperience.date = null;
    };

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.newExperience.date = new Date(year, month, day);
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.format = 'dd/MM/yyyy';

    $scope.status = {
      opened: false
    };
     //DATE methods section end
   }

]);
