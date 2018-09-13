'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const data = require('../../data/events.js');

const Event = require('../../models/events.js');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to Mongo!');
    return Event.remove({});
  })
  .then((result) => {
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
