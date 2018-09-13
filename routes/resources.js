'use strict';

const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');

router.get('/', (req, res, next) => {
  Resource.find({})
    .then((result) => {
      const data = {links: result};
      res.render('resources', data);
    })
  .catch(next);
});

module.exports = router;