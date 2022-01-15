const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
});

module.exports = mongoose.model('students', studentSchema);
