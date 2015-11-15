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
    roles: ['admin'],
    allows: [{
      resources: '/api/media',
      permissions: '*'
    }, {
      resources: '/api/media/:mediumId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/media',
      permissions: ['get', 'post']
    }, {
      resources: '/api/media/:mediumId',
      permissions: ['get', 'put', 'delete']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/media',
      permissions: ['get']
    }, {
      resources: '/api/media/:mediumId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Media Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If a medium is being processed and the current user created it then allow any manipulation
  if (req.medium && req.medium.user) {
    if (!req.user) {
      return res.status(401).send({
        message: 'Not Authenticated.'
      });
    } else if (req.medium.user.id != req.user.id) {
      return res.status(403).send({
        message: 'Not Authorized.'
      });
    } else {
      return next();
    }
  } else {
    // rest of policy: in case medium is general (or no medium = POST)
    // Check for user roles, general authentication
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
      if (err) {
        // An authorization error occurred.
        return res.status(500).send('Unexpected authorization error');
      } else {
        if (isAllowed) {
          var method = req.method.toLowerCase();
          var isAdmin = roles.indexOf('admin') > -1;
          if (req.medium && 'get' != method && !isAdmin) {
            return res.status(403).json({
              message: 'User is not authorized'
            });
          }
          // Access granted! Invoke next middleware
          return next();
        } else {
          return res.status(403).json({
            message: 'User is not authorized'
          });
        }
      }
    });
  }
};
