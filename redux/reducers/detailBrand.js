import {
  GET_DETAIL_BRAND_PENDING,
  GET_DETAIL_BRAND_SUCCESS,
  GET_DETAIL_BRAND_FAILED,
} from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
  pagination: [],
};

const detailUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAIL_BRAND_PENDING:
      return { ...state, isLoading: true };
    case GET_DETAIL_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    case GET_DETAIL_BRAND_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default detailUserReducer;
