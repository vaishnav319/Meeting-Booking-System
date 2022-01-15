const mongoose = require('mongoose');

const MentorProfile = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mentors',
  },
  phoneNumber: {
    type: Number,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  timeSlots: [
    {
      time: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  bookedSlots: [
    {
      time: String,
      date: {
        type: Date,
        default: Date.now,
      },
      meetId: mongoose.Schema.Types.ObjectId,
    },
  ],

  // bookings: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true,
  //     },
  //     name: {
  //       type: String,
  //     },
  //     time: {
  //       type: String,
  //       required: true,
  //     },
  //     date: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
  experience: [
    {
      position: {
        type: String,
        required: true,
      },
      institution: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      subject: {
        type: String,
        required: true,
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

module.exports = mongoose.model('MentorProfile', MentorProfile);
