'use strict';

// Setting up route
angular.module('media').config(['$stateProvider',
  function ($stateProvider) {
    // Media state routing
    $stateProvider
      .state('media', {
        abstract: true,
        url: '/media',
        template: '<ui-view/>'
      })
      .state('media.list', {
        url: '',
        templateUrl: 'modules/media/client/views/list-media.client.view.html'
      })
      .state('media.create', {
        url: '/create',
        templateUrl: 'modules/media/client/views/create-medium.client.view.html',
        data: {
//          roles: ['*']
        }
      })
      .state('media.view', {
        url: '/:mediumId',
        templateUrl: 'modules/media/client/views/view-medium.client.view.html'
      })
      .state('media.edit', {
        url: '/:mediumId/edit',
        templateUrl: 'modules/media/client/views/edit-medium.client.view.html',
        data: {
//          roles: ['*']
        }
      });
  }
]);
