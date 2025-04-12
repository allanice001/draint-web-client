import {
  FETCH_PAYOUTS_ORDERS,
  FETCH_PAYOUTS_ORDERS_SUCCESS,
  SET_COLLECTORS_INCOMING_OFFERS_SUCCESS,
  SET_COLLECTORS_OUTCOMING_OFFERS_SUCCESS,
  SET_PAGE,
  SET_PAGE_SIZE,
  SET_SALES_DASHBOARD_LOADING,
} from 'constants/redux/dashboardSales';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  user: {},
  location: {},
  offers: [],

  payoutsOrders: {
    orders: [],
    page: 1,
    pageSize: 2,
    pages: 1,
    maxCount: 1,
    fetching: false,
    payoutAmount: 0,
    payoutSoFarAmount: 0,
    paymentSystems: [],
    payoutHistory: [],
    payoutHistoryPreview: [],
  },

  collectorsOffers: {
    inComing: {
      data: [],
      pagination: {},
    },

    outComing: {
      data: [],
      pagination: {},
    },
  },

  artworks: [],
  payouts: [],
  checked: false,
};

function salesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE: {
      return {
        ...state,
        payoutsOrders: {
          ...state.payoutsOrders,
          page: action.payload,
        },
      };
    }
    case SET_PAGE_SIZE: {
      return {
        ...state,
        payoutsOrders: {
          ...state.payoutsOrders,
          page: 1,
          pageSize: action.payload,
        },
      };
    }
    case FETCH_PAYOUTS_ORDERS: {
      return {
        ...state,
        payoutsOrders: {
          ...state.payoutsOrders,
          fetching: action.payload,
        },
      };
    }
    case FETCH_PAYOUTS_ORDERS_SUCCESS: {
      return {
        ...state,
        payoutsOrders: {
          ...state.payoutsOrders,
          orders: action.payload.orders,
          pages: action.payload.pages,
          maxCount: action.payload.maxCount,
          payoutAmount: Number(action.payload.payoutAmount),
          payoutSoFarAmount: Number(action.payload.payoutSoFarAmount),
          paymentSystems: action.payload.paymentSystems,
          payoutHistory: action.payload.payoutHistory,
          payoutHistoryPreview: action.payload.payoutHistoryPreview,
        },
      };
    }
    case SET_SALES_DASHBOARD_LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case SET_COLLECTORS_INCOMING_OFFERS_SUCCESS: {
      return {
        ...state,
        collectorsOffers: {
          ...state.collectorsOffers,
          inComing: action.payload,
        },
      };
    }
    case SET_COLLECTORS_OUTCOMING_OFFERS_SUCCESS: {
      return {
        ...state,
        collectorsOffers: {
          ...state.collectorsOffers,
          outComing: action.payload,
        },
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default salesReducer;
