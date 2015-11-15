'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Location = mongoose.model('Location'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a location
 */
exports.create = function (req, res) {
  var location = new Location(req.body);
  if (req.user && req.user.roles.indexOf('user') > -1) {
      location.user = req.user.id;
  }

  location.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(location);
    }
  });
};

/**
 * Show the current location
 */
exports.read = function (req, res) {
  res.json(req.location);
};

/**
 * Update a location
 */
exports.update = function (req, res) {
  var location = req.location;
  location.description = req.body.description;
  location.address = req.body.address;
  location.lng = req.body.lng;
  location.lat = req.body.lat;

  location.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(location);
    }
  });
};

/**
 * Delete a location object.
 */
exports.delete = function (req, res) {
  var location = req.location;
  location.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(location);
    }
  });
};

/**
 * List of Locations.
  Returns all general locations (visible to all), plus all locations of user.
 */
exports.list = function (req, res) {
  // allow general locations by default
  var allowedUsersArray = [null];
  // allow user's locations when logged in
  if (req.user) {
    allowedUsersArray.push(req.user.id);
  }
  Location.find()
  .where('user').in(allowedUsersArray)
  .populate('user', 'displayName username')
  .exec(function (err, locations) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(locations);
    }
  });
};

/**
 * Location middleware
 Will return user attribute of type {_id: xxx, displayName: xxx}
 */
exports.locationByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Location is invalid'
    });
  }

  Location.findById(id)
  .populate('user', 'displayName username')
  .exec(function (err, location) {
    if (err) {
      return next(err);
    } else if (!location) {
      return res.status(404).send({
        message: 'No location with that identifier has been found'
      });
    }
    req.location = location;
    next();
  });
};
