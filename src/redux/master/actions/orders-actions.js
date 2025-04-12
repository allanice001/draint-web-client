import {
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
  RESET_ORDERS_FILTER,
  SET_ORDERS_FILTER,
  SET_ORDERS_LOADING,
  SET_ORDER_EXPANDED,
} from 'constants/redux/master-orders';

import { CLOSE_SNACKBAR } from 'constants/redux/global/messages';
import axios from 'dataLayer/axiosInstanceMaster';

export const setOrdersLoading = () => ({
  type: SET_ORDERS_LOADING,
});

export const setExpandedOrderId = orderId => ({
  type: SET_ORDER_EXPANDED,
  payload: orderId,
});

export const closeOrdersSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const getOrdersSuccess = payload => ({
  type: GET_ORDERS_SUCCESS,
  payload,
});

export const getOrdersError = error => ({
  type: GET_ORDERS_ERROR,
  payload: error,
});

export const setOrdersFilter = payload => ({
  type: SET_ORDERS_FILTER,
  payload,
});

export const resetOrdersFilters = () => ({
  type: RESET_ORDERS_FILTER,
});

export const applyOrderFilters = () => (dispatch, getState) => {
  const {
    master: { orders },
  } = getState();

  dispatch(getOrders(orders.filters));
};

export const getOrders = (
  { search = '', status = '', buyer = '', seller = '', page } = {
    search: '',
    status: '',
    buyer: '',
    seller: '',
    page: '',
  }
) => dispatch => {
  // dispatch(setOrdersLoading());

  axios
    .get('/api/master/orders', {
      params: {
        search,
        status,
        buyerId: buyer,
        sellerId: seller,
        page: page,
      },
    })
    .then(({ data }) => dispatch(getOrdersSuccess(data)))
    .catch(error => dispatch(getOrdersError(error.message)));
};
