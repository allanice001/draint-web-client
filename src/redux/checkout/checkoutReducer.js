import {
  CHANGE_PROCEED_VALUE,
  FETCHED,
  FETCHING,
  INITIAL_STEP,
  IS_CHANGED_ADDRESS_FORM,
  IS_CHANGED_INFO_FORM,
  NEXT_STEP,
  SET_CHECKOUT_DATA,
  SET_INITIAL_STATE,
  SET_ORDERS,
  SET_PAYMENT_SYSTEM_ACCESS,
  SET_PAYMENT_SYSTEM_IS_FROM_VALID,
  SET_SHIPMENT_RATE,
  SET_STRIPE_TOKEN,
  START_CREATING_COLLECTOR_ACCOUNT,
  STEP_BACK,
} from 'constants/redux/checkout';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialLoadState = {
  loading: false,
  step: 1,
  proceeded: false,
  data: null,
  orders: null,
  shipment_id: null,

  is_changed: {
    info: false,
    address: false,
  },

  paymentSystem: {
    hasUserAccess: true,
    isPaymentsFromValid: false,
  },
};

function checkoutReducer(state = initialLoadState, action) {
  switch (action.type) {
    case START_CREATING_COLLECTOR_ACCOUNT: {
      return { ...state, loading: true };
    }
    case INITIAL_STEP: {
      return {
        ...state,
        step: 1,
      };
    }
    case NEXT_STEP: {
      return {
        ...state,
        step: state.step + 1,
      };
    }
    case STEP_BACK: {
      return {
        ...state,
        step: state.step - 1,
      };
    }
    case CHANGE_PROCEED_VALUE: {
      return { ...state, proceeded: action.payload };
    }
    case FETCHING: {
      return { ...state, loading: true };
    }
    case FETCHED: {
      return {
        ...state,
        loading: false,
        fetched_success: true,
        ...action.payload,
      };
    }
    case IS_CHANGED_ADDRESS_FORM: {
      return {
        ...state,
        is_changed: { ...state.is_changed, ...action.payload },
      };
    }
    case IS_CHANGED_INFO_FORM: {
      return {
        ...state,
        is_changed: { ...state.is_changed, ...action.payload },
      };
    }
    case SET_INITIAL_STATE:
    case DELETE_USER_DATA_SUCCESS: {
      return initialLoadState;
    }
    case SET_CHECKOUT_DATA: {
      return { ...state, data: { ...state.data, ...action.payload } };
    }
    case SET_ORDERS: {
      return { ...state, orders: action.payload };
    }
    case SET_STRIPE_TOKEN: {
      return { ...state, ...action.payload };
    }
    case SET_SHIPMENT_RATE: {
      return { ...state, ...action.payload };
    }
    case SET_PAYMENT_SYSTEM_ACCESS: {
      const { paymentSystem } = state;
      return {
        ...state,
        paymentSystem: { ...paymentSystem, hasUserAccess: action.payload },
      };
    }
    case SET_PAYMENT_SYSTEM_IS_FROM_VALID: {
      const { paymentSystem } = state;
      return {
        ...state,
        paymentSystem: {
          ...paymentSystem,
          isPaymentsFromValid: action.payload,
        },
      };
    }
    default:
      return state;
  }
}

export default checkoutReducer;
