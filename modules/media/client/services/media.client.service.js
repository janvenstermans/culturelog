'use strict';

//Media service used for communicating with the media REST endpoints
angular.module('media').factory('Media', ['$resource',
  function ($resource) {
    return $resource('api/media/:mediumId', {
      mediumId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
