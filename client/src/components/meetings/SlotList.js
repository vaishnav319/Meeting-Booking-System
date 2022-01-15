import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ModifyDate from '../../utils/Date';
import { connect } from 'react-redux';
import { deleteSlot } from '../../actions/profile';
const SlotList = ({ timeSlots, deleteSlot }) => {
  const timeSlotList = timeSlots.map((slot) => (
    <tr key={slot._id}>
      <td>{slot.time}</td>
      <td className='hide-sm'>
        <ModifyDate date={slot.date} />
      </td>
      <td>
        <button
          onClick={() => {
            console.log(slot._id);
            deleteSlot(slot._id);
          }}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h1 className='my-2 text-3xl text-primary'>Time Slots details</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Time Slot</th>
            <th className='hide-sm'>updated on</th>
            <th />
          </tr>
        </thead>
        <tbody>{timeSlotList}</tbody>
      </table>
    </Fragment>
  );
};

SlotList.propTypes = {
  deleteSlot: PropTypes.func.isRequired,
};

export default connect(null, { deleteSlot })(SlotList);
