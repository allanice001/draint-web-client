import {
  ADD_IMAGE_TO_MODAL,
  CHANGE_MODAL_DESCRIPTION,
  CLOSE_SNACKBAR,
  DELETE_MODAL_IMG_DIALOG,
  DELETE_MODAL_IMG_ERROR,
  DELETE_MODAL_IMG_SUCCESS,
  GET_MODALS_ERROR,
  GET_MODALS_SUCCESS,
  GET_MODAL_CONTENT_ERROR,
  GET_MODAL_CONTENT_SUCCESS,
  GET_MODAL_IMGS_ERROR,
  GET_MODAL_IMGS_SUCCESS,
  REMOVE_IMAGE_FROM_MODAL,
  SELECT_MODAL,
  SET_MODALS_LOADING,
  SET_MODALS_PAGE,
  UPDATE_MODAL_DESCRIPTION_ERROR,
  UPDATE_MODAL_DESCRIPTION_SUCCESS,
  UPLOAD_MODAL_IMG_ERROR,
  UPLOAD_MODAL_IMG_SUCCESS,
} from 'constants/redux/masterModals';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  mediaList: [],
  imageId: '',
  openDialog: false,
  open: false,
  allModals: [],
  mediaToModal: '',
  currentModal: '',
  description: '',
};

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MODALS_SUCCESS: {
      return {
        ...state,
        allModals: action.payload,
        loading: false,
      };
    }
    case GET_MODALS_ERROR: {
      return {
        ...state,
        open: true,
        loading: false,
      };
    }
    case GET_MODAL_CONTENT_SUCCESS: {
      return {
        ...state,
        mediaToModal: action.payload,
        loading: false,
      };
    }
    case GET_MODAL_CONTENT_ERROR: {
      return {
        ...state,
        open: true,
        loading: false,
      };
    }
    case SELECT_MODAL: {
      return {
        ...state,
        currentModal: action.payload,
        description: action.payload.description,
      };
    }
    case CHANGE_MODAL_DESCRIPTION: {
      return {
        ...state,
        description: action.payload,
      };
    }
    case UPDATE_MODAL_DESCRIPTION_SUCCESS: {
      return {
        ...state,
        open: true,
        allModals: action.payload.allModals,
        loading: false,
      };
    }
    case UPDATE_MODAL_DESCRIPTION_ERROR: {
      return {
        ...state,
        open: true,
        loading: false,
      };
    }
    case GET_MODAL_IMGS_SUCCESS: {
      return {
        ...state,
        mediaList: action.payload.media,
        loading: false,
      };
    }
    case GET_MODAL_IMGS_ERROR: {
      return {
        ...state,
        open: true,
        loading: false,
      };
    }
    case UPLOAD_MODAL_IMG_SUCCESS: {
      return {
        ...state,
        open: true,
        loading: false,
      };
    }
    case UPLOAD_MODAL_IMG_ERROR: {
      return {
        ...state,
        open: true,
        loading: false,
      };
    }
    case SET_MODALS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_MODALS_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case DELETE_MODAL_IMG_DIALOG: {
      return {
        ...state,
        openDialog: !state.openDialog,
        imageId: action.payload,
      };
    }
    case DELETE_MODAL_IMG_SUCCESS: {
      return {
        ...state,
        open: true,
        openDialog: !state.openDialog,
      };
    }
    case DELETE_MODAL_IMG_ERROR: {
      return {
        ...state,
        open: true,
        openDialog: !state.openDialog,
      };
    }
    case CLOSE_SNACKBAR: {
      return {
        ...state,
        open: false,
      };
    }
    case REMOVE_IMAGE_FROM_MODAL: {
      return {
        ...state,
        mediaToModal: '',
      };
    }
    case ADD_IMAGE_TO_MODAL: {
      return {
        ...state,
        mediaToModal: action.payload,
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default modalReducer;
