'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Articles Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'user','guest'],
    allows: [{
      resources: '/api/media',
      permissions: '*'
    }, {
      resources: '/api/media/:mediumId',
      permissions: '*'
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
