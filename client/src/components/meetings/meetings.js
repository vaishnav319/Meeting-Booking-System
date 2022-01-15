import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMeetings, getMentorMeets } from '../../actions/meeting';
import MeetItem from './MeetItem';
import Spinner from '../layout/Spinner';

const Meetings = ({
  getMeetings,
  meeting: { meetings, loading },
  auth: {
    user: { isMentor },
  },
}) => {
  useEffect(() => {
    !isMentor ? getMeetings() : getMentorMeets();
  }, [getMeetings]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Meetings</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <div className='posts'>
        <h2 className='my-2'>Meetings Details</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>{isMentor ? 'Student' : 'Mentor'}</th>
              <th className='hide-sm'>Subject</th>
              <th className='hide-sm'>Meeting Time</th>
              <th className='hide-sm'>Meeting Date</th>
              <th className='hide-sm'>Meeting Link</th>
              <th />
            </tr>
          </thead>
          {meetings.length > 0 ? (
            <tbody>
              {meetings.map((meet) => (
                <MeetItem key={meet._id} meet={meet} />
              ))}
            </tbody>
          ) : (
            <p className='text-center p-2 text-red-600'>
              No meetings are booked currently
              <br />
              you can book your meeting headers
              <br />
              <Link to='/mentors' className='btn btn-primary mt-2'>
                <i className='fas fa-chalkboard-teacher'></i> Mentors list
              </Link>
            </p>
          )}
        </table>
      </div>
    </Fragment>
  );
};

Meetings.propTypes = {
  getMeetings: PropTypes.func.isRequired,
  meeting: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  meeting: state.meeting,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMeetings })(Meetings);
