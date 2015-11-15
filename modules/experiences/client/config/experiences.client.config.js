'use strict';

// Configuring the Experiences module
angular.module('experiences').run(['Menus',
  function (Menus) {
    // Add the experiences dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Experiences',
      state: 'experiences',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'experiences', {
      title: 'List Experiences',
      state: 'experiences.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'experiences', {
      title: 'Create Experience',
      state: 'experiences.create',
      roles: ['user']
    });
  }
]);
