import {
  CLEAR_SHIPMENT_TRACK_SUCCESS,
  FETCH_IN_COMING_ORDERS_SUCCESS,
  FETCH_OFFERS,
  FETCH_OFFERS_SUCCESS,
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_OUT_COMING_ORDERS_SUCCESS,
  GET_SHIPMENT_TRACK_SUCCESS,
  GET_USER_OFFERS_SUCCESS,
  GET_USER_ORDERS_SUCCESS,
  PUT_ORDERS_INVOICE_SUCCESS,
  SET_AUCTION_MODAL,
  SET_CURRENT_OFFER,
  SET_OFFER_PAGINATION,
  SET_ORDERS_LOADING,
  SET_ORDERS_LOADING_FALSE,
  SET_ORDERS_LOADING_TRUE,
} from '../../../constants/redux/dashboardOrders';

import { DELETE_USER_DATA_SUCCESS } from '../../../constants/redux/user';

const initialState = {
  loading: false,
  orders: [],
  offers: [],
  lastNubmer: null,
  auctionModal: false,
  offerPagination: {},
  currentOffer: undefined,

  artistOrders: {
    fetching: false,
    data: [],
    totalPages: 0,
    page: 1,
  },

  collectorOrders: {
    inComing: {
      fetching: false,
      data: [],
      totalPages: 0,
      page: 1,
    },

    outComing: {
      fetching: false,
      data: [],
      totalPages: 0,
      page: 1,
    },
  },

  newOffers: {
    fetching: false,
    data: [],
    totalPages: 0,
    page: 1,
  },
  trackPackage: {},
};

function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS: {
      return {
        ...state,

        artistOrders: {
          ...state.artistOrders,
          fetching: true,
          page: action.payload,
        },
      };
    }

    case FETCH_ORDERS_SUCCESS: {
      const {
        payload: { orders, totalPages, total, page },
      } = action;

      return {
        ...state,

        artistOrders: {
          fetching: false,
          data: orders,
          totalPages,
          total,
          page,
        },
      };
    }

    case FETCH_OUT_COMING_ORDERS_SUCCESS: {
      const {
        payload: { orders, totalPages, total, page },
      } = action;

      return {
        ...state,

        collectorOrders: {
          ...state.collectorOrders,
          outComing: {
            fetching: false,
            data: orders,
            totalPages,
            total,
            page,
          },
        },
      };
    }

    case FETCH_IN_COMING_ORDERS_SUCCESS: {
      const {
        payload: { orders, totalPages, total, page },
      } = action;

      return {
        ...state,

        collectorOrders: {
          ...state.collectorOrders,
          inComing: {
            fetching: false,
            data: orders,
            totalPages,
            total,
            page,
          },
        },
      };
    }

    case FETCH_OFFERS: {
      return {
        ...state,

        newOffers: {
          ...state.newOffers,
          fetching: true,
          page: action.payload,
        },
      };
    }

    case FETCH_OFFERS_SUCCESS: {
      const {
        payload: { offers, totalPages, total, page },
      } = action;

      return {
        ...state,

        newOffers: {
          fetching: false,
          data: offers,
          totalPages,
          total,
          page,
        },
      };
    }

    case SET_ORDERS_LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case SET_ORDERS_LOADING_TRUE: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_ORDERS_LOADING_FALSE: {
      return {
        ...state,
        loading: false,
      };
    }
    case SET_AUCTION_MODAL: {
      return {
        ...state,
        auctionModal: !state.auctionModal,
      };
    }
    case SET_OFFER_PAGINATION: {
      return {
        ...state,
        offerPagination: action.payload,
      };
    }
    case SET_CURRENT_OFFER: {
      return {
        ...state,
        currentOffer: action.payload,
      };
    }
    case GET_USER_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case GET_USER_OFFERS_SUCCESS: {
      return {
        ...state,
        offers: action.payload,
      };
    }
    case PUT_ORDERS_INVOICE_SUCCESS: {
      return {
        ...state,
        lastNubmer: action.payload,
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    case GET_SHIPMENT_TRACK_SUCCESS: {
      return {
        ...state,
        trackPackage: { ...action.payload },
      };
    }
    case CLEAR_SHIPMENT_TRACK_SUCCESS: {
      return {
        ...state,
        trackPackage: {},
      };
    }
    default:
      return state;
  }
}

export default ordersReducer;
