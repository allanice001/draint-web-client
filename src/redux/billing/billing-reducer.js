import * as ACTION from './billing-constants';

const initialState = {
  loading: false,
  updating: false,
  history: {
    billingHistory: [],
    pagination: {},
  },
  timeLine: {
    timeLineHistory: [],
  },
  paymentMethod: {},
  isOpenPaymentModal: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.BILLING_SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case ACTION.BILLING_SET_UPDATING: {
      return {
        ...state,
        updating: action.payload,
      };
    }
    case ACTION.BILLING_FETCH_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case ACTION.BILLING_UPDATE_DATA_SUCCESS: {
      return {
        ...state,
        updating: false,
        ...action.payload,
      };
    }
    case ACTION.OPEN_PAYMENT_MODAL: {
      return {
        ...state,
        isOpenPaymentModal: true,
      };
    }
    case ACTION.CLOSE_PAYMENT_MODAL: {
      return {
        ...state,
        isOpenPaymentModal: false,
      };
    }
    default: {
      return state;
    }
  }
}
