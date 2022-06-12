import { combineReducers } from 'redux';
import detailUser from './detailUser';
import listUser from './listUser';
import listStore from './listStore';
import listBrand from './listBrand';
import detailBrand from './detailBrand';
import listCategory from './listCategory';
import detailCategory from './detailCategory';
import listProduct from './listProduct';
import detailProduct from './detailProduct';
import listTransaction from './listTransaction';
import detailTransaction from './detailTransaction';

export default combineReducers({
  detailUser,
  listUser,
  listStore,
  listBrand,
  detailBrand,
  listCategory,
  detailCategory,
  listProduct,
  detailProduct,
  listTransaction,
  detailTransaction,
});
