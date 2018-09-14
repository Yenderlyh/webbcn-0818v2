'use strict';

const express = require('express');
const router = express.Router();

const axel = require('./axel');
const barbara = require('./barbara');
const caroline = require('./caroline');
const diana = require('./diana');
const francesca = require('./francesca');
const gabriela = require('./gabriela');
const jonathan = require('./jonathan');
const mariaJose = require('./maria-jose');
const yenderly = require('./yenderly');

router.use('/axel', axel);
router.use('/barbara', barbara);
router.use('/caroline', caroline);
router.use('/diana', diana);
router.use('/francesca', francesca);
router.use('/gabriela', gabriela);
router.use('/jonathan', jonathan);
router.use('/maria-jose', mariaJose);
router.use('/yenderly', yenderly);

module.exports = router;
