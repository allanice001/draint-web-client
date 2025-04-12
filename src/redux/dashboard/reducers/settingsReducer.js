import {
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_SIGNATURE_SUCCESS,
  SET_ARTIST_SETTINGS,
  SET_IS_CREATED,
  SET_SETTINGS_LOADING,
} from 'constants/redux/dashboardSettings';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  account: {},
  signature: {},
  isCreated: false,
};

function settingsReduser(state = initialState, action) {
  switch (action.type) {
    case SET_SETTINGS_LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case GET_USER_SIGNATURE_SUCCESS: {
      return {
        ...state,
        signature: action.payload,
      };
    }
    case GET_USER_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: action.payload.account || state.account,
        location: action.payload.location || {},
        loading: false,
      };
    }
    case SET_ARTIST_SETTINGS: {
      return {
        ...state,
        account: { ...action.payload },
        loading: false,
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    case SET_IS_CREATED: {
      return {
        isCreated: action.payload,
      };
    }
    default:
      return state;
  }
}

export default settingsReduser;
