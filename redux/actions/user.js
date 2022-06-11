import Cookies from 'js-cookie';
import axios from '../../utils/axios';
import {
  GET_DETAIL_USER_PENDING,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_FAILED,
} from '../types';

export const getDetailUser = (router, id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DETAIL_USER_PENDING,
      payload: null,
    });

    const response = await axios({
      method: 'get',
      url: `user/${id}`,
    });

    dispatch({
      type: GET_DETAIL_USER_SUCCESS,
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
      type: GET_DETAIL_USER_FAILED,
      payload: error.message,
    });
  }
};
