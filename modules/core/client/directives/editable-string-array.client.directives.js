'use strict';

/**
*/

angular.module('core')
  .directive('editableStringArray', [function () {

    var controller = function($scope) {
      if(!$scope.values) {
        $scope.values = [];
      }

      var editIndex = null;

      $scope.addValue = function() {
        if ($scope.newValue) {
          $scope.values.push($scope.newValue);
          $scope.newValue = '';
        }
      };

      $scope.removeValue = function(index) {
        $scope.values.splice(index, 1);
        editIndex = null;
      };

      $scope.hasNoValues = function(index) {
        if ($scope.values) {
          return $scope.values.length === 0;
        }
        return true;
      };

      /**
      * expect index to be an integer
      */
      $scope.isEditing = function(index) {
        if (index){
          return index === editIndex;
        }
        return editIndex !== null;
      };

      $scope.toggleEdit = function(index) {
        if (index === editIndex) {
           editIndex = null;
        } else {
           editIndex = index;
        }
      };
    };

    return {
      require: ['^ngModel'],
      scope: {
        values: '=ngModel'
      },
      restrict: 'E',
      replace: true,
      link: controller,
      templateUrl: '/modules/core/client/views/editable-string-array.client.view.html'
    };
}]);
