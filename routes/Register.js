const express = require("express");
const students = require("../models/studentDB");
const mentors = require("../models/mentorDB");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");

// @route    POST /register/student
// @desc     Register Student
// @access   Public
router.post(
  "/student",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, avatar } = req.body;
    try {
      let user = await students.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      user = new students({
        name,
        email,
        password,
        avatar,
      });
      console.log(user);
      //encrypting the user password before saving to the database
      const salt = await bcrypt.genSalt(10);
      const HashedPassword = await bcrypt.hash(user.password, salt);

      // reassigning the hashed password in the place of the password
      user.password = HashedPassword;

      //save into the database
      await user.save();
      const payload = {
        user: {
          id: user.id,
          role: "student",
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST /register/mentor
// @desc     Register mentor
// @access   Public
router.post(
  "/mentor",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  check("subject", "Subject is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, location, subject, phoneNumber, avatar } =
      req.body;
    try {
      let mentor = await mentors.findOne({ email });
      if (mentor) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Mentor already exists" }] });
      }
      mentor = new mentors({
        name,
        email,
        password,
        location,
        phoneNumber,
        subject,
        avatar,
      });
      console.log(mentor);
      //encrypting the user password before saving to the database
      const salt = await bcrypt.genSalt(10);
      const HashedPassword = await bcrypt.hash(mentor.password, salt);

      // reassigning the hashed password in the place of the password
      mentor.password = HashedPassword;

      //save into the database
      await mentor.save();
      const payload = {
        user: {
          id: mentor.id,
          role: "mentor",
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
