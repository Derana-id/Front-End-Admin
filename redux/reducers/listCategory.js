import {
  GET_LIST_CATEGORY_PENDING,
  GET_LIST_CATEGORY_SUCESS,
  GET_LIST_CATEGORY_FAILED,
} from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
  pagination: [],
};

const listProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_CATEGORY_PENDING:
      return { ...state, isLoading: true };
    case GET_LIST_CATEGORY_SUCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    case GET_LIST_CATEGORY_FAILED:
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

export default listProductReducer;
