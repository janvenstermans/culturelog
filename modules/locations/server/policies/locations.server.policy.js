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
 * Check If Location's Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If a location is being processed and the current user created it then allow any manipulation
  if (req.location && req.location.user) {
    if (!req.user) {
      return res.status(401).send({
        message: 'Not Authenticated.'
      });
    } else if (req.location.user.id != req.user.id) {
      return res.status(403).send({
        message: 'Not Authorized.'
      });
    } else {
      return next();
    }
  } else {
    // rest of policy: in case location is general (or no location = POST)
    // Check for user roles, general authentication
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
      if (err) {
        // An authorization error occurred.
        return res.status(500).send('Unexpected authorization error');
      } else {
        if (isAllowed) {
          var method = req.method.toLowerCase();
          var isAdmin = roles.indexOf('admin') > -1;
          if (req.location && 'get' != method && !isAdmin) {
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
