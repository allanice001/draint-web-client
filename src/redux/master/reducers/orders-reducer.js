import {
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
  RESET_ORDERS_FILTER,
  SET_ORDERS_FILTER,
  SET_ORDERS_LOADING,
  SET_ORDER_EXPANDED,
} from 'constants/redux/master-orders';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  isLoading: false,
  expandedOrderId: '',

  orders: [],
  sellersList: [],
  buyersList: [],

  snackbar: {
    open: false,
    message: '',
    style: 'error',
  },

  filters: {
    search: '',
    status: '',
    seller: '',
    buyer: '',
  },
};

function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ORDERS_SUCCESS: {
      const { orders, buyersList, sellersList, pagination } = action.payload;

      return {
        ...state,
        orders,
        buyersList: buyersList.length === 0 ? state.buyersList : buyersList,
        sellersList: sellersList.length === 0 ? state.sellersList : sellersList,
        expandedOrderId: initialState.expandedOrderId,
        pagination: pagination,
        isLoading: false,
      };
    }
    case GET_ORDERS_ERROR: {
      return {
        ...state,
        expandedOrderId: initialState.expandedOrderId,
        isLoading: false,
        snackbar: {
          open: true,
          message: action.payload,
        },
      };
    }
    case SET_ORDER_EXPANDED: {
      return {
        ...state,
        expandedOrderId: action.payload,
      };
    }
    case SET_ORDERS_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    }
    case RESET_ORDERS_FILTER: {
      return {
        ...state,
        filters: initialState.filters,
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default ordersReducer;
