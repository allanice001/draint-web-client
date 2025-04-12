import {
  DELETE_SING_UP_TOKEN_FAILURE,
  DELETE_SING_UP_TOKEN_FETCHING,
  DELETE_SING_UP_TOKEN_SUCCESS,
  DELETE_USER_DATA_FAILURE,
  DELETE_USER_DATA_FETCHING,
  DELETE_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_FETCHING,
  GET_USER_DATA_SUCCESS,
  INITIAL_STATE,
  SET_LOADING_USER_DATA,
  SET_LOCATION_DATA_FAILURE,
  SET_LOCATION_DATA_FETCHING,
  SET_LOCATION_DATA_SUCCESS,
  SET_USER_ACCOUNT,
  SET_USER_ACCOUNT_IS_ACTIVE,
  SET_USER_ACCOUNT_THEME,
  SET_USER_DATA_FAILURE,
  SET_USER_DATA_FETCHING,
  SET_USER_DATA_SUCCESS,
  SET_USER_FLAG_FAILURE,
  SET_USER_FLAG_FETCHING,
  SET_USER_FLAG_SUCCESS,
  SET_USER_PROF_STATUS,
  SET_USER_SIGN_UP_TOKEN_FAILURE,
  SET_USER_SIGN_UP_TOKEN_FETCHING,
  SET_USER_SIGN_UP_TOKEN_SUCCESS,
  UPDATE_LOCATION_DATA_FAILURE,
  UPDATE_LOCATION_DATA_START,
  UPDATE_LOCATION_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILURE,
  UPDATE_USER_DATA_FETCHING,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_SUBSCRIPTION_DATA_SUCCESS,
} from 'constants/redux/user';

import { UPDATE_ARTWORKS_COUNT } from 'constants/redux/publicArtwork';

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Common fetching actions
    case GET_USER_DATA_FETCHING:
    case SET_USER_DATA_FETCHING:
    case SET_LOCATION_DATA_FETCHING:
    case DELETE_USER_DATA_FETCHING:
    case SET_USER_SIGN_UP_TOKEN_FETCHING:
    case SET_USER_FLAG_FETCHING:
    case UPDATE_USER_DATA_FETCHING:
    case DELETE_SING_UP_TOKEN_FETCHING:
    case UPDATE_LOCATION_DATA_START: {
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      };
    }

    // Common success actions
    case GET_USER_DATA_SUCCESS:
    case SET_LOCATION_DATA_SUCCESS:
    case SET_USER_FLAG_SUCCESS:
    case UPDATE_USER_DATA_SUCCESS:
    case UPDATE_USER_SUBSCRIPTION_DATA_SUCCESS:
    case SET_USER_DATA_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }

    // Common failure actions
    case GET_USER_DATA_FAILURE:
    case SET_LOCATION_DATA_FAILURE:
    case UPDATE_LOCATION_DATA_FAILURE:
    case DELETE_USER_DATA_FAILURE:
    case SET_USER_SIGN_UP_TOKEN_FAILURE:
    case SET_USER_FLAG_FAILURE:
    case UPDATE_USER_DATA_FAILURE:
    case DELETE_SING_UP_TOKEN_FAILURE:
    case SET_USER_DATA_FAILURE: {
      return { ...state, ...action.payload, loading: false };
    }

    // Specific update actions
    case UPDATE_LOCATION_DATA_SUCCESS: {
      return { ...state, location: { ...action.payload } };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return INITIAL_STATE;
    }
    case SET_USER_SIGN_UP_TOKEN_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case DELETE_SING_UP_TOKEN_SUCCESS: {
      if (state.sign_up_token) {
        return { ...state, ...action.payload };
      }
      return { ...state };
    }
    case SET_USER_PROF_STATUS: {
      return {
        ...state,
        is_employee: action.payload.is_employee,
        employeeData: action.payload.employeeData,
      };
    }
    case SET_USER_ACCOUNT_IS_ACTIVE: {
      return {
        ...state,
        is_activated: action.payload,
      };
    }
    case SET_USER_ACCOUNT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_USER_ACCOUNT_THEME: {
      return {
        ...state,
        theme: action.payload,
        avatar: action.payload,
      };
    }
    case UPDATE_ARTWORKS_COUNT: {
      const { canUploadArtwork, artworksCount } = action.payload;

      return {
        ...state,
        canUploadArtwork,
        artworksCount,
      };
    }

    case SET_LOADING_USER_DATA: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    // Default state
    default:
      return state;
  }
}

export default userReducer;
