import Cookies from 'js-cookie';
import axios from '../../utils/axios';
import {
  GET_DETAIL_TRANSACTION_PENDING,
  GET_DETAIL_TRANSACTION_SUCCESS,
  GET_DETAIL_TRANSACTION_FAILED,
  GET_LIST_TRANSACTION_PENDING,
  GET_LIST_TRANSACTION_SUCCESS,
  GET_LIST_TRANSACTION_FAILED,
} from '../types';

export const getDetailTransaction = (router, id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DETAIL_TRANSACTION_PENDING,
      payload: null,
    });

    const response = await axios({
      method: 'get',
      url: `transaction/${id}`,
    });

    dispatch({
      type: GET_DETAIL_TRANSACTION_SUCCESS,
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
      type: GET_DETAIL_TRANSACTION_FAILED,
      payload: error.message,
    });
  }
};

export const getListTransaction = (router) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_TRANSACTION_PENDING,
      payload: null,
    });

    const response = await axios({
      method: 'get',
      url: `transaction?limit=100`,
    });

    dispatch({
      type: GET_LIST_TRANSACTION_SUCCESS,
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
      type: GET_LIST_TRANSACTION_FAILED,
      payload: error.message,
    });
  }
};
