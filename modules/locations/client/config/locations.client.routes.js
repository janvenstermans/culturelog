'use strict';

// Setting up route
angular.module('locations').config(['$stateProvider',
  function ($stateProvider) {
    // Locations state routing
    $stateProvider
      .state('locations', {
        abstract: true,
        url: '/locations',
        template: '<ui-view/>'
      })
      .state('locations.list', {
        url: '',
        templateUrl: 'modules/locations/client/views/list-locations.client.view.html'
      })
      .state('locations.create', {
        url: '/create',
        templateUrl: 'modules/locations/client/views/create-location.client.view.html',
        data: {
          roles: ['admin','user']
        }
      })
      .state('locations.view', {
        url: '/:locationId',
        templateUrl: 'modules/locations/client/views/view-location.client.view.html'
      })
      .state('locations.edit', {
        url: '/:locationId/edit',
        templateUrl: 'modules/locations/client/views/edit-location.client.view.html',
        data: {
          roles: ['admin','user']
        }
      });
  }
]);
