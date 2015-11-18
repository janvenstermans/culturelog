'use strict';

// Experiences controller
angular.module('experiences').controller('ExperiencesController', ['$scope', '$stateParams', '$location',
'Authentication', 'Experiences', 'Media', 'leafletBoundsHelpers', 'leafletData',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media, leafletBoundsHelpers, leafletData) {
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

    //----------------
    // MAP START
    //----------------

    $scope.defaults = {
        scrollWheelZoom: true
    };

    // map center
    $scope.center = {};
//    $scope.bounds = {};

   /* var boundsInitial = leafletBoundsHelpers.createBoundsFromArray([
                [ 51.050064, 3.7239233 ],
                [ 51.0503842, 3.7302893 ]
            ]);

            angular.extend($scope, {
                bounds: boundsInitial,
                center: {}
            });*/

    // one marker only
    $scope.markers = {};

    // helper functions

    function updateMap() {
      var markers = [];
      var bounds;
      for (var i = 0; i < $scope.experiences.length; i++) {
        var experience = $scope.experiences[i];
        if (experience.location && experience.location.lat && experience.location.lng) {
          var lat = experience.location.lat;
          var lng = experience.location.lng;
          markers.push({ lat: lat, lng: lng, draggable: false});
          if (!bounds) {
            bounds = [[lat, lng],[lat, lng]];
          } else {
            if (lat < bounds[0][0]) {
              bounds[0][0] = lat;
            }
            if (lng < bounds[0][1]) {
              bounds[0][1] = lng;
            }
            if (lat > bounds[1][0]) {
              bounds[1][0] = lat;
            }
            if (lng > bounds[1][1]) {
              bounds[1][1] = lng;
            }
          }
        }
      }
      if (markers.length > 0) {
         var boundsTemp = leafletBoundsHelpers.createBoundsFromArray(bounds);
        /*angular.extend($scope, {
          bounds: boundsTemp
        });*/
        $scope.markers = markers;
        $scope.center = {
            lat: (bounds[0][0] + bounds[1][0]) / 2,
            lng: (bounds[0][1] + bounds[1][1]) / 2,
            zoom: 15
          };
//        $scope.bounds = leafletBoundsHelpers.createBoundsFromArray(bounds);
      } else {
        $scope.markers = {};
//        $scope.bounds = {};
      }

    }

    //----------------
    // MAP END
    //----------------

    $scope.selectList = function(item) {
      $scope.listSelected = item;
    };

    //helper methods

    function findExperiences() {
      Experiences.query(getFilterObjectForQuery()).$promise.then(function(experiences) {
        $scope.experiences = experiences;
        if (!$scope.initialCount) {
          $scope.initialCount = experiences.length;
        }
        updateMap();
      });
    }

    function findMedia() {
      Media.query().$promise.then(function(media) {
        $scope.media = media;
      });
    }
  }
]);
