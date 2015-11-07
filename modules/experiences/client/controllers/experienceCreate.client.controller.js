'use strict';

// Experience Create controller
angular.module('experiences').controller('ExperienceCreateController', ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media', 'Geocoder',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media, Geocoder) {

    $scope.authentication = Authentication;

    // find all media
    $scope.media = Media.query();

    $scope.newExperience = {};
    $scope.location = {};

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
        specifications : getSpecifications(),
        location : $scope.location
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

    $scope.$watch('newExperience.medium', function(){
      updateSpecificationsTemp();
    });

    $scope.updateLocationInfo = function() {
         if ($scope.location.description && $scope.location.description !== null) {
            Geocoder.findSingleLocation($scope.location.description).then(function(result){
                $scope.location.lng = result.lng;
                $scope.location.lat = result.lat;
            });
         }
      };

    $scope.hasLngLat = function() {
        if ($scope.location.lng && $scope.location.lng !== null &&
                $scope.location.lat && $scope.location.lat !== null) {
            return true;
        }
        return false;
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

     function updateSpecificationsTemp() {
        $scope.specificationsTemp = [];
        var medium = $scope.newExperience.medium;
        if (medium) {
          for (var i = 0; i < medium.specifications.length; i++) {
              var spec = {name:medium.specifications[i]};
              $scope.specificationsTemp.push(spec);
          }
        }
     }

     function getSpecifications() {
        var specifications = [];
        for (var i = 0; i < $scope.specificationsTemp.length; i++) {
             var spec = $scope.specificationsTemp[i];
             if (spec.value && spec.value !== null) {
              specifications.push(spec);
             }
        }
        if (specifications.length > 0) {
          return specifications;
        }
        return null;
     }
   }

]);
