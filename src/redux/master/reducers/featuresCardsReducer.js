import {
  GET_MASTER_FEATURES_CARDS_SUCCESS,
  SET_MASTER_FEATURES_CARDS_LOADING,
} from 'constants/redux/masterFeaturesCards';

const initialState = {
  loading: false,
  cards: [],
  pagination: {},
};

function featuresCardsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MASTER_FEATURES_CARDS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MASTER_FEATURES_CARDS_SUCCESS: {
      return {
        ...state,
        cards: action.payload.cards,
        pagination: action.payload.pagination,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export default featuresCardsReducer;
