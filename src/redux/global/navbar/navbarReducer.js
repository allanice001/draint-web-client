import {
  GET_NAVBAR_DATA_SUCCESS,
  SET_IS_NAV_BAR_MENU_OPENED,
  SET_NAVBAR_LOADING,
} from 'constants/redux/global/navbar';

const initialState = {
  loading: false,
  isNavBarMenuOpened: false,
  by_country: [],
  latest: [],
  featured: [],
  styles: [],
  mediums: [],
  hashtags: [],
};

function navbarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAVBAR_LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case SET_IS_NAV_BAR_MENU_OPENED: {
      return {
        ...state,
        isNavBarMenuOpened:
          action.payload === undefined
            ? !state.isNavBarMenuOpened
            : action.payload,
      };
    }
    case GET_NAVBAR_DATA_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export default navbarReducer;
