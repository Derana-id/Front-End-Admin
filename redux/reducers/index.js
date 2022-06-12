import { combineReducers } from 'redux';
import detailUser from './detailUser';
import listUser from './listUser';
import listStore from './listStore';

export default combineReducers({
  detailUser,
  listUser,
  listStore,
});
