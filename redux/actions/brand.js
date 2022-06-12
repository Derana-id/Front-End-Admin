import Cookies from 'js-cookie';
import axios from '../../utils/axios';
import {
  GET_DETAIL_BRAND_PENDING,
  GET_DETAIL_BRAND_SUCCESS,
  GET_DETAIL_BRAND_FAILED,
  GET_LIST_BRAND_PENDING,
  GET_LIST_BRAND_SUCCESS,
  GET_LIST_BRAND_FAILED,
} from '../types';

export const getDetailBrand = (router, id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DETAIL_BRAND_PENDING,
      payload: null,
    });

    const response = await axios({
      method: 'get',
      url: `brand/${id}`,
    });

    dispatch({
      type: GET_DETAIL_BRAND_SUCCESS,
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
      type: GET_DETAIL_BRAND_FAILED,
      payload: error.message,
    });
  }
};

export const getListBrand = (router) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_BRAND_PENDING,
      payload: null,
    });

    const response = await axios({
      method: 'get',
      url: `brand?limit=100`,
    });

    dispatch({
      type: GET_LIST_BRAND_SUCCESS,
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
      type: GET_LIST_BRAND_FAILED,
      payload: error.message,
    });
  }
};

export const addBrand = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('brand', data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const editBrand = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`brand/${id}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteBrand = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`brand/delete/${id}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
