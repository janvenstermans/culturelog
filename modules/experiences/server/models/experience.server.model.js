'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Location Schema
 *
 @see http://stackoverflow.com/questions/28200502/map-in-mongoose
 */
var LocationSchema = new Schema({
lng: {
    type: Number,
    required: 'longitude cannot be blank'
  },lat: {
    type: Number,
    required: 'latitude cannot be blank'
  }});

/**
 * Experience Schema
 *
 */
var ExperienceSchema = new Schema({
  medium: {
    type: Schema.ObjectId,
    ref: 'Medium',
    required: 'medium cannot be blank'
  },
  title: {
    type: String,
    required: 'title cannot be blank'
  },
  date : Date,
  author: [String],
  description: String,
  review: String,
  rating: Number,
//  @see http://stackoverflow.com/questions/28200502/map-in-mongoose
  specifications : [{
      name: String,
      value: Schema.Types.Mixed
  }]/*,
  location : LocationSchema*/
});

mongoose.model('Experience', ExperienceSchema);
