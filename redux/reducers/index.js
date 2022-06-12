import { combineReducers } from 'redux';
import detailUser from './detailUser';
import listUser from './listUser';

export default combineReducers({
  detailUser,
  listUser,
});
