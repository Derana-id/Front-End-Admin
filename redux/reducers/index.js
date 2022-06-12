import { combineReducers } from 'redux';
import detailUser from './detailUser';
import listUser from './listUser';
import listStore from './listStore';
import listBrand from './listBrand';
import detailBrand from './detailBrand';
import listCategory from './listCategory';
import detailCategory from './detailCategory';

export default combineReducers({
  detailUser,
  listUser,
  listStore,
  listBrand,
  detailBrand,
  listCategory,
  detailCategory,
});
