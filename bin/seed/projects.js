'use strict';

require('dotenv').config();

// const dotenv = require('dotenv');
// const result = dotenv.config();

// if (result.error) {
//   throw result.error;
// }

// console.log(result.parsed);

const mongoose = require('mongoose');

const Project = require('../../models/project');

const projects = require('../../data/projects');

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    return Project.remove({});
  })
  .then(() => {
    return Project.insertMany(projects);
  })
  .then((result) => {
    console.log('successfully added to database', result);
    mongoose.connection.close();
  })

  .catch((error) => {
    console.log('there has been an error', error);
  });
