'use strict';

const express = require('express');
const uploadCloud = require('../services/cloudinary.js');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

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
  const formData = req.flash('image-form-data');
  const formErrors = req.flash('image-form-error');
  const data = {
    message: formErrors[0],
    fields: formData[0]
  };
  res.render('images-create', data);
});

router.post('/create', uploadCloud.single('photo'), (req, res, next) => {
  const { title, category } = req.body;
  if (!req.file || !title || !category) {
    req.flash('image-form-error', 'title, category and image file are mandatory');
    req.flash('image-form-data', { title, category });
    return res.redirect('/images/create');
  }
  const url = req.file.url;
  const image = new Image({ title, category, url });
  image.save()
    .then(() => {
      res.redirect('/images');
    })
    .catch(next);
});

router.post('/:imageId/delete', (req, res, next) => {
  const id = req.params.imageId;

  if (!ObjectId.isValid(id)) {
    return res.redirect('/images');
  }

  Image.remove({ _id: id })
    .then(() => {
      res.redirect('/images');
    })
    .catch(next);
});

module.exports = router;
