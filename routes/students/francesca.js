'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const data = {
    layout: 'layout-student'
  };
  res.render('students/francesca/index', data);
});

router.get('/interests', (req, res, next) => {
  const data = {
    layout: 'layout-student'
  };
  res.render('students/francesca/interests', data);
});

router.get('/experiments', (req, res, next) => {
  const data = {
    layout: 'layout-student'
  };
  res.render('students/francesca/experiments', data);
});

module.exports = router;
