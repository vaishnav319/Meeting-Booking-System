import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const DashboardActions = ({
  auth: {
    user: { isMentor },
  },
}) => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      {isMentor && (
        <Link to='/add-experience' className='btn btn-light'>
          <i className='fab fa-black-tie text-primary'></i> Add Experience
        </Link>
      )}
      {!isMentor && (
        <Link to='/add-education' className='btn btn-light'>
          <i className='fas fa-graduation-cap text-primary'></i> Add Education
        </Link>
      )}
      {isMentor && (
        <Link to='/add-slots' className='btn btn-light'>
          <i className='fas fa-clock text-primary'></i> Add Slots
        </Link>
      )}
    </div>
  );
};

DashboardActions.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateProps, {})(DashboardActions);
