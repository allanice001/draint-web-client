import {
  ADD_ARTWORK_TO_CART_IN_FILTER_ARTWORKS,
  ADD_ARTWORK_TO_CART_IN_FILTER_ARTWORKS_BY_PRICE,
  GET_HOMEPAGE_DATA_ERROR,
  GET_HOMEPAGE_DATA_SUCCESS,
  SET_FILTER_ARTWORKS_BY_PRICE_SUCCESS,
  SET_HOMEPAGE_FILTER_ARTWORKS_SUCCESS,
  SET_HOMEPAGE_LOADING,
  SET_LESS_HOMEPAGE_STYLES_SUCCESS,
  SET_MORE_HOMEPAGE_FILTER_ARTWORKS_SUCCESS,
  SET_MORE_HOMEPAGE_STYLES_SUCCESS,
  SET_SLIDES_SUCCESS,
} from 'constants/redux/publicHomepage';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';
import { updateInCart } from 'helpers/redux-helpers/helper';

const initialState = {
  loading: false,
  newArtists: [],
  artworksForSale: [],
  slider: [],
};

function artworksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HOMEPAGE_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_HOMEPAGE_DATA_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        // loading: false,
      };
    }

    case SET_FILTER_ARTWORKS_BY_PRICE_SUCCESS: {
      return {
        ...state,
        artworksByPrice: action.payload,
      };
    }

    case ADD_ARTWORK_TO_CART_IN_FILTER_ARTWORKS_BY_PRICE: {
      return {
        ...state,
        artworksByPrice: {
          ...state.artworksByPrice,
          artworks: updateInCart({
            artworkId: action.payload,
            list: [...state.artworksByPrice.artworks],
          }),
        },
      };
    }

    case SET_SLIDES_SUCCESS: {
      return {
        ...state,
        slider: action.payload,
        loading: false,
      };
    }

    case SET_MORE_HOMEPAGE_STYLES_SUCCESS: {
      return {
        ...state,
        stylesPaginate: {
          styles: [...state.stylesPaginate.styles, ...action.payload.styles],
          pagination: action.payload.pagination,
        },
      };
    }

    case SET_LESS_HOMEPAGE_STYLES_SUCCESS: {
      return {
        ...state,
        stylesPaginate: {
          ...state.stylesPaginate,
          styles: state.stylesPaginate.styles.slice(0, 24),
        },
      };
    }

    case SET_MORE_HOMEPAGE_FILTER_ARTWORKS_SUCCESS: {
      const { artworks, pagination } = action.payload;
      return {
        ...state,
        artworksPaginate: {
          ...state.artworksPaginate,
          artworks: [...state.artworksPaginate.artworks, ...artworks],
          pagination,
        },
      };
    }

    case ADD_ARTWORK_TO_CART_IN_FILTER_ARTWORKS: {
      return {
        ...state,
        artworksPaginate: {
          ...state.artworksPaginate,
          artworks: updateInCart({
            artworkId: action.payload,
            list: [...state.artworksPaginate.artworks],
          }),
        },
      };
    }

    case SET_HOMEPAGE_FILTER_ARTWORKS_SUCCESS: {
      const { filter, artworks, pagination } = action.payload;
      return {
        ...state,
        artworksPaginate: {
          filter,
          artworks,
          pagination,
        },
      };
    }

    case GET_HOMEPAGE_DATA_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }

    // case SET_HOMEPAGE_ART_STYLE: {
    //   return {
    //     ...state,
    //     artStyle: action.payload,
    //   };
    // }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    // case SET_HOMEPAGE_COUNTRY: {
    //   return {
    //     ...state,
    //     country: action.payload,
    //   };
    // }
    // case SET_HOMEPAGE_ARTIST_NAME: {
    //   return {
    //     ...state,
    //     artistName: action.payload,
    //   };
    // }
    // case SET_HOMEPAGE_HASHTAG: {
    //   return {
    //     ...state,
    //     hashtag: action.payload,
    //   };
    // }
    default:
      return state;
  }
}
export default artworksReducer;
