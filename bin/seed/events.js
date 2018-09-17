'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const data = require('../../data/events.js');
const Event = require('../../models/events.js');

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
