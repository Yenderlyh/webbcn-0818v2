'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const data = require('../../data/events.js');
const Event = require('../../models/events.js');
const Project = require('../../models/project.js');

function updateProject (projectName, index) {
  return Event.findOne({ name: projectName })
    .then((project) => {
      if (!project) {
        throw new Error('Unknown project ' + projectName);
      }
      project[index] = project._id;
    });
}

function updateProjectIds (project) {
  const promisesOfUpdatingProjectId = project.map((projectName, index) => updateProject(projectName, index));
  return Promise.all(promisesOfUpdatingProjectId);
}

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    console.log('Connected to Mongo!');
    return Event.remove({});
  })
  .then(() => {
    const promisesOfUpdatingProject = data.map((project) => updateProjectIds(project));
    return Promise.all(promisesOfUpdatingProject);
  })
  .then(() => {
    console.log('Empty db');
    return Project.findOne({ name: data[2].projects[0] })
      .then((project) => {
        data[2].projects[0] = project.id;
      });
  })
  .then(() => {
    console.log('Empty db');
    return Event.insertMany(data);
  })
  .then((results) => {
    console.log('You have some events', results.length);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('There is a problem', error);
  });
