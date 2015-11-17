'use strict';

// Experiences controller
angular.module('experiences').controller('ExperiencesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media) {
    $scope.authentication = Authentication;

    // startup
    $scope.find = function () {
      findExperiences();
      findMedia();
    };

    //----------------
    // SORTING START
    //----------------

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
    //----------------
    // SORTING END
    //----------------

    //----------------
    // Dates START
    //----------------

    $scope.openStart = function($event) {
      $scope.status.openedStart = true;
      $scope.status.openedEnd = false;
    };

    $scope.openEnd = function($event) {
      $scope.status.openedStart = false;
      $scope.status.openedEnd = true;
    };

    $scope.datePickerOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.format = 'EEEE d MMMM yyyy';

    $scope.status = {
      openedStart: false,
      openedEnd: false
    };

    //----------------
    // Dates END
    //----------------

    //----------------
    // FILTERING START
    //----------------

    $scope.filter = {};

    $scope.$watch('filter', function() {
      findExperiences();
    }, true);

    function getFilterObjectForQuery() {
      var filterForQuery = {};
      if ($scope.filter.search) {
        filterForQuery.search = $scope.filter.search;
      }
      if ($scope.filter.media) {
        filterForQuery.media = $scope.filter.media;
      }
      if ($scope.filter.startDate) {
        filterForQuery.startDate = $scope.filter.startDate.getTime();
      }
      if ($scope.filter.endDate) {
        filterForQuery.endDate = $scope.filter.endDate.getTime();
      }
      return filterForQuery;
    }

    //----------------
    // FILTERING END
    //----------------

    //helper methods

    function findExperiences() {
      Experiences.query(getFilterObjectForQuery()).$promise.then(function(experiences) {
        $scope.experiences = experiences;
        if (!$scope.initialCount) {
          $scope.initialCount = experiences.length;
        }
      });
    }

    function findMedia() {
      Media.query().$promise.then(function(media) {
        $scope.media = media;
      });
    }
  }
]);
