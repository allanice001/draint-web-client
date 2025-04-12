import {
  CLOSE_SNACKBAR,
  GET_CHARGES_ERROR,
  GET_CHARGES_SUCCESS,
  SET_CURRENT_CHARGES_SUCCESS,
  SET_TRANSACTIONS_LOADING,
  SET_TRANSACTIONS_MONTH,
  SET_TRANSACTIONS_YEAR,
} from 'constants/redux/masterTransactions';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  charges: [],
  currentCharges: [],
  totalPages: null,
  page: null,
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  open: false,
  message: '',
  style: '',
};

function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARGES_SUCCESS: {
      return {
        ...state,
        charges: action.payload,
        loading: false,
      };
    }
    case SET_CURRENT_CHARGES_SUCCESS: {
      return {
        ...state,
        currentCharges: action.payload.charges,
        totalPages: action.payload.totalPages,
        page: action.payload.page,
      };
    }
    case GET_CHARGES_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_TRANSACTIONS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_TRANSACTIONS_MONTH: {
      return {
        ...state,
        month: action.payload,
      };
    }
    case SET_TRANSACTIONS_YEAR: {
      return {
        ...state,
        year: action.payload,
      };
    }
    case CLOSE_SNACKBAR: {
      return {
        ...state,
        open: false,
        message: '',
        style: '',
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default transactionsReducer;
