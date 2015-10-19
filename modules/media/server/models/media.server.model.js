'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Medium Schema
 */
var MediumSchema = new Schema({
  name: {
    type: String,
    required: 'name cannot be blank'
  },
  specifications : [String]
});

mongoose.model('Medium', MediumSchema);
