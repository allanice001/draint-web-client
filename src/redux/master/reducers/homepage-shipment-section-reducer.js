import { SET_SHIPMENT_SECTION } from 'constants/redux/publicHomepage';

const initialState = {
  section: {},
};
function homepageShipmentReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SHIPMENT_SECTION: {
      return {
        ...state,
        section: action.payload,
      };
    }

    default:
      return state;
  }
}

export default homepageShipmentReducer;
