'use strict';

/**
 * Module dependencies.

 Link with other objects:
 id => object on call: 'populate': https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Location = mongoose.model('Location'),
  Experience = mongoose.model('Experience'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an experience
 */
exports.create = function (req, res) {
  console.log("create location");
  var location = new Location(req.body.location);
  location.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        req.body.location = location;
        var experience = new Experience(req.body);

          experience.save(function (err) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              res.json(experience);
            }
          });
      }
    });

};

/**
 * Show the current experience
 */
exports.read = function (req, res) {
  res.json(req.experience);
};

/**
 * Update an experience
 */
exports.update = function (req, res) {
  var experience = req.experience;

  experience.title = req.body.title;
  experience.medium = req.body.medium;
  experience.date = req.body.date;
  experience.author = req.body.author;
  experience.description = req.body.description;
  experience.review = req.body.review;
  experience.rating = req.body.rating;
  experience.specifications = req.body.specifications;
  // update the location object
  updateLocation(req.body.location, res);

  experience.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(experience);
    }
  });
};

function updateLocation(location, res) {
  location.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
  });
}

/**
 * Delete a experience object.
 */
exports.delete = function (req, res) {
  var experience = req.experience;

  experience.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(experience);
    }
  });
};

/**
 * List of Experiences
 */
exports.list = function (req, res) {
  Experience
  .find()
  .populate('medium')
  .populate('location')
  .exec(function (err, experiences) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(experiences);
    }
  });
};

/**
 * Experience middleware
 */
exports.experienceByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Experience is invalid'
    });
  }

  Experience
  .findById(id)
  .populate('medium')
  .populate('location')
  .exec(function (err, experience) {
    if (err) {
      return next(err);
    } else if (!experience) {
      return res.status(404).send({
        message: 'No experience with that identifier has been found'
      });
    }
    req.experience = experience;
    next();
  });
};
