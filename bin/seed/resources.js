require('dotenv').config();

const mongoose = require('mongoose');

const Resources = require('../../models/resource');

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const data = require('../../data/resources');

Resources.remove({})
  .then(() => {
    return Resources.create(data);
  })
  .then((data) => {
    console.log('Data inserted');
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
