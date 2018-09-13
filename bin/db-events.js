'use strict';

const mongoose = require('mongoose');

const Event = ('./models/events.js');

const data = [{
  name: 'Ironbeers',
  type: 'Party',
  date: '2018-09-14'
}, {
  name: 'BBQ',
  type: 'Party',
  date: '2018-08-31'
}, {
  name: 'Game Show',
  type: 'Presentation',
  date: '2018-09-07'
}, {
  name: 'UX-UI',
  type: 'Talk',
  date: '2018-09-12'
}];

mongoose.connect('mongodb://localhost/webbcn0818v2')
  .then(() => {
    console.log('Connected to Mongo!');
    return Event.remove({});
  })
  .then(() => {
    return Event.insertMany(data);
  })
  .then((results) => {
    console.log('You have some events', results.length);
  })
  .catch(() => {
    console.log('There is a problem');
  });
