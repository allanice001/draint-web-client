import {
  FETCH_REQUESTED_PAYOUTS_SUCCESS,
  SET_FETCH,
  SET_PAGE,
} from 'constants/redux/master-payouts';

const initialState = {
  requestedPayouts: [],
  payoutsHistory: [],
  page: 1,
  pages: 1,
  fetching: false,
};

function payoutsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUESTED_PAYOUTS_SUCCESS: {
      return {
        ...state,
        requestedPayouts: action.payload.requestedPayouts,
        payoutsHistory: action.payload.payoutsHistory,
        pages: action.payload.pages,
        fetching: true,
      };
    }
    case SET_FETCH: {
      return {
        ...state,
        fetching: action.payload,
      };
    }
    case SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    default:
      return state;
  }
}

export default payoutsReducer;
