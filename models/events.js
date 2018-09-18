const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['party', 'presentation', 'talk']
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String
  }
});

const Event = mongoose.model('Events', eventsSchema);

module.exports = Event;
