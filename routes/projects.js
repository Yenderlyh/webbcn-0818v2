'use strict';

const express = require('express');
const router = express.Router();

const Project = require('../models/project');

router.get('/', (req, res, next) => {
  Project.find({})
    .then((results) => {
      const data = {
        projects: results
      };
      res.render('projects', data);
    })
    .catch((error) => {
      console.log('there has been an error', error);
    });
});

module.exports = router;
