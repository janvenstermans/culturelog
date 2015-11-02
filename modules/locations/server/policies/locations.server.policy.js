'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Locations Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/locations',
      permissions: '*'
    }, {
      resources: '/api/locations/:locationId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/locations',
      permissions: ['get', 'post']
    }, {
      resources: '/api/locations/:locationId',
      permissions: ['get', 'put', 'delete']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/locations',
      permissions: ['get']
    }, {
      resources: '/api/locations/:locationId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Articles Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  // everyone can read all
  return next();
};
