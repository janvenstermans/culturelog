'use strict';

// Configuring the Locations module
angular.module('locations').run(['Menus',
  function (Menus) {
    // Add the locations dropdown item
    Menus.addMenuItem('topbar', {
      title: 'General Locations',
      state: 'locationsGeneral',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'locationsGeneral', {
      title: 'List General Locations',
      state: 'locations.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'locationsGeneral', {
      title: 'Create General Location',
      state: 'locations.create',
      roles: ['admin']
    });
  }
]);
