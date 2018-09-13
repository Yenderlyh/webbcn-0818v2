'use strict';

const express = require('express');
const router = express.Router();

const Event = require('../models/events');

router.get('/', (req, res, next) => {
  Event.find({})
    .then((results) => {
      const data = {
        events: results
      };
      res.render('events', data);
    })
    .catch(next);
});

router.get('/create', (req, res, next) => {
  const formData = req.flash('event-form-data');
  const formErrors = req.flash('event-form-error');
  const data = {
    message: formErrors[0],
    fields: formData[0]
  };
  res.render('events-create', data);
});

router.post('/create', (req, res, next) => {
  const { date, name, type } = req.body;
  if (!date || !name || !type) {
    req.flash('event-form-error', 'name, event type and date are mandatory');
    req.flash('event-form-data', { date, name, type });
    return res.redirect('/events/create');
  }

  const event = new Event({ date, name, type });
  event.save()
    .then(movie => {
      res.redirect('/events');
    })
    .catch(next);
});

module.exports = router;
