'use strict';

const mongoose = require('mongoose');
const data = require('../../data/events.js');

const Event = ('./models/events.js');

mongoose.connect('mongodb://localhost/webbcn0818v2')
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
  .catch(() => {
    console.log('There is a problem');
  });
