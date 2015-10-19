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
//  medium.user = req.user;

  medium.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
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
      res.json(medium);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Medium.find().exec(function (err, media) {
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

  Medium.findById(id).exec(function (err, medium) {
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
