'use strict';
/**
see http://neverfriday.com/2014/07/28/angularjs-testing-services-that-use-resource/
*/
(function () {
   describe('Experiences Service Tests', function () {
    var Experiences;
    var $httpBackend, $q;

      // Then we can start by loading the main application module
      beforeEach(module(ApplicationConfiguration.applicationModuleName));

      beforeEach(inject(function (_Experiences_, _$httpBackend_, _$q_) {
        Experiences = _Experiences_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
      }));

      describe('query method', function() {
        it('should call endpoint "api/experiences" and return array on success', function() {
            $httpBackend.expect('GET', 'api/experiences').respond(200, []);
            var successful = false;
            var unsuccessful = false;

            Experiences.query().$promise.then(function(result) {
                successful = true;
            }, function(error){
                unsuccessful = true;
            });

            $httpBackend.flush();
            expect(successful).toBe(true);
            expect(unsuccessful).toBe(false);
        });

        it('should call endpoint "api/experiences" and call error callback on not successful', function() {
            $httpBackend.expect('GET', 'api/experiences').respond(400, 'error');
            var successful = false;
            var unsuccessful = false;

            Experiences.query().$promise.then(function(result) {
            successful = true;
            }, function(error){
            unsuccessful = true;
            });

            $httpBackend.flush();
            expect(successful).toBe(false);
            expect(unsuccessful).toBe(true);
        });

        it('should call endpoint "api/experiences?startDate=<timeAsLong>" and return array on success', function() {
            var timeMock = 12345678;
            $httpBackend.expect('GET', 'api/experiences?startDate=' + timeMock).respond(200, []);
            var successful = false;
            var unsuccessful = false;

            Experiences.query({startDate: timeMock})
            .$promise.then(function(result) {
                successful = true;
            }, function(error){
                unsuccessful = true;
            });

            $httpBackend.flush();
            expect(successful).toBe(true);
            expect(unsuccessful).toBe(false);
        });

        it('should call endpoint "api/experiences?endDate=<timeAsLong>" and return array on success', function() {
            var timeMock = 12345678;
            $httpBackend.expect('GET', 'api/experiences?endDate=' + timeMock).respond(200, []);
            var successful = false;
            var unsuccessful = false;

            Experiences.query({endDate: timeMock})
            .$promise.then(function(result) {
                successful = true;
            }, function(error){
                unsuccessful = true;
            });

            $httpBackend.flush();
            expect(successful).toBe(true);
            expect(unsuccessful).toBe(false);
        });

        it('should call endpoint "api/experiences?search=<searchString>" and return array on success', function() {
            var searchStringMock = "groeten uit balen";
            $httpBackend.expect('GET', 'api/experiences?search=' + searchStringMock.replace(/ /g, "+")).respond(200, []);
            var successful = false;
            var unsuccessful = false;

            Experiences.query({search: searchStringMock})
            .$promise.then(function(result) {
                successful = true;
            }, function(error){
                unsuccessful = true;
            });

            $httpBackend.flush();
            expect(successful).toBe(true);
            expect(unsuccessful).toBe(false);
        });

        it('should call endpoint "api/experiences?media=<mediaArray>" and return array on success', function() {
            var mediaArray = ["id0", "id1", "id2"]; // array of media ids
            $httpBackend.expect('GET', 'api/experiences?' + mediaArrayToQuery(mediaArray)).respond(200, []);
            var successful = false;
            var unsuccessful = false;

            Experiences.query({media: mediaArray})
            .$promise.then(function(result) {
                successful = true;
            }, function(error){
                unsuccessful = true;
            });

            $httpBackend.flush();
            expect(successful).toBe(true);
            expect(unsuccessful).toBe(false);
        });

        it('should call endpoint "api/experiences?<allQueryParameters>" and return array on success', function() {
            var timeMock1 = 123456789;
            var timeMock2 = 223456780;
            var searchStringMock = "groeten uit balen";
            var mediaArray = ["id0", "id1", "id2"]; // array of media ids
            // expect query parameters to be alphabetically
            $httpBackend.expect('GET', 'api/experiences?'+
                'endDate=' + timeMock2 +
                '&' + mediaArrayToQuery(mediaArray) +
                '&search=' + searchStringMock.replace(/ /g, "+") +
                '&startDate=' + timeMock1
                ).respond(200, []);
            var successful = false;
            var unsuccessful = false;

            Experiences.query({
                search: searchStringMock,
                media: mediaArray,
                startDate: timeMock1,
                endDate: timeMock2
            })
            .$promise.then(function(result) {
                successful = true;
            }, function(error){
                unsuccessful = true;
            });

            $httpBackend.flush();
            expect(successful).toBe(true);
            expect(unsuccessful).toBe(false);
        });

        function mediaArrayToQuery(stringArray) {
            var result = "";
            if (stringArray && stringArray.length > 0) {
                for (var i = 0; i < stringArray.length; i++) {
                    result += "media=" + stringArray[i] + "&";
                }
                // remove last ampersant
                result = result.substring(0, result.length - 1);
            }
            return result;
        }
      });

      describe('save method', function() {
        it('should call endpoint "api/experiences" and return object on success', function() {
            $httpBackend.expect('POST', 'api/experiences').respond(200, {});
            var successful = false;
            var unsuccessful = false;

            Experiences.save().$promise.then(function(result) {
                successful = true;
            }, function(error){
                unsuccessful = true;
            });

            $httpBackend.flush();
            expect(successful).toBe(true);
            expect(unsuccessful).toBe(false);
        });

         it('should call endpoint "api/experiences" and call error callback on not successful', function() {
            $httpBackend.expect('POST', 'api/experiences').respond(400, 'error');
            var successful = false;
            var unsuccessful = false;

            Experiences.save().$promise.then(function(result) {
                successful = true;
            }, function(error){
                unsuccessful = true;
            });

            $httpBackend.flush();
            expect(successful).toBe(false);
            expect(unsuccessful).toBe(true);
        });

        it('should call endpoint "api/experiences" and return object on success', function() {
            $httpBackend.expect('POST', 'api/experiences').respond(200, {});
            var successful = false;
            var unsuccessful = false;

            var experience = new Experiences();
            experience.$save(function(result) {
                successful = true;
            }, function(error){
                unsuccessful = true;
            });

            $httpBackend.flush();
            expect(successful).toBe(true);
            expect(unsuccessful).toBe(false);
        });
      });

      describe('get method', function() {
      it('should call endpoint "api/experiences/:experienceId" and return object on success', function() {
          var experienceId = "testId";
          $httpBackend.expect('GET', 'api/experiences/' + experienceId).respond(200, {});
          var successful = false;
          var unsuccessful = false;

          Experiences.get({experienceId: experienceId}).$promise.then(function(result) {
              successful = true;
          }, function(error){
              unsuccessful = true;
          });

          $httpBackend.flush();
          expect(successful).toBe(true);
          expect(unsuccessful).toBe(false);
      });

       it('should call endpoint "api/experiences/:experienceId" and call error callback on not successful', function() {
          var experienceId = "testId";
          $httpBackend.expect('GET', 'api/experiences/' + experienceId).respond(400, 'error');
          var successful = false;
          var unsuccessful = false;

          Experiences.get({experienceId: experienceId}).$promise.then(function(result) {
              successful = true;
          }, function(error){
              unsuccessful = true;
          });

          $httpBackend.flush();
          expect(successful).toBe(false);
          expect(unsuccessful).toBe(true);
      });
    });

        describe('update method', function() {
            it('should call endpoint "api/experiences/:experienceId" and return object on success', function() {
                var experienceId = "testId";
                $httpBackend.expect('PUT', 'api/experiences/' + experienceId).respond(200, {});
                var successful = false;
                var unsuccessful = false;

                Experiences.update({experienceId: experienceId}, {}).$promise.then(function(result) {
                    successful = true;
                }, function(error){
                    unsuccessful = true;
                });

                $httpBackend.flush();
                expect(successful).toBe(true);
                expect(unsuccessful).toBe(false);
            });

            it('should call endpoint "api/experiences/:experienceId" and call error callback on not successful', function() {
                var experienceId = "testId";
                $httpBackend.expect('PUT', 'api/experiences/' + experienceId).respond(400, 'error');
                var successful = false;
                var unsuccessful = false;

                Experiences.update({experienceId: experienceId}, {}).$promise.then(function(result) {
                    successful = true;
                }, function(error){
                    unsuccessful = true;
                });

                $httpBackend.flush();
                expect(successful).toBe(false);
                expect(unsuccessful).toBe(true);
            });

            it('should call endpoint "api/experiences/:experienceId" via Experience object and return object on success', function() {
                var experienceId = "testId";
                $httpBackend.expect('PUT', 'api/experiences/' + experienceId).respond(200, {});
                var successful = false;
                var unsuccessful = false;

                var experience = new Experiences();
                experience._id = experienceId;
                experience.$update(function(result) {
                    successful = true;
                }, function(error){
                    unsuccessful = true;
                });

                $httpBackend.flush();
                expect(successful).toBe(true);
                expect(unsuccessful).toBe(false);
            });
        });

        describe('remove method', function() {
            it('should call endpoint "api/experiences/:experienceId" and return object on success', function() {
                var experienceId = "testId";
                $httpBackend.expect('DELETE', 'api/experiences/' + experienceId).respond(200, {});
                var successful = false;
                var unsuccessful = false;

                Experiences.remove({experienceId: experienceId}).$promise.then(function(result) {
                    successful = true;
                }, function(error){
                    unsuccessful = true;
                });

                $httpBackend.flush();
                expect(successful).toBe(true);
                expect(unsuccessful).toBe(false);
            });

            it('should call endpoint "api/experiences/:experienceId" and call error callback on not successful', function() {
                var experienceId = "testId";
                $httpBackend.expect('DELETE', 'api/experiences/' + experienceId).respond(400, 'error');
                var successful = false;
                var unsuccessful = false;

                Experiences.remove({experienceId: experienceId}).$promise.then(function(result) {
                    successful = true;
                }, function(error){
                    unsuccessful = true;
                });

                $httpBackend.flush();
                expect(successful).toBe(false);
                expect(unsuccessful).toBe(true);
            });

            it('should call endpoint "api/experiences/:experienceId" via Experience object and return object on success', function() {
                var experienceId = "testId";
                $httpBackend.expect('DELETE', 'api/experiences/' + experienceId).respond(200, {});
                var successful = false;
                var unsuccessful = false;

                var experience = new Experiences();
                experience._id = experienceId;
                experience.$remove(function(result) {
                    successful = true;
                }, function(error){
                    unsuccessful = true;
                });

                $httpBackend.flush();
                expect(successful).toBe(true);
                expect(unsuccessful).toBe(false);
            });
        });
   });
}());
