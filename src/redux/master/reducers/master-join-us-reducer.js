import { RESET, SET_JOIN_SECTION } from 'constants/redux/master-homepage';

const initialState = {
  sections: [],
};
function masterJoinUsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_JOIN_SECTION: {
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

export default masterJoinUsReducer;
