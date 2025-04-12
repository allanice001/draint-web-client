import {
  FETCHING_SHIPPING_ORDERS,
  GET_MANUAL_SHIPMENT_ORDERS_SUCCESS,
  GET_SHIPMENT_ORDERS_SUCCESS,
  GET_WRAPPED_ORDERS_SUCCESS,
  GET_WRAPPED_ORDERS_TOTAL,
} from 'constants/redux/shippingRequests';

const initialState = {
  loading: false,
  shipmentOrders: [],
  shipmentManualOrders: [],
  wrappedSteps: [],
  total: 1,
};

function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WRAPPED_ORDERS_TOTAL: {
      return {
        ...state,
        total: action.payload,
      };
    }

    case FETCHING_SHIPPING_ORDERS: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case GET_WRAPPED_ORDERS_SUCCESS: {
      return {
        ...state,
        wrappedSteps: [...action.payload],
        loading: false,
      };
    }

    case GET_SHIPMENT_ORDERS_SUCCESS: {
      return {
        ...state,
        shipmentOrders: [...action.payload],
        loading: false,
      };
    }

    case GET_MANUAL_SHIPMENT_ORDERS_SUCCESS: {
      return {
        ...state,
        shipmentManualOrders: [...action.payload],
        loading: false,
      };
    }

    default:
      return state;
  }
}

export default ordersReducer;
