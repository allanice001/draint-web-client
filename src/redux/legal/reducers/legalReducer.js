import {
  ADD_LEGAL_ITEM,
  REMOVE_LEGAL_ITEM,
  SET_LEGAL_DATA,
  SET_LEGAL_IMPRINT,
  SET_LEGAL_LOADING,
  SET_SELECTED_LEGAL_ITEM,
  UPDATE_LEGAL_ITEM,
} from 'constants/redux/legal';

const initialState = {
  legalList: null,
  selectedLegalItem: null,
  imprint: null,
  loading: false,
};

const legalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LEGAL_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case SET_LEGAL_DATA: {
      return {
        ...state,
        legalList: action.payload,
      };
    }
    case REMOVE_LEGAL_ITEM: {
      return {
        ...state,
        legalList: state.legalList.filter(item => item.id !== action.payload),
      };
    }
    case ADD_LEGAL_ITEM: {
      return {
        ...state,
        legalList: [...state.legalList, action.payload],
      };
    }
    case UPDATE_LEGAL_ITEM: {
      return {
        ...state,
        legalList: state.legalList.map(item =>
          item.id.toString() === action.payload.id ? action.payload : item
        ),
      };
    }
    case SET_SELECTED_LEGAL_ITEM: {
      return {
        ...state,
        selectedLegalItem: action.payload,
      };
    }

    case SET_LEGAL_IMPRINT: {
      return {
        ...state,
        loading: false,
        imprint: action.payload,
      };
    }
    default:
      return state;
  }
};

export default legalReducer;
