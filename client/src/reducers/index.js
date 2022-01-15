import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import meeting from './meeting';
export default combineReducers({
  alert,
  auth,
  profile,
  meeting,
});
