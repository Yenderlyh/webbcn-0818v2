'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({})
    .then((result) => {
      const data = {students: result};
      res.render('index', data);
    })
    .catch(next);
});

module.exports = router;
