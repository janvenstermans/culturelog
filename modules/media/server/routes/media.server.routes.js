'use strict';

/**
 * Module dependencies.
 */
var mediaPolicy = require('../policies/media.server.policy'),
  media = require('../controllers/media.server.controller');

module.exports = function (app) {
  // Media collection routes
  app.route('/api/media').all(mediaPolicy.isAllowed)
    .get(media.list)
    .post(media.create);

  // Single medium routes
  app.route('/api/media/:mediumId').all(mediaPolicy.isAllowed)
   .get(media.read)
      .put(media.update)
      .delete(media.delete);

  // Finish by binding the medium middleware
  app.param('mediumId', media.mediumByID);
};
