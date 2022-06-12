import Cookies from 'js-cookie';
import axios from '../../utils/axios';
import {
  GET_LIST_STORE_PENDING,
  GET_LIST_STORE_SUCCESS,
  GET_LIST_STORE_FAILED,
} from '../types';

export const getListStore = (router) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_STORE_PENDING,
      payload: null,
    });

    const response = await axios({
      method: 'get',
      url: `store`,
    });

    dispatch({
      type: GET_LIST_STORE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        Cookies.remove('token');
        router.push('/auth/login');
      }

      error.message = error.response.data.error;
    }
    dispatch({
      type: GET_LIST_STORE_FAILED,
      payload: error.message,
    });
  }
};
