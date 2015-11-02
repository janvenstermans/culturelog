'use strict';

//Locations service used for communicating with the locations REST endpoints
angular.module('locations').factory('Locations', ['$resource',
  function ($resource) {
    return $resource('api/locations/:locationId', {
      locationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
