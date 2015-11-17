'use strict';

/**
 * Module dependencies.

 Link with other objects:
 id => object on call: 'populate': https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
 */
var path = require('path'),
  mongoose = require('mongoose'),
  url = require('url'),
  Experience = mongoose.model('Experience'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an experience
 */
exports.create = function (req, res) {
  var experience = new Experience(req.body);
  experience.user = req.user.id;

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
  experience.location = req.body.location;

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
  var url_parts = url.parse(req.url, true);
  var urlQuery = url_parts.query;
  var query = Experience
  .find()
  .populate('medium')
  .populate('location')
  .populate('user', 'displayName username');
  if (req.user.roles.indexOf('admin') < 0) {
    query.where('user', req.user);
  }
  if (urlQuery.media) {
    query.where('medium').in(urlQuery.media);
  }
  if (urlQuery.search) {
  // select a number of text fields
    query.$where('this.title.indexOf("' + urlQuery.search + '") > -1');
    query.$where('this.description.indexOf("' + urlQuery.search + '") > -1');
    query.$where('this.review.indexOf("' + urlQuery.search + '") > -1');
  }
  if (urlQuery.startDate) {
    var startDate = new Date(parseInt(urlQuery.startDate));
    startDate.setHours(0, 0, 0, 0);
    query.where('date').gte(startDate);
  }
  if (urlQuery.endDate) {
      var endDate = new Date(parseInt(urlQuery.endDate));
      endDate.setHours(0, 0, 0, 0);
      endDate.setDate(endDate.getDate() + 1);
      query.where('date').lt(endDate);
    }

  query.exec(function (err, experiences) {
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

  var query = Experience
  .findById(id)
  .populate('medium')
  .populate('location')
  .populate('user', 'displayName username');
  if (req.user.roles.indexOf('admin') < 0) {
      query.where('user', req.user);
    }
  query.exec(function (err, experience) {
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
