import {
  SET_REVIEWS,
} from 'constants/redux/masterReviews';

const initialState = {
  reviews: [],
}
function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEWS: {
      return {
        ...state,
        reviews: action.payload,
      };
    }

    default:
      return state;
  }
}

export default reviewReducer;
