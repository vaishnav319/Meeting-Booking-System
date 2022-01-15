import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { registerMentor } from '../../actions/auth';
import { getRandomColor, createImageFromInitials } from '../../utils/ProfilPic';

const RegisterMentor = ({ setAlert, registerMentor, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    password: '',
    password2: '',
    avatar: '',
  });

  let { name, email, password, subject, password2, avatar } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [avatar]: createImageFromInitials(50, name, 'sandybrown'),
    });
    if (password !== password2) {
      setAlert('Passwords do not matching', 'danger');
      //   setAlert('Passwords do not match', 'danger');
    } else {
      registerMentor({ name, email, password, subject, avatar });
      console.log('Success');
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }
  return (
    <Fragment>
      <h1 className='large text-gray-800'>Sign Up as a Mentor</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Subject'
            name='subject'
            value={subject}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='btn btn-gray-800' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account?{' '}
        <Link to='/login' className='text-gray-800'>
          Sign In
        </Link>
      </p>
    </Fragment>
  );
};

RegisterMentor.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerMentor: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, registerMentor })(
  RegisterMentor
);
// export default connect(null, { setAlert })(Register);
