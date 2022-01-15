import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTimeSlot } from '../../actions/profile';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import SlotList from '../../components/meetings/SlotList';
import { setAlert } from '../../actions/alert';
const Slots = ({
  addTimeSlot,
  getCurrentProfile,
  auth: {
    user: { name, subject },
  },
  profile: { profile, loading },
}) => {
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [formData, setFormData] = useState({
    time: '',
  });
  const [exactTime, setExactTime] = useState('');
  const submitHandler = (e) => {
    setExactTime(fromTime + ' - ' + toTime);
    console.log(exactTime);
    setExactTime(fromTime + ' - ' + toTime);
    setFormData({ time: exactTime });
    console.log('form data');
    console.log(formData);
    !setFormData
      ? setAlert('Please allot time in their respective fields', 'danger')
      : addTimeSlot(formData);
  };
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const { time } = formData;
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className='post-form'>
      <h1 className='large text-primary'>
        Add or Delete your Slots mentor {name}
      </h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Add your slots for today so students can
        book meetings
      </p>
      <form className='form my-1' onSubmit={submitHandler}>
        <div className='form-group'>
          <h4>From Time</h4>
          <input
            type='time'
            value={fromTime}
            name='fromTime'
            className='form-control'
            onChange={(e) => {
              console.log(e.target.value);
              setFromTime(e.target.value);
              setFormData({ time: fromTime + ' - ' + toTime });
            }}
          />
        </div>
        <div className='form-group'>
          <h4>End Time</h4>
          <input
            type='time'
            value={toTime}
            name='toTime'
            className='form-control'
            onChange={(e) => {
              console.log(e.target.value);
              setToTime(e.target.value);
              setFormData({ time: fromTime + ' - ' + toTime });
            }}
          />
        </div>

        <input
          type='submit'
          className='btn btn-primary my-1'
          value='Add Slot'
        />
      </form>
      <SlotList timeSlots={profile.timeSlots} />
    </div>
  );
};

Slots.propTypes = {
  addTimeSlot: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addTimeSlot,
  getCurrentProfile,
})(Slots);
