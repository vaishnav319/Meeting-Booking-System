import axios from 'axios';
import { setAlert } from './alert';

import { GET_MEETINGS, MEET_ERROR, DELETE_MEET, BOOK_MEET } from './types';

//get logged in user meetings
export const getMeetings = () => async (dispatch) => {
  try {
    const res = await axios.get('/bookmeet/meets');

    dispatch({
      type: GET_MEETINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//get logged in user meetings
export const getMentorMeets = () => async (dispatch) => {
  try {
    const res = await axios.get('/bookmeet/meets/mentor');

    dispatch({
      type: GET_MEETINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//book a meet
export const bookMeet = (ment_id, time) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`/bookMeet/meet/${ment_id}`, time, config);
    dispatch({
      type: BOOK_MEET,
      dispatch: res.data,
    });
    dispatch(setAlert('Meeting Booked', 'success'));
  } catch (err) {
    dispatch({
      type: MEET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// delete a meet by mentor
export const deleteMeet = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/bookmeet/meets/${id}`);
    dispatch({
      type: DELETE_MEET,
      payload: id,
    });
    dispatch(setAlert('Meeting cancelled', 'success'));
  } catch (err) {
    dispatch({
      type: MEET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
