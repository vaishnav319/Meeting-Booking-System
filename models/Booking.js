const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, //student
  },
  name: {
    type: String, //student name
  },
  time: {
    type: String,
  },
  meetingLink: {
    type: String,
  },
  mentor: {
    type: Schema.Types.ObjectId, //mentor
  },
  bookedWith: {
    mentor: {
      type: Schema.Types.ObjectId, //mentor
    },
    name: {
      type: String, //mentor name
    },
    subject: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('booking', BookingSchema);
