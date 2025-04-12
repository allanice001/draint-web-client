import {
  FETCHING_SHIPPING_ORDERS,
  GET_MANUAL_SHIPMENT_ORDERS_SUCCESS,
  GET_SHIPMENT_ORDERS_SUCCESS,
  GET_WRAPPED_ORDERS_SUCCESS,
  GET_WRAPPED_ORDERS_TOTAL,
} from 'constants/redux/shippingRequests';
import { VERIFIED } from 'constants/statuses';
import {
  MAIL_SENT,
  ORDER_FINALIZE,
  ORDER_UPDATED,
} from 'constants/components/master/shipping-manual';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { getShippingOrdersRequest } from 'dataLayer/master/get-shipping-orders-request';
import {
  finalizeManualOrderRequest,
  updateManualOrderRequest,
} from 'dataLayer/master/manual-order-requests';
import { MANUAL } from 'constants/master/shipping-requests';
import {
  notifySellerRequest,
  shippingOrderWrapperStepRequest,
  updateShippingOrdersStatusRequest,
} from 'dataLayer/master/shipping-orders-requests';

export const setLoading = payload => ({
  type: FETCHING_SHIPPING_ORDERS,
  payload,
});

export const getWrappedStepOrders = payload => ({
  type: GET_WRAPPED_ORDERS_SUCCESS,
  payload,
});

export const getWrappedStepTotal = payload => ({
  type: GET_WRAPPED_ORDERS_TOTAL,
  payload,
});

export const getShipmentOrders = payload => ({
  type: GET_SHIPMENT_ORDERS_SUCCESS,
  payload,
});

export const getManualShipmentOrders = payload => ({
  type: GET_MANUAL_SHIPMENT_ORDERS_SUCCESS,
  payload,
});

export const setWrappedSteps = data => dispatch => {
  const { total, orders } = data;

  dispatch(getWrappedStepTotal(total));
  dispatch(getWrappedStepOrders(orders));
};

export const updateManualOrder = (
  order,
  formValues,
  currentPage
) => dispatch => {
  updateManualOrderRequest(order.id, formValues, currentPage)
    .then(({ data }) => {
      const { total, orders } = data;
      dispatch(getWrappedStepTotal(total));
      dispatch(getManualShipmentOrders(orders));
      dispatch(displayMessage(ORDER_UPDATED));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const finalizeManualOrder = (order, currentPage) => dispatch => {
  finalizeManualOrderRequest(order, currentPage)
    .then(({ data }) => {
      const { total, orders } = data;
      dispatch(getWrappedStepTotal(total));
      dispatch(getManualShipmentOrders(orders));
      dispatch(displayMessage(ORDER_FINALIZE));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const setOrdersSteps = data => dispatch => {
  const { total, orders } = data;

  dispatch(getWrappedStepTotal(total));
  dispatch(getShipmentOrders(orders));
};

export const getShippingOrders = (page, type = '') => dispatch => {
  dispatch(setLoading(true));

  getShippingOrdersRequest(page, type)
    .then(({ data }) => {
      dispatch(setOrdersSteps(data));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(error));
    });
};

export const getManualShippingOrders = page => dispatch => {
  dispatch(setLoading(true));

  getShippingOrdersRequest(page, MANUAL)
    .then(({ data }) => {
      const { total, orders } = data;
      dispatch(getWrappedStepTotal(total));
      dispatch(getManualShipmentOrders(orders));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(error));
    });
};

export const getWrappedSteps = (page, type = '') => dispatch => {
  dispatch(setLoading(true));

  getShippingOrdersRequest(page, type)
    .then(({ data }) => {
      dispatch(setWrappedSteps(data));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(error));
    });
};

export const updateShippingOrdersStatus = (
  status,
  activeStep,
  order
) => dispatch => {
  updateShippingOrdersStatusRequest(status, activeStep, order).catch(error => {
    dispatch(errorMessageHandler(error));
  });
};

export const shippingOrderWrapperStep = order => dispatch => {
  shippingOrderWrapperStepRequest(order).catch(error => {
    dispatch(errorMessageHandler(error));
  });
};

export const notifySeller = (order, status = VERIFIED) => dispatch => {
  notifySellerRequest(order, status)
    .then(() => {
      dispatch(displayMessage(MAIL_SENT));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};
