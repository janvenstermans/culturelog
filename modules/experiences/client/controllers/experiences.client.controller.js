'use strict';

// Experiences controller
angular.module('experiences').controller('ExperiencesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media) {
    $scope.authentication = Authentication;

    // Find a list of Experiences
    $scope.find = function () {
      $scope.experiences = Experiences.query();
    };

    // sorting
    $scope.sort = {
        sortingKey : 'date',
        reverse : true
    };

    $scope.sortBy = function(key) {
      if ($scope.sort.sortingKey != key) {
        $scope.sort.sortingKey = key;
        $scope.sort.reverse = false;
      } else {
        $scope.sort.reverse = !$scope.sort.reverse;
      }
    };

    $scope.gap = 5;

    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
  }
]);
