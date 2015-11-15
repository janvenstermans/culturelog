'use strict';

// Configuring the Media module
angular.module('media').run(['Menus',
  function (Menus) {
    // Add the media dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Media',
      state: 'media',
      type: 'dropdown',
      roles: ['admin', 'user']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'media', {
      title: 'List Media',
      state: 'media.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'media', {
      title: 'Create Medium',
      state: 'media.create',
      roles: ['admin', 'user']
    });
  }
]);
