'use strict';

// Experience Update controller
angular.module('experiences').controller('ExperienceUpdateController', ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media) {

    $scope.authentication = Authentication;

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

    // Find existing Experience
    $scope.findOne = function () {
      Experiences.get({
        experienceId: $stateParams.experienceId
      }, function(result) {
        $scope.experience = result;
        Media.query({},function(media) {
            // for input["select"] of medium: use the exact given medium object
            var medium = $scope.experience.medium;
            for (var i = 0; i < media.length; i++) {
                if (media[i]._id == medium._id) {
                    media[i] = medium;
                }
            }
            $scope.media = media;
        });
      });
    };
   }

]);
