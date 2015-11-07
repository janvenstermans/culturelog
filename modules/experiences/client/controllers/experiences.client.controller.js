'use strict';

// Experiences controller
angular.module('experiences').controller('ExperiencesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media) {
    $scope.authentication = Authentication;

    // Find a list of Experiences
    $scope.find = function () {
      $scope.experiences = Experiences.query();
    };
  }
]);
