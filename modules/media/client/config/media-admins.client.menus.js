'use strict';

// Configuring the Media module for users
angular.module('media').run(['Menus',
  function (Menus) {
    // Add the media dropdown item
    Menus.addMenuItem('topbar', {
      title: 'General Media',
      state: 'mediaGeneral',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'mediaGeneral', {
      title: 'List General Media',
      state: 'media.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'mediaGeneral', {
      title: 'Create General Medium',
      state: 'media.create',
      roles: ['admin']
    });
  }
]);
