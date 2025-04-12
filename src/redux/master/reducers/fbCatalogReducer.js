import {
  ADD_TO_FB_CATALOG_SUCCESS,
  CHANGE_FB_CATALOG_ITEM,
  CLOSE_SNACKBAR,
  CREATE_CSV_SUCCESS,
  DELETE_ARTWORK_FB_SUCCESS,
  GET_ARTWORKS_FB_SUCCESS,
  GET_FB_CATALOG_ITEM_SUCCESS,
  GET_FB_CATALOG_SUCCESS,
  RESET_CSV,
  SET_ARTWORKS_FB_LOADING,
  SET_ARTWORKS_FB_PAGE,
  SET_EDIT_MODE,
  UPDATE_FB_CATALOG_ITEM_SUCCESS,
} from 'constants/redux/masterFbCatalog';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  currentArtworks: [],
  totalArtworks: 0,
  totalPages: 0,
  pagination: {},
  page: 1,
  catalogList: [],
  catalogItem: [],
  openEdit: false,
  flagCsv: false,
  open: false,
  messageSnack: '',
  style: '',
};

function fbCatalogReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTWORKS_FB_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case SET_ARTWORKS_FB_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SET_ARTWORKS_FB_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case ADD_TO_FB_CATALOG_SUCCESS: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'success',
      };
    }
    case GET_FB_CATALOG_SUCCESS: {
      return {
        ...state,
        catalogList: action.payload.catalog,
        pagination: action.payload.pagination,
        loading: false,
      };
    }
    case GET_FB_CATALOG_ITEM_SUCCESS: {
      return {
        ...state,
        catalogItem: action.payload,
        loading: false,
      };
    }
    case CHANGE_FB_CATALOG_ITEM: {
      return {
        ...state,
        catalogItem: action.payload,
      };
    }
    case SET_EDIT_MODE: {
      return {
        ...state,
        openEdit: !state.openEdit,
      };
    }
    case UPDATE_FB_CATALOG_ITEM_SUCCESS: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'success',
        loading: false,
      };
    }
    case DELETE_ARTWORK_FB_SUCCESS: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'success',
        loading: false,
      };
    }
    case CREATE_CSV_SUCCESS: {
      return {
        ...state,
        flagCsv: true,
      };
    }
    case RESET_CSV: {
      return {
        ...state,
        flagCsv: false,
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

export default fbCatalogReducer;
