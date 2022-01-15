const mongoose = require('mongoose');
const mentorSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  subject: String,
  avatar: String,
  isMentor: { type: Boolean, default: true },

  // followers: { Object },
});
module.exports = mongoose.model('mentors', mentorSchema);
