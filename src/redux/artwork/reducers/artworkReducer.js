import {
  ADD_PUBLIC_ARTWORK_TO_CART,
  CHANGE_PUBLIC_ARTWORK_FOR_SALE_STATUS,
  CHANGE_PUBLIC_ARTWORK_STATUS,
  GET_PUBLIC_ARTWORK_DATA,
  GET_PUBLIC_ARTWORK_DATA_ERROR,
  GET_PUBLIC_ARTWORK_MEDIUM,
  GET_PUBLIC_ARTWORK_RATES,
  GET_PUBLIC_ARTWORK_STYLES,
  GET_PUBLIC_ARTWORK_STYLES_PAGINATION,
  GET_PUBLIC_ARTWORK_SURFACE,
  SET_ARTWORK_PAGE_UNLOGGED_MODAL,
  SET_DELETE_MODAL,
  SET_EDIT_MODE,
  SET_GALLERY_MODAL,
  SET_INITIAL_STATE,
  SET_OFFER_CHECKOUT,
  SET_OFFER_MODAL,
  SET_PUBLIC_ARTWORK_GALLARY,
  SET_PUBLIC_ARTWORK_HASHTAG,
  SET_PUBLIC_ARTWORK_LOADING,
  SET_PUBLIC_ARTWORK_RATES,
  SET_REQUIRED_SALE_INFO_MODAL_FORMS,
  SET_REQUIRED_SALE_INFO_MODAL_OPEN,
  SET_SWITCH_ROLE_MODAL,
  UPDATE_PUBLIC_ARTWORK_HASHTAGS,
} from 'constants/redux/publicArtwork';

const initialState = {
  loading: true,
  inCart: false,
  inOrder: false,
  artworkPageUnloggedModal: false,
  isRequiredSaleInfoModalOpen: false,
  switchRoleModal: false,

  requiredSaleInfoModalForms: {
    addressForm: false,
    profileForm: false,
    statusForm: false,
  },

  profile_id: '',
  stylesList: [],
  mediumsList: [],
  surfacesList: [],
  hashtag: '',
  hashtags: [],
  gallerySteps: {},

  currentArtwork: {
    id: '',
    primary_image: '',
    verification: '',
    title: '',
    for_sale: false,
    price: 0.0,
    width: 0,
    height: 0,
    thickness: 0,
    weight: '',
    style: [],
    medium: [],
    surface: [],
    completed: '',
    description: '',

    purchase_history: {
      artworks_purchase_history: [],
      above_original_price: 0,
      avg_price_increase: 0,
      avg_month_increase: 0,
    },

    authorInfo: {
      profile_id: '',
      account_id: '',
      firstName: '',
      lastName: '',
      username: '',
      location: '',
    },

    ownerInfo: {
      profile_id: '',
      account_id: '',
      firstName: '',
      lastName: '',
      username: '',
      location: '',
    },

    ratesFetching: false,
    shipping: {
      rates: [],
      lowestRatePrice: '',
      lowestRateCode: '',
      lowestRateName: '',
    },
    priceInfo: {},
    priceInfoFetching: true,
    ratesRequested: false,
    isCheckoutOrder: false,
  },
  offerCheckout: {},
  offerModalOpen: false,
  deleteModalOpen: false,
  editMode: false,
  galleryModalOpen: false,
};

function artworkReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PUBLIC_ARTWORK_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SET_REQUIRED_SALE_INFO_MODAL_OPEN: {
      return {
        ...state,
        isRequiredSaleInfoModalOpen:
          typeof action.payload === 'boolean'
            ? action.payload
            : !state.isRequiredSaleInfoModalOpen,
      };
    }
    case SET_REQUIRED_SALE_INFO_MODAL_FORMS: {
      return {
        ...state,
        requiredSaleInfoModalForms: {
          ...state.requiredSaleInfoModalForms,
          ...action.payload,
        },
      };
    }
    case GET_PUBLIC_ARTWORK_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_OFFER_CHECKOUT: {
      return {
        ...state,
        offerCheckout: action.payload,
      };
    }
    case GET_PUBLIC_ARTWORK_DATA_ERROR: {
      return {
        ...initialState,
      };
    }
    case SET_EDIT_MODE: {
      return {
        ...state,
        editMode: action.payload,
      };
    }
    case SET_DELETE_MODAL: {
      return {
        ...state,
        deleteModalOpen: action.payload,
      };
    }
    case SET_GALLERY_MODAL: {
      return {
        ...state,
        galleryModalOpen: action.payload,
      };
    }
    case SET_OFFER_MODAL: {
      return {
        ...state,
        offerModalOpen: action.payload,
      };
    }
    case ADD_PUBLIC_ARTWORK_TO_CART: {
      return {
        ...state,
        inCart: true,
      };
    }
    case CHANGE_PUBLIC_ARTWORK_FOR_SALE_STATUS: {
      return {
        ...state,

        currentArtwork: {
          ...state.currentArtwork,
          for_sale: action.payload,
        },
      };
    }
    case CHANGE_PUBLIC_ARTWORK_STATUS: {
      return {
        ...state,

        currentArtwork: {
          ...state.currentArtwork,
          verification: action.payload,
        },
      };
    }
    case GET_PUBLIC_ARTWORK_STYLES: {
      return {
        ...state,
        stylesList: action.payload,
      };
    }
    case GET_PUBLIC_ARTWORK_STYLES_PAGINATION: {
      return {
        ...state,
        stylesPaginate: action.payload,
      };
    }
    case GET_PUBLIC_ARTWORK_MEDIUM: {
      return {
        ...state,
        mediumsList: action.payload,
      };
    }
    case GET_PUBLIC_ARTWORK_SURFACE: {
      return {
        ...state,
        surfacesList: action.payload,
      };
    }
    case SET_PUBLIC_ARTWORK_HASHTAG: {
      return {
        ...state,
        hashtag: action.payload,
      };
    }
    case SET_PUBLIC_ARTWORK_GALLARY: {
      return {
        ...state,
        gallerySteps: action.payload,
      };
    }
    case UPDATE_PUBLIC_ARTWORK_HASHTAGS: {
      return {
        ...state,
        hashtag: '',
        hashtags: action.payload,
      };
    }
    case SET_INITIAL_STATE: {
      return initialState;
    }
    case GET_PUBLIC_ARTWORK_RATES: {
      const updatedState = { ...state };
      updatedState.currentArtwork.ratesFetching = !updatedState.currentArtwork
        .ratesFetching;
      updatedState.currentArtwork.ratesRequested = true;
      return {
        ...updatedState,
      };
    }
    case SET_PUBLIC_ARTWORK_RATES: {
      const updatedState = { ...state };
      updatedState.currentArtwork.shipping = { ...action.payload };
      updatedState.currentArtwork.ratesFetching = false;
      return {
        ...updatedState,
      };
    }
    case SET_ARTWORK_PAGE_UNLOGGED_MODAL: {
      return {
        ...state,
        artworkPageUnloggedModal: action.payload,
      };
    }
    case SET_SWITCH_ROLE_MODAL: {
      return {
        ...state,
        switchRoleModal: action.payload,
      };
    }
    default:
      return state;
  }
}

export default artworkReducer;
