import { SET_US_SECTION } from 'constants/redux/publicHomepage';

const initialState = {
  section: {},
};
function homepageJoinUsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_US_SECTION: {
      return {
        ...state,
        section: action.payload,
      };
    }

    default:
      return state;
  }
}

export default homepageJoinUsReducer;
