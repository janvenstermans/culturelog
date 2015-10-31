'use strict';

//Experiences service used for communicating with the experiences REST endpoints
angular.module('core').factory('Geocoder', ['$http', '$q',
  function ($http, $q) {

    var findSingleLocation = function(description) {
      return $q(function(resolve, reject) {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + description)
            .then(function(response) {
              if(response.data.status === "OK" && response.data.results.length === 1) {
                var singleResult = response.data.results[0];
                var locationInfo = singleResult.geometry.location;
                resolve({lng: locationInfo.lng, lat: locationInfo.lat});
              } else {
                 reject();
              }
            }, function(error) {
              reject();
            });
        });
      };

    // return functionality
    return {
      findSingleLocation : findSingleLocation
    };
  }
]);
