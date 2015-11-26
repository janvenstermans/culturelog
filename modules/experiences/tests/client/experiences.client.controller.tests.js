'use strict';

(function () {
   describe('Experiences Overview Controller Tests', function () {
    var $controller,
          $scope, $stateParams, $httpBackend, $q;

      // Then we can start by loading the main application module
      beforeEach(module(ApplicationConfiguration.applicationModuleName));

      beforeEach(inject(function (_$controller_, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _$q_) {
        $controller = _$controller_;
        $scope = $rootScope.$new();
        $stateParams = _$stateParams_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
      }));

      describe('on construction', function(){
        it('should set scope parameters', function(){
            var AuthenticationMock = {id:"AuthenticationMock"};

            var ExperiencesController = $controller('ExperiencesController', {
              $scope: $scope,
              Authentication: AuthenticationMock
            });

            expect($scope.authentication).toEqual(AuthenticationMock);
            expect($scope.find).toBeTruthy();
            expect($scope.sort).toBeTruthy();
            expect($scope.sortBy).toBeTruthy();
            expect($scope.openStart).toBeTruthy();
            expect($scope.openEnd).toBeTruthy();
            expect($scope.datePickerOptions).toBeTruthy();
            expect($scope.format).toBeTruthy();
            expect($scope.status).toBeTruthy();
            expect($scope.filter).toBeTruthy();

            //falsy
            expect($scope.experiences).toBeFalsy();
            expect($scope.initialCount).toBeFalsy();
            expect($scope.media).toBeFalsy();
        });
      });

      describe('after construction', function(){
          var ExperiencesController;

          var AuthenticationMock,  ExperiencesMock, MediaMock;
          var experiencesQueryDeferred, mediaQueryDeferred;

          beforeEach(function() {
              AuthenticationMock = {id:"AuthenticationMock"};
              ExperiencesMock = {
                query : function(query) {
                  experiencesQueryDeferred = $q.defer();
                  return { $promise: experiencesQueryDeferred.promise};
                }
              };
              MediaMock = {
                query : function() {
                  mediaQueryDeferred = $q.defer();
                  return { $promise: mediaQueryDeferred.promise};
                }
              };
              ExperiencesController = $controller('ExperiencesController', {
                $scope: $scope,
                Authentication: AuthenticationMock,
                 Experiences: ExperiencesMock,
                 Media: MediaMock
              });
          });

          it('should load experiences and media on $scope.find', function() {
              $scope.find();

              expect(experiencesQueryDeferred).toBeTruthy();
              expect(mediaQueryDeferred).toBeTruthy();
              var experiencesResult = {id:"experiencesResult"};
              var mediaResult = {id:"mediaResult"};
              experiencesQueryDeferred.resolve(experiencesResult);
              mediaQueryDeferred.resolve(mediaResult);
              $scope.$digest();
              expect($scope.experiences).toEqual(experiencesResult);
              expect($scope.media).toEqual(mediaResult);
          });

      });
   });
}());
