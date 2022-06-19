import Cookies from 'js-cookie';
import axios from '../../utils/axios';
import {
  GET_DETAIL_PRODUCT_PENDING,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT_FAILED,
  GET_LIST_PRODUCT_PENDING,
  GET_LIST_PRODUCT_SUCCESS,
  GET_LIST_PRODUCT_FAILED,
} from '../types';

export const getDetailProduct = (router, id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DETAIL_PRODUCT_PENDING,
      payload: null,
    });

    const response = await axios({
      method: 'get',
      url: `product/${id}`,
    });

    dispatch({
      type: GET_DETAIL_PRODUCT_SUCCESS,
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
      type: GET_DETAIL_PRODUCT_FAILED,
      payload: error.message,
    });
  }
};

export const getListProduct = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_PRODUCT_PENDING,
      payload: null,
    });

    const response = await axios({
      method: 'get',
      url: `product`,
    });

    dispatch({
      type: GET_LIST_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      error.message = error.response.data.error;
    }
    dispatch({
      type: GET_LIST_PRODUCT_FAILED,
      payload: error.message,
    });
  }
};
