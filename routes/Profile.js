const express = require('express');
const students = require('../models/studentDB');
const mentors = require('../models/mentorDB');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../Middleware/AuthenticateUser');
const mentorAuth = require('../Middleware/AuthMentorUser');
const StudentProfile = require('../models/StudentProfile');
const MentorProfile = require('../models/MentorProfile');

// @route    GET profile/students
// @desc     Get all students names
// @access   Public

router.get('/studentDetails', async (req, res) => {
  try {
    const studentDetails = await students.find().select('-password');
    res.json(studentDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET profile/mentors
// @desc     Get all mentors
// @access   Public

router.get('/mentorDetails', async (req, res) => {
  try {
    const mentorsDetails = await mentors.find().select('-password');
    res.json(mentorsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET profile/me
// @desc     Get current user profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  let profile = {};
  try {
    if (req.user.role.toLowerCase() === 'mentor') {
      profile = await MentorProfile.findOne({
        user: req.user.id,
      }).populate('user', ['name', 'subject', 'timeSlots', 'bookedSlots']);
    } else {
      profile = await StudentProfile.findOne({
        user: req.user.id,
      }).populate('user', ['name']);
    }

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST profile/student
// @desc     Create or update student profile
// @access   Private
router.post(
  '/student',
  auth,
  check('guardianPhoneNumber', 'Phone Number is required').not().isEmpty(),
  check('skills', 'Skills are required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      guardianName,
      guardianPhoneNumber,
      skills,
      location,
      hobbies,
      bio,
    } = req.body;

    // build a profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if (guardianName) profileFields.guardianName = guardianName;
    if (guardianPhoneNumber)
      profileFields.guardianPhoneNumber = guardianPhoneNumber;
    if (location) profileFields.location = location;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    if (hobbies) {
      profileFields.hobbies = hobbies.split(',').map((hobbie) => hobbie.trim());
    }
    if (bio) profileFields.bio = bio;

    try {
      let profile = await StudentProfile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await StudentProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      profile = new StudentProfile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    POST profile/mentor
// @desc     Create or update mentor profile
// @access   Private
router.post(
  '/mentor',
  [auth, mentorAuth],
  check('phoneNumber', 'Phone Number is required').not().isEmpty(),
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills are required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const { skills, phoneNumber, location, status, bio } = req.body;

    // build a profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if (phoneNumber) profileFields.phoneNumber = phoneNumber;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    try {
      let profile = await MentorProfile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await MentorProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      profile = new MentorProfile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    POST profile/slots
// @desc     Add Slots
// @access   Private
router.post('/slots', [auth], async (req, res) => {
  const { time } = req.body;
  console.log(time);
  let foundSlot = {};
  try {
    const mentor = await MentorProfile.findOne({ user: req.user.id });
    mentor.timeSlots.filter((timeSlot) => {
      if (timeSlot.time === time) {
        foundSlot = timeSlot;
      }
    });
    if (foundSlot.time !== undefined) {
      return res.status(400).json({ msg: 'Slot is already in profile' });
    }
    if (time !== undefined && foundSlot.time === undefined) {
      mentor.timeSlots.unshift(req.body);
      await mentor.save();
      return res.status(400).json(mentor);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    GET profile/slots
// @desc     GET mentor slots
// @access   Private
router.post('/user-slots', auth, async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    Delete profile/slots
// @desc     Delete a slot
// @access   Private
router.delete('/slots/:id', [auth, mentorAuth], async (req, res) => {
  try {
    const mentor = await MentorProfile.findOne({ user: req.user.id });
    mentor.timeSlots = mentor.timeSlots.filter(
      (timeSlot) => timeSlot.id !== req.params.id
    );
    await mentor.save();
    res.json(mentor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE profile/
// @desc     Delete profile, user
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    if (req.user.role.toLowerCase() === 'mentor') {
      await mentors.findOneAndRemove({ _id: req.user.id });
      await MentorProfile.findOneAndRemove({ user: req.user.id });
      res.json({ msg: 'Mentor deleted' });
    } else {
      await students.findOneAndRemove({ _id: req.user.id });
      await StudentProfile.findOneAndRemove({ user: req.user.id });

      res.json({ msg: 'Student deleted' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  check(
    'from',
    'From date is required and needs to be from the past'
  ).notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newExp = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await StudentProfile.findOne({
        user: req.user.id,
      }).populate('user', ['name']);

      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  '/experience',
  [auth, mentorAuth],
  check('position', 'Position is required').notEmpty(),
  check('institution', 'Institution is required').notEmpty(),
  check('subject', 'subject is required').notEmpty(),
  check(
    'from',
    'From date is required and needs to be from the past'
  ).notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      position,
      institution,
      subject,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      position,
      institution,
      subject,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await MentorProfile.findOne({ user: req.user.id });

      profile.experience.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route    DELETE profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:id', auth, async (req, res) => {
  try {
    const foundProfile = await StudentProfile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.id
    );
    await foundProfile.save();

    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});
// @route    DELETE profile/experience/:id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:id', auth, async (req, res) => {
  try {
    const foundProfile = await MentorProfile.findOne({ user: req.user.id });
    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.id
    );
    await foundProfile.save();

    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET profile/students
// @desc     Get all student profiles
// @access   Public
router.get('/students', async (req, res) => {
  try {
    profile = await StudentProfile.find().populate('user', ['name']);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET profile/mentors
// @desc     Get all Mentor profiles
// @access   Public
router.get('/mentors', async (req, res) => {
  try {
    const profiles = await MentorProfile.find().populate('user', [
      'name',
      'subject',
      'timeSlots',
      'bookedSlots',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET profile/mentor/:mentor_id
// @desc     Get profile by mentor ID
// @access   Public
router.get('/mentor/:mentor_id', async (req, res) => {
  try {
    const profile = await MentorProfile.findOne({
      user: req.params.mentor_id,
    }).populate('user', ['name', 'subject', 'timeSlots', 'bookedSlots']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    return res.status(500).json({ msg: 'Server error' });
  }
});
// @route    GET profile/student/:student_id
// @desc     Get profile by student ID
// @access   Public
router.get('/student/:student_id', async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({
      user: req.params.student_id,
    }).populate('user', ['name', 'email']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
