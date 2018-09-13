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
    enum: ['Party', 'Presentation', 'Talk']
  },
  date: {
    type: Date,
    required: true
  }
});

const Event = mongoose.model('Events', eventsSchema);

module.exports = Event;
