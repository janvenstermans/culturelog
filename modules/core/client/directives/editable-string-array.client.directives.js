'use strict';

/**
*/

angular.module('core')
  .directive('editableStringArray', [function () {

    var controller = function($scope) {
      if(!$scope.values) {
        $scope.values = [];
      }

      $scope.addValue = function() {
        if ($scope.newValue) {
          $scope.values.push($scope.newValue);
          $scope.newValue = '';
        }
      };

      $scope.removeValue = function(index) {
        $scope.values.splice(index, 1);
      };

      $scope.hasNoValues = function(index) {
        return $scope.values.length == 0;
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
