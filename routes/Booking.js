const express = require('express');
const students = require('../models/studentDB');
const mentors = require('../models/mentorDB');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../Middleware/AuthenticateUser');
const mentorAuth = require('../Middleware/AuthMentorUser');
const booking = require('../models/Booking');
const MentorProfile = require('../models/MentorProfile');

// @route    POST booking/meet
// @desc     Book a meet with mentor
// @access   Private
router.post('/meet/:ment_id', auth, async (req, res) => {
  const { time } = req.body;
  console.log(req.params.ment_id);
  console.log(time);
  try {
    const student = await students.findById(req.user.id);
    if (!student) {
      return res.status(400).json({ msg: 'Student doesnot exist' });
    }
    console.log(student);
    const mentor = await MentorProfile.findOne({
      user: req.params.ment_id,
    }).populate('user', ['name', 'subject']);
    if (!mentor) {
      return res.status(400).json({ msg: 'Mentor doesnot exist' });
    }
    console.log(mentor);

    let getSlot = {};
    mentor.timeSlots.filter((timeSlot) => {
      if (timeSlot.time === time) {
        console.log('time:' + timeSlot);
        getSlot = timeSlot;
      }
    });
    console.log(getSlot);
    if (getSlot.time !== undefined) {
      let updatedTimeSlots = mentor.timeSlots.filter(
        (timeSlot) => getSlot !== timeSlot
      );
      let id1 = getSlot.time.split('-');

      id1 = id1[0].split(':');
      let id2 = mentor.id.substring(0, 3);
      console.log(id2);
      let id3 = student.id.substring(0, 3);
      console.log(id3);
      let meetID = id2 + id3 + id1[0] + id1[1];
      console.log(meetID);
      const link = `https://video-chat-v2.herokuapp.com/${meetID}`;
      console.log(link);
      mentor.timeSlots = updatedTimeSlots;
      mentorDetails = {
        mentor: req.params.ment_id,
        name: mentor.user.name,
        subject: mentor.user.subject,
      };
      const newMeet = new booking({
        user: req.user.id,
        name: student.name,
        time: time,
        meetingLink: link,
        mentor: req.params.ment_id,
        bookedWith: mentorDetails,
      });
      await newMeet.save();
      let addId = {
        time: getSlot.time,
        meetId: newMeet.id,
      };
      mentor.bookedSlots.unshift(addId);
      await mentor.save();
      res.json(mentor);
    } else {
      return res.status(401).json({ msg: 'Choose a different time' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route    GET booking/meets/student
// @desc     Get current student meetings
// @access   Private
router.get('/meets', auth, async (req, res) => {
  console.log(req.user);
  let bookings = {};

  bookings = await booking.find({ user: req.user.id });

  if (!bookings) {
    return res.status(400).json({ msg: 'No Meetings ' });
  }
  res.json(bookings);
});
// @route    GET booking/meets/mentor
// @desc     Get current mentor meetings
// @access   Private
router.get('/meets/mentor', [auth, mentorAuth], async (req, res) => {
  const bookings = await booking.find({ mentor: req.user.id });
  if (!bookings) {
    return res.status(400).json({ msg: 'No Meetings ' });
  }
  res.json(bookings);
});

// @route    DELETE booking/meets
// @desc     delete a meeting by mentor
// @access   Private
router.delete('/meets/:meet_id', [auth, mentorAuth], async (req, res) => {
  const bookings = await booking.findById(req.params.meet_id);

  if (bookings.bookedWith.mentor.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
  }
  const mentor = await MentorProfile.findOne({
    user: bookings.bookedWith.mentor,
  });
  if (!mentor) {
    return res.status(400).json({ msg: 'Mentor doesnot exist' });
  }
  let getSlot = {};
  mentor.bookedSlots.filter((bookedSlot) => {
    if (bookedSlot.time === bookings.time) {
      getSlot = bookedSlot;
    }
  });
  console.log(getSlot);
  updatedBookedSlots = mentor.bookedSlots.filter((bookedSlot) => {
    getSlot.id !== bookedSlot.id;
  });
  if (getSlot.date !== undefined) {
    mentor.bookedSlots = updatedBookedSlots;
    currentDate = new Date().toLocaleString().split('/');
    meetDate = getSlot.date.toLocaleString().split('/');
    currentDate = parseInt(currentDate[0]);
    meetDate = parseInt(meetDate[0]);
    if (currentDate <= meetDate) {
      getSlot = {
        time: getSlot.time,
      };
      mentor.timeSlots.unshift(getSlot);
      await mentor.save();
      bookings.remove();
    }
  }
  console.log(getSlot);

  res.json(mentor);
});

module.exports = router;
