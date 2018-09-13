'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  presentationLink: {
    type: String,
    required: true
  },
  projectLink: {
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
