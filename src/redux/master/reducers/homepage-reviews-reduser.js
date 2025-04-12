import {
  SET_REVIEWS,
} from 'constants/redux/publicHomepage';

const initialState = {
  reviews: [],
}
function homepageReviewReducer(state = initialState, action) {
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

export default homepageReviewReducer;
