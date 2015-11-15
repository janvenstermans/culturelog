'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Medium = mongoose.model('Medium'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a medium
 */
exports.create = function (req, res) {
  var medium = new Medium(req.body);
  medium.user = req.user.id;

  medium.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
    console.log(medium);
      res.json(medium);
    }
  });
};

/**
 * Show the current medium
 */
exports.read = function (req, res) {
  res.json(req.medium);
};

/**
 * Update a medium
 */
exports.update = function (req, res) {
  var medium = req.medium;
  medium.name = req.body.name;
  medium.specifications = req.body.specifications;

  medium.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
    console.log(medium);
      res.json(medium);
    }
  });
};

/**
 * Delete a medium object.
 */
exports.delete = function (req, res) {
  var medium = req.medium;
  medium.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
    console.log(medium);
      res.json(medium);
    }
  });
};

/**
 * List of Media
 */
exports.list = function (req, res) {
// allow general media by default
  var allowedUsersArray = [null];
  // allow user's locations when logged in
  if (req.user) {
    allowedUsersArray.push(req.user.id);
  }
  Medium.find()
  .where('user').in(allowedUsersArray)
  .populate('user', 'displayName username')
  .exec(function (err, media) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(media);
    }
  });
};

/**
 * Medium middleware
 */
exports.mediumByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Medium is invalid'
    });
  }

  Medium.findById(id)
  .populate('user', 'displayName username')
  .exec(function (err, medium) {
    if (err) {
      return next(err);
    } else if (!medium) {
      return res.status(404).send({
        message: 'No medium with that identifier has been found'
      });
    }
    req.medium = medium;
    next();
  });
};
