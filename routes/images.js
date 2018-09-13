'use strict';

const express = require('express');
const uploadCloud = require('../services/cloudinary.js');
const router = express.Router();
const Image = require('../models/image');

router.get('/', (req, res, next) => {
  Image.find({})
    .then((result) => {
      const data = { images: result };

      res.render('images-list', data);
    })
    .catch(next);
});

router.get('/create', (req, res, next) => {
  res.render('images-create');
});

router.post('/create', uploadCloud.single('photo'), (req, res, next) => {
  const { title, category } = req.body;
  const url = req.file.url;
  const image = new Image({ title, category, url });
  image.save()
    .then(movie => {
      res.redirect('/images');
    })
    .catch(next);
});

module.exports = router;
