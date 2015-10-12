'use strict';

/**
 * Module dependencies.
 */
var mediaPolicy = require('../policies/media.server.policy'),
  media = require('../controllers/media.server.controller');

  if (!media.list) {
    media.
  }

module.exports = function (app) {
  // Media collection routes
  app.route('/api/media').all(mediaPolicy.isAllowed)
    .get(media.list);

  // Single medium routes
  app.route('/api/media/:mediaId').all(mediaPolicy.isAllowed)
    .get(media.read);

  // Finish by binding the medium middleware
  app.param('mediumId', media.mediumByID);
};
