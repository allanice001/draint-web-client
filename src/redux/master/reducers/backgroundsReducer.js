import {
  CLOSE_SNACKBAR,
  DELETE_BACKGROUND_DIALOG,
  DELETE_BACKGROUND_ERROR,
  DELETE_BACKGROUND_SUCCESS,
  GET_BACKGROUNDS_ERROR,
  GET_BACKGROUNDS_SUCCESS,
  SET_BACKGROUNDS_LOADING,
  UPLOAD_BACKGROUND_ERROR,
  UPLOAD_BACKGROUND_SUCCESS,
} from 'constants/redux/masterBackgrounds';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  backgroundsList: [],
  openDialog: false,
  imageId: '',
  open: false,
  message: '',
  style: '',
};

function backgroundsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BACKGROUNDS_SUCCESS: {
      return {
        ...state,
        backgroundsList: action.payload,
        loading: false,
      };
    }
    case GET_BACKGROUNDS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_BACKGROUNDS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_BACKGROUND_DIALOG: {
      return {
        ...state,
        openDialog: !state.openDialog,
        imageId: action.payload,
      };
    }
    case DELETE_BACKGROUND_SUCCESS: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'success',
        openDialog: !state.openDialog,
      };
    }
    case DELETE_BACKGROUND_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        openDialog: !state.openDialog,
      };
    }
    case UPLOAD_BACKGROUND_SUCCESS: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'success',
        loading: false,
      };
    }
    case UPLOAD_BACKGROUND_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case CLOSE_SNACKBAR: {
      return {
        ...state,
        open: false,
        message: '',
        style: '',
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default backgroundsReducer;
