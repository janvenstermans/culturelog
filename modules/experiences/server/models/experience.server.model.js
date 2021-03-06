'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  date : {
     type: Date,
     required: 'date required'
   },
  author: [String],
  description: String,
  review: String,
  rating: Number,
//  @see http://stackoverflow.com/questions/28200502/map-in-mongoose
  specifications : [{
      name: String,
      value: Schema.Types.Mixed
  }],
  location : {
      type: Schema.ObjectId,
      ref: 'Location',
  },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'user required'
    }
});

mongoose.model('Experience', ExperienceSchema);
