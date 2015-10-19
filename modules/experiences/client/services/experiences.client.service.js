'use strict';

//Experiences service used for communicating with the experiences REST endpoints
angular.module('experiences').factory('Experiences', ['$resource',
  function ($resource) {
    return $resource('api/experiences/:experienceId', {
      experienceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
