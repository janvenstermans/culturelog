'use strict';

// Media controller
angular.module('media').controller('MediaController', ['$scope', '$stateParams', '$location', 'Authentication', 'Media',
  function ($scope, $stateParams, $location, Authentication, Media) {
    $scope.authentication = Authentication;

    // CREATE SECTION START

    //create parameters
    $scope.specifications = [];

    $scope.addSpec = function() {
      if ($scope.newSpecTemp) {
       $scope.specifications.push($scope.newSpecTemp);
       $scope.newSpecTemp = '';
      }
     };

    $scope.removeSpec = function(index) {
       $scope.specifications.splice(index, 1);
     };

    // Create new Medium
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'mediumForm');

        return false;
      }

      // Create new Medium object
      var medium = new Media({
        name: this.name,
        specifications: this.specifications
      });

      // Redirect after save
      medium.$save(function (response) {
        $location.path('media/' + response._id);

        // Clear form fields
        $scope.name = '';
        $scope.specifications = [];
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // CREATE SECTION END

    // Remove existing Medium
    $scope.remove = function (medium) {
      if (medium) {
        medium.$remove();

        for (var i in $scope.media) {
          if ($scope.media[i] === medium) {
            $scope.media.splice(i, 1);
          }
        }
      } else {
        $scope.medium.$remove(function () {
          $location.path('media');
        });
      }
    };

    //UPDATE SECTION START

    $scope.addSpecEdit = function() {
          if ($scope.newSpecTemp) {
           $scope.medium.specifications.push($scope.newSpecTemp);
           $scope.newSpecTemp = '';
          }
         };

        $scope.removeSpecEdit = function(index) {
           $scope.medium.specifications.splice(index, 1);
         };

    // Update existing Medium
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'mediumForm');

        return false;
      }

      var medium = $scope.medium;

      medium.$update(function () {
        $location.path('media/' + medium._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    //UPDATE SECTION END

    // Find a list of Media
    $scope.find = function () {
      $scope.media = Media.query();
    };

    // Find existing Medium
    $scope.findOne = function () {
      $scope.medium = Media.get({
        mediumId: $stateParams.mediumId
      });
    };
  }
]);
