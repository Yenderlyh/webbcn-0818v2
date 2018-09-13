'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
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
    enum: ['documentation', 'exercises', 'events']
  }
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;