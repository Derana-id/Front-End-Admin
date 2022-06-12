import Cookies from 'js-cookie';
import axios from '../../utils/axios';
import {
  GET_DETAIL_CATEGORY_PENDING,
  GET_DETAIL_CATEGORY_SUCCESS,
  GET_DETAIL_CATEGORY_FAILED,
  GET_LIST_CATEGORY_PENDING,
  GET_LIST_CATEGORY_SUCESS,
  GET_LIST_CATEGORY_FAILED,
} from '../types';

export const getDetailCategory = (router, id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DETAIL_CATEGORY_PENDING,
      payload: null,
    });

    const response = await axios({
      method: 'get',
      url: `category/${id}`,
    });

    dispatch({
      type: GET_DETAIL_CATEGORY_SUCCESS,
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
      type: GET_DETAIL_CATEGORY_FAILED,
      payload: error.message,
    });
  }
};

export const getListCategory = (router) => async (dispatch) => {
  try {
    dispatch({
      type: GET_LIST_CATEGORY_PENDING,
      payload: null,
    });

    const response = await axios({
      method: 'get',
      url: `category?limit=100`,
    });

    dispatch({
      type: GET_LIST_CATEGORY_SUCESS,
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
      type: GET_LIST_CATEGORY_FAILED,
      payload: error.message,
    });
  }
};

export const addCategory = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('category', data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const editCategory = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`category/${id}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteCategory = (data, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`category/delete/${id}`, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
