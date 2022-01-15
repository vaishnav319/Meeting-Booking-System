import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  createProfile,
  getCurrentProfile,
  createMentorProfile,
} from '../../actions/profile';
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  createMentorProfile,
  getCurrentProfile,
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

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      hobbies: loading || !profile.hobbies ? '' : profile.hobbies.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      phoneNumber: loading || profile.phoneNumber ? '' : profile.phoneNumber,
      guardianName:
        loading || !profile.guardianName ? '' : profile.guardianName,
      guardianPhoneNumber:
        loading || !profile.guardianPhoneNumber
          ? ''
          : profile.guardianPhoneNumber,
    });
  }, [loading, getCurrentProfile]);

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
      ? createMentorProfile(formData, history, true)
      : createProfile(formData, history, true);
  };
  return (
    <div>
      <h1 className='large text-primary'>Edit Your Profile</h1>
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  createMentorProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  createMentorProfile,
})(withRouter(EditProfile));
