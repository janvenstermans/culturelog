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
  specifications : [String],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Medium', MediumSchema);
