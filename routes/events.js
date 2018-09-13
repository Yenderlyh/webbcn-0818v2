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

module.exports = router;
