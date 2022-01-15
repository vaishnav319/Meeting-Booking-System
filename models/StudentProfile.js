const mongoose = require('mongoose');

const StudentProfile = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
  },
  guardianName: {
    type: String,
    required: true,
  },
  guardianPhoneNumber: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  hobbies: {
    type: [String],
  },
  bio: {
    type: String,
  },
  // following: [
  //   {
  //     mentor: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true,
  //     },
  //   },
  // ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('StudentProfile', StudentProfile);
