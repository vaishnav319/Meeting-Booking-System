import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, createMentorProfile } from '../../actions/profile';
const CreateProfile = ({
  createProfile,
  createMentorProfile,
  history,
  auth: {
    user: { isMentor },
  },
}) => {
  const [formData, setFormData] = useState({
    guardianName: '',
    guardianPhoneNumber: '',
    phoneNumber: '',
    location: '',
    status: '',
    skills: '',
    hobbies: '',
    bio: '',
  });

  const {
    guardianName,
    guardianPhoneNumber,
    phoneNumber,
    location,
    skills,
    status,
    hobbies,
    bio,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    isMentor
      ? createMentorProfile(formData, history)
      : createProfile(formData, history);
  };
  return (
    <div>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        {!isMentor && (
          <div className='form-group'>
            <input
              type='text'
              placeholder='Guardian Name'
              name='guardianName'
              value={guardianName}
              onChange={onChange}
            />
            <small className='form-text'>
              Could be your parent or local Guardian
            </small>
          </div>
        )}
        {!isMentor && (
          <div className='form-group'>
            <input
              type='text'
              placeholder='Guardian Phone Number'
              name='guardianPhoneNumber'
              value={guardianPhoneNumber}
              onChange={onChange}
            />
          </div>
        )}
        {isMentor && (
          <div className='form-group'>
            <input
              type='text'
              placeholder='Phone Number'
              name='phoneNumber'
              value={phoneNumber}
              onChange={onChange}
            />
          </div>
        )}
        {isMentor && (
          <div className='form-group'>
            <input
              type='text'
              placeholder='Status'
              name='status'
              value={status}
              onChange={onChange}
            />
          </div>
        )}

        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={onChange}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={onChange}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        {!isMentor && (
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Hobbies'
              name='hobbies'
              value={hobbies}
              onChange={onChange}
            />
            <small className='form-text'>
              Please use comma separated values (eg. Playing,Listening,...)
            </small>
          </div>
        )}
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={onChange}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  createMentorProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { createMentorProfile, createProfile })(
  withRouter(CreateProfile)
);
