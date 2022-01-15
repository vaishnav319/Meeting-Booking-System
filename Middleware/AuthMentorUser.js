const mentors = require('../models/mentorDB');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        user = decoded.user;
        if (user.role !== 'mentor') {
          return res
            .status(401)
            .json({ msg: 'You are not a mentor,you cannot access this!' });
        } else {
          next();
        }
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};

// if (error) {
//     return res.status(401).json({ msg: 'Token is not valid' });
//   } else {
//     console.log('Hi2');
//     user = decoded.user;
//     console.log(user);
//     const foundMentor = mentors.findById(user.id);
//     if (!foundMentor) {
//       return res
//         .status(401)
//         .json({ msg: 'You are not a mentor,you cannot access this!' });
//     } else {
//       next();
//     }
//   }
