import { RESET, SET_SECTION } from 'constants/redux/master-newsletter-section';

const initialState = {
  sections: [],
};
function masterNewsletterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SECTION: {
      return {
        ...state,
        sections: action.payload,
      };
    }
    case RESET: {
      return initialState;
    }

    default:
      return state;
  }
}

export default masterNewsletterReducer;
