'use strict';

// Configuring the Locations module
angular.module('locations').run(['Menus',
  function (Menus) {
    // Add the locations dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Locations',
      state: 'locations',
      type: 'dropdown',
      roles: ['admin', 'user']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'locations', {
      title: 'List Locations',
      state: 'locations.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'locations', {
      title: 'Create Location',
      state: 'locations.create',
      roles: ['admin', 'user']
    });
  }
]);
