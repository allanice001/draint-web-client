import { SET_OUR_SECTION } from 'constants/redux/publicHomepage';

const initialState = {
  section: {},
};
function homepageJoinOurReducer(state = initialState, action) {
  switch (action.type) {
    case SET_OUR_SECTION: {
      return {
        ...state,
        section: action.payload,
      };
    }

    default:
      return state;
  }
}

export default homepageJoinOurReducer;
