'use strict';

// Experience Update controller
angular.module('experiences').controller('ExperienceEditController',
    ['$scope', '$stateParams', '$location', 'Authentication', 'Experiences', 'Media', 'Locations',
  function ($scope, $stateParams, $location, Authentication, Experiences, Media, Locations) {

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
      if (!experience.specifications) {
           experience.specifications = getSpecifications();
      } else {
        for (var i = 0; i < $scope.specificationsTemp.length; i++) {
            var specTemp = $scope.specificationsTemp[i];
            var existingIndex = getExistingIndex(experience.specifications, specTemp.name);
            for (var j = 0; j < experience.specifications.length; j++) {
                if (experience.specifications[j].name == specTemp.name) {
                    existingIndex = j;
                }
            }
            if (specTemp.value && specTemp.value != null) {
                if (existingIndex !== null) {
                    experience.specifications[existingIndex].value = specTemp.value;
                } else {
                    experience.specifications.push(specTemp);
                }
            } else if (existingIndex !== null) {
                experience.specifications.splice(existingIndex, 1);
            }
        }
      }

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
        Locations.query({},function(locations) {
            // for input["select"] of location: use the exact given location object
            var location = $scope.experience.location;
            if (location && location._id) {
                for (var i = 0; i < locations.length; i++) {
                    if (locations[i]._id == location._id) {
                        locations[i] = location;
                    }
                }
            }
            $scope.locations = locations;
        });
      });
    };

    $scope.$watch('experience.medium', function(){
      updateSpecificationsTemp();
    });

     //DATE methods section start
    $scope.today = function() {
      $scope.experience.date = new Date();
    };

    $scope.clear = function () {
      $scope.experience.date = null;
    };

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.experience.date = new Date(year, month, day);
    };

    $scope.datePickerOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.format = 'EEEE d MMMM yyyy';

    $scope.status = {
      opened: false
    };
     //DATE methods section end

    function updateSpecificationsTemp() {
        $scope.specificationsTemp = [];
        if ($scope.experience) {
            var medium = $scope.experience.medium;
            if (medium) {
                for (var i = 0; i < medium.specifications.length; i++) {
                    var spec = {name:medium.specifications[i]};
                    var existingIndex = getExistingIndex($scope.experience.specifications, spec.name);
                    if (existingIndex !== null) {
                        spec.value = $scope.experience.specifications[existingIndex].value;
                    }
                    $scope.specificationsTemp.push(spec);
                }
            }
        }

     }

     /**
     * returns an index integer or null;
     */
     function getExistingIndex(specArray, specName) {
         for (var j = 0; j < specArray.length; j++) {
             if (specArray[j].name == specName) {
                 return j;
             }
         }
         return null;
     }

    function getSpecifications() {
        var specifications = [];
        for (var i = 0; i < $scope.specificationsTemp.length; i++) {
             var spec = $scope.specificationsTemp[i];
             if (spec.value && spec.value != null) {
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
