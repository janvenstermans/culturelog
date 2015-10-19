'use strict';

// Setting up route
angular.module('experiences').config(['$stateProvider',
  function ($stateProvider) {
    // Experiences state routing
    $stateProvider
      .state('experiences', {
        abstract: true,
        url: '/experiences',
        template: '<ui-view/>'
      })
      .state('experiences.list', {
        url: '',
        templateUrl: 'modules/experiences/client/views/list-experiences.client.view.html'
      })
      .state('experiences.create', {
        url: '/create',
        templateUrl: 'modules/experiences/client/views/create-experience.client.view.html',
        data: {
//          roles: ['*']
        }
      })
      .state('experiences.view', {
        url: '/:experienceId',
        templateUrl: 'modules/experiences/client/views/view-experience.client.view.html'
      })
      .state('experiences.edit', {
        url: '/:experienceId/edit',
        templateUrl: 'modules/experiences/client/views/edit-experience.client.view.html',
        data: {
//          roles: ['*']
        }
      });
  }
]);
