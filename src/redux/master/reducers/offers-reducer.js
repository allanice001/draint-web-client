import {
  GET_OFFERS_ERROR,
  GET_OFFERS_SUCCESS,
  RESET_OFFERS_FILTER,
  SET_OFFERS_FILTER,
  SET_OFFERS_LOADING,
  SET_OFFER_EXPANDED,
} from 'constants/redux/master-offers';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  isLoading: false,
  expandedOfferId: '',

  offers: [],
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
    case SET_OFFERS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_OFFERS_SUCCESS: {
      const { offers, buyersList, sellersList } = action.payload;

      return {
        ...state,
        offers,
        buyersList: buyersList.length === 0 ? state.buyersList : buyersList,
        sellersList: sellersList.length === 0 ? state.sellersList : sellersList,
        expandedOfferId: initialState.expandedOfferId,
        isLoading: false,
      };
    }
    case GET_OFFERS_ERROR: {
      return {
        ...state,
        expandedOfferId: initialState.expandedOfferId,
        isLoading: false,
        snackbar: {
          open: true,
          message: action.payload,
        },
      };
    }
    case SET_OFFER_EXPANDED: {
      return {
        ...state,
        expandedOfferId: action.payload,
      };
    }
    case SET_OFFERS_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    }
    case RESET_OFFERS_FILTER: {
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
