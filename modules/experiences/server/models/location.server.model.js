'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Location Schema
 */
var LocationSchema = new Schema({
  description : {
    type : String,
    required: 'location description required'
  },
  lng: {
    type: Number
  },lat: {
    type: Number
  }
});

mongoose.model('Location', LocationSchema);
