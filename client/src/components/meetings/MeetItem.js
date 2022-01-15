import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteMeet } from '../../actions/meeting';
import ModifyDate from '../../utils/Date';
const Education = ({
  deleteMeet,
  meet,
  auth: {
    user: { isMentor },
  },
}) => {
  return (
    <Fragment>
      <tr key={meet._id}>
        <td>{isMentor ? meet.name : meet.bookedWith.name}</td>
        <td className='hide-sm'>{meet.bookedWith.subject}</td>
        <td>{meet.time}</td>

        <td>
          <ModifyDate date={meet.date} />
        </td>
        <td className='hide-sm'>
          <a target='_blank' className='text-blue-400' href={meet.meetingLink}>
            MeetLink
          </a>
        </td>

        <td>
          {isMentor ? (
            <button
              onClick={() => deleteMeet(meet._id)}
              className='btn btn-danger'
            >
              Cancel Meeting
            </button>
          ) : (
            ''
          )}
        </td>
      </tr>
    </Fragment>
  );
};

Education.propTypes = {
  deleteMeet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteMeet })(Education);
