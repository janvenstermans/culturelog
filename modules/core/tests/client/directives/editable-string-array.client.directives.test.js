'use strict';

describe('Core: Directives', function() {

  var ele, $scope, stringArray;

  // Load the main application module
  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope.$new();
    stringArray = [];
    $scope.stringArray = stringArray;
    ele = angular.element(
      '<editable-string-array ng-model="stringArray"></editable-string-array>'
    );
    $compile(ele)($scope);
    $scope.$apply();
  }));

  describe("editable-string-array elemet", function() {
     it('should add values', function() {
      var string1 = "string1Test";
      console.log($scope);
        $scope.$apply(function() {
          $scope.newValue = string1;
          $scope.addValue();
        });

        expect($scope.stringArray.size).toBe(1);
        expect($scope.stringArray[0]).toBe(string1);
        expect($scope.newValue).toBe('');
      });
  });

});
