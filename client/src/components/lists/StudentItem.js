import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getRandomColor, createImageFromInitials } from '../../utils/ProfilPic';

const StudentItem = ({
  profile: {
    user: { _id, name, avatar },
    guardianName,
    guardianPhoneNumber,
    location,
    skills,
    hobbies,
  },
}) => {
  return (
    <div className='shadow-2xl rounded-tr-3xl rounded-bl-3xl m-10 lg:p-16 md:p-5 p-5  flex flex-wrap justify-between'>
      <div className='p-1 max-w-xxl'>
        <img
          className='w-full h-full rounded-2xl object-center object-cover ml-5'
          style={{ width: '10rem' }}
          src={
            avatar ? avatar : createImageFromInitials(250, name, 'sandybrown')
          }
        />
      </div>
      <div>
        <h2>
          <span className='font-semibold'>Name:</span> {name}
        </h2>
        <p>
          <span className='font-semibold'>
            {guardianName ? 'Guardian Name :' : ''}
          </span>
          {guardianName ? guardianName : ''}
        </p>
        <p>
          <span className='font-semibold'>
            {guardianPhoneNumber ? 'Guardian Phone Number :' : ''}
          </span>
          {guardianPhoneNumber ? guardianPhoneNumber : ''}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/student-profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <div className='hidden lg:block'>
        <span className='font-semibold'>
          {skills.length !== 0 ? 'Skills :' : ''}
        </span>
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className='text-gray-800'>
              <i className='fas fa-check' /> {skill}
            </li>
          ))}
        </ul>

        <ul className='mt-10'>
          <span className='font-semibold'>
            {hobbies.length !== 0 ? 'Hobbies :' : ''}
          </span>
          {hobbies.slice(0, 4).map((skill, index) => (
            <li key={index} className='text-gray-800'>
              <i className='fas fa-check' /> {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

StudentItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default StudentItem;
