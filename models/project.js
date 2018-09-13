'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  presentationURL: {
    type: String,
    required: true
  },
  projectURL: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
