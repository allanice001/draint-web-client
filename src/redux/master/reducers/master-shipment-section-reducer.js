import { RESET, SET_SECTION } from 'constants/redux/master-shipment-section';

const initialState = {
  sections: [],
};
function masterShipmentReducer(state = initialState, action) {
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

export default masterShipmentReducer;
