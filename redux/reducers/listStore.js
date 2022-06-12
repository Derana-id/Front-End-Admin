import {
  GET_LIST_STORE_PENDING,
  GET_LIST_STORE_SUCCESS,
  GET_LIST_STORE_FAILED,
} from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
  pagination: [],
};

const listUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_STORE_PENDING:
      return { ...state, isLoading: true };
    case GET_LIST_STORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    case GET_LIST_STORE_FAILED:
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

export default listUserReducer;
