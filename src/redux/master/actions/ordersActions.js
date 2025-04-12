import {
  CLOSE_SNACKBAR,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
  PUT_ORDERS_ERROR,
  PUT_ORDERS_SUCCESS,
  RESET_ORDERS_FILTER,
  SET_EXPANDED,
  SET_ORDERS_FILTER,
  SET_ORDERS_LOADING,
  SET_ORDER_CHANGE,
} from 'constants/redux/masterOrders';

import axios from 'dataLayer/axiosInstanceMaster';

export const setLoading = () => ({
  type: SET_ORDERS_LOADING,
});

export const getOrdersSuccess = payload => ({
  type: GET_ORDERS_SUCCESS,
  payload,
});

export const getOrdersError = error => ({
  type: GET_ORDERS_ERROR,
  payload: error,
});

export const putOrdersSuccess = payload => ({
  type: PUT_ORDERS_SUCCESS,
  payload,
});

export const putOrdersError = error => ({
  type: PUT_ORDERS_ERROR,
  payload: error,
});

export const closeOrdersSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const setExpanded = expanded => ({
  type: SET_EXPANDED,
  payload: expanded,
});

export const setOrderChange = values => ({
  type: SET_ORDER_CHANGE,
  payload: values,
});

export const setFilter = (type, filter) => ({
  type: SET_ORDERS_FILTER,
  payload: { [type]: filter },
});

export const resetFilters = () => ({
  type: RESET_ORDERS_FILTER,
});

const processOrderValues = orders => {
  const values = {};
  const seller_names = [];
  const buyer_names = [];
  orders.map(order => {
    values[order.order_id] = values[order.order_id]
      ? values[order.order_id]
      : {};
    values[order.order_id].shippingDate = values[order.order_id].shippingDate
      ? values[order.order_id].shippingDate
      : order.order_shipped;
    values[order.order_id].deliveryDate = values[order.order_id].deliveryDate
      ? values[order.order_id].deliveryDate
      : order.order_delivered;
    values[order.order_id].payoutDate = values[order.order_id].payoutDate
      ? values[order.order_id].payoutDate
      : order.order_payouted;
    values[order.order_id].shippingCost = values[order.order_id].shippingCost
      ? values[order.order_id].shippingCost
      : order.shipping_cost;
    seller_names.push(order.seller_name);
    buyer_names.push(order.buyer_name);
    return order;
  });
  return {
    values,
    fullOrdersStack: orders,
    sellerNames: seller_names.filter((v, i, a) => a.indexOf(v) === i),
    buyerNames: buyer_names.filter((v, i, a) => a.indexOf(v) === i),
  };
};

export const getOrders = (filter = '', query = '', search = '') => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/master/orders?filter=${filter}&query=${query}&search=${search}`)
    .then(res => {
      const { orders } = res.data;
      if (filter === '' && query === '' && search === '') {
        const payload = processOrderValues(orders);
        payload.orders = orders;
        dispatch(getOrdersSuccess(payload));
      }
      const payload = {};
      payload.orders = orders;
      return dispatch(getOrdersSuccess(payload));
    })
    .catch(err => dispatch(getOrdersError(err.message)));
};

export const handleOrderChange = data => async dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/master/orders', { data })
    .then(() => dispatch(putOrdersSuccess('Order has been updated')))
    .catch(err => dispatch(putOrdersError(err.message)));
};

export const handleReset = () => dispatch => {
  dispatch(resetFilters());
  dispatch(getOrders());
};
