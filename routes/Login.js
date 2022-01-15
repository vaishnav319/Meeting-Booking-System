const express = require('express');
const students = require('../models/studentDB');
const mentors = require('../models/mentorDB');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../Middleware/AuthenticateUser');
const mentorauth = require('../Middleware/AuthMentorUser');

// @route    GET login/auth
// @desc     Get user by token
// @access   Private
router.get('/auth', auth, async (req, res) => {
  try {
    let user = {};
    if (req.user.role.toLowerCase() === 'mentor') {
      user = await mentors.findById(req.user.id).select('-password');
    } else {
      user = await students.findById(req.user.id).select('-password');
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let student = await students.findOne({ email });
      let mentor = await mentors.findOne({ email });

      if (!student && !mentor) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      student ? (user = student) : (user = mentor);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const payload = {
        user: {
          id: user.id,
          role: student ? 'student' : 'mentor',
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
