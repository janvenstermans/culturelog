'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Medium Schema

 @see http://stackoverflow.com/questions/28200502/map-in-mongoose
 */
var MediumSchema = new Schema({
  name: {
    type: String,
    required: 'name cannot be blank'
  },
  specifications : [String]
});

mongoose.model('Medium', MediumSchema);
