'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['people', 'calendar', 'activity'],
    required: true
  }
}, {
  timestamps: true
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
