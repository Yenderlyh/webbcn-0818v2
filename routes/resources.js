'use strict';

const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res, next) => {
  Resource.find({}).sort({ category: 1 })
    .then((result) => {
      const data = { resources: result };
      res.render('resources', data);
    })
    .catch(next);
});

router.get('/create', (req, res, next) => {
  const formData = req.flash('resources-form-data');
  const formErrors = req.flash('resources-form-error');
  const data = {
    message: formErrors[0],
    fields: formData[0]
  };
  res.render('resources-create', data);
});

router.post('/create', (req, res, next) => {
  console.log(req.body);

  const { title, url, category } = req.body;
  if (!title || !url || !category) {
    req.flash('resources-form-error', 'Title, url and category are mandatory');
    req.flash('resources-form-data', { title, url, category });
    return res.redirect('/resources/create');
  }
  const resource = new Resource({ title, category, url });
  resource.save()
    .then(() => {
      res.redirect('/resources');
    })
    .catch(next);
});

router.post('/:resourceId/delete', (req, res, next) => {
  const id = req.params.resourceId;

  if (!ObjectId.isValid(id)) {
    return res.redirect('/resources');
  }

  Resource.remove({ _id: id })
    .then(() => {
      res.redirect('/resources');
    })
    .catch(next);
});

module.exports = router;
