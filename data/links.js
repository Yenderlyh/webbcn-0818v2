const mongoose = require('mongoose');
require('dotenv').config();

const Resources = require('../models/resource');
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});
const links = [
  {
    title: 'Google Drive 2018 08',
    url: 'https://drive.google.com/drive/folders/1DLqFphw9XAj9xJR16v1shlNTmmDGP3I7',
    category: 'documentation'
  },
  {
    title: 'Guidelines',
    url: 'https://docs.google.com/presentation/d/1p_t34zwQQ2Z_dm-6Sd5RHGEe7jTX4GPNy-GTgV8G_yg/edit#slide=id.g3fa547b098_2_0',
    category: 'documentation'
  },
  {
    title: 'Course Overview',
    url: 'https://docs.google.com/presentation/d/1c3wM1W8wBJA4jAw9fqkw3YCud-O1ov1FATJ1l09AW5Q/edit#slide=id.g3fa547b098_2_0',
    category: 'documentation'
  },
  {
    title: 'Cheat Sheet',
    url: 'https://github.com/ironhack/bcn-webdev-cheatsheet',
    category: 'documentation'
  },
  {
    title: 'Module 1',
    url: 'https://docs.google.com/presentation/d/1gRTQr_Pbap2nV2wWvqkyaTjFOt-FcmaULiHLcpX3Ufc/edit#slide=id.g3fa547b098_2_0',
    category: 'documentation'
  }
];

Resources.create(links)
  .then((data) => {
    console.log('Data inserted');
  })
  .catch((err) => {
    console.log(err);
  })
;
