import {
  DELETE_SINGLE_BLOG_POST,
  GET_SUBSCRIBED_ARTIST_PAGINATION,
  GET_SUBSCRIBED_ARTIST_SUCCESS,
  GET_USER_ARTWORKS_PAGINATION,
  GET_USER_ARTWORKS_SUCCESS,
  GET_USER_AVATAR_SUCCESS,
  SET_BLOG_POST,
  SET_BLOG_POSTS,
  SET_FOR_SALE_STATUS,
  SET_GALLERY_LOADING, SET_SUBSCRIBED_ARTIST_ALL,
  SET_USER_AVATAR_LOADING,
  UPDATE_ARTWORK_PRICE,
  UPDATE_SINGLE_BLOG_POST,
} from 'constants/redux/dashboardGallery';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,

  accountAvatar: {
    loading: false,
  },

  artworks: [],
  artistSubscribed: [],
  artistSubscribedFull: [],
  posts: [],
  contacts: [],
  contact: [],
  editMode: false,
  setOpenModal: false,
  sort: false,
  search: '',
  artworkPagination: {},
  subscriptionsPagination: {},
};

function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GALLERY_LOADING: {
      return {
        ...state,
        loading: !state.loading,
        ...action.payload,
      };
    }
    case GET_USER_ARTWORKS_SUCCESS: {
      return {
        ...state,
        artworks: action.payload,
        loading: false,
      };
    }
    case GET_USER_ARTWORKS_PAGINATION: {
      return {
        ...state,
        artworkPagination: action.payload,
      };
    }
    case GET_SUBSCRIBED_ARTIST_SUCCESS: {
      return {
        ...state,
        artistSubscribed: action.payload,
        loading: false,
      };
    }
    case SET_SUBSCRIBED_ARTIST_ALL: {
      return {
        ...state,
        artistSubscribedFull: action.payload,
        loading: false,
      };
    }
    case GET_SUBSCRIBED_ARTIST_PAGINATION: {
      return {
        ...state,
        subscriptionsPagination: action.payload,
      };
    }
    case SET_USER_AVATAR_LOADING: {
      return {
        ...state,

        accountAvatar: {
          ...state.accountAvatar,
          loading: !state.accountAvatar.loading,
        },
      };
    }
    case GET_USER_AVATAR_SUCCESS: {
      return {
        ...state,

        accountAvatar: {
          ...action.payload,
          loading: false,
        },
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    case SET_BLOG_POSTS: {
      return { ...state, posts: [...state.posts, ...action.payload] };
    }
    case SET_BLOG_POST: {
      return { ...state, posts: [...state.posts, action.payload] };
    }
    case DELETE_SINGLE_BLOG_POST: {
      const posts = state.posts.filter(value => value.uuid !== action.payload);
      return { ...state, posts };
    }
    case UPDATE_SINGLE_BLOG_POST: {
      const updatedPosts = state.posts.map(val => {
        if (action.payload.uuid === val.uuid) {
          return action.payload;
        }
        return val;
      });
      return { ...state, posts: [...updatedPosts] };
    }
    case SET_FOR_SALE_STATUS: {
      const { artworks } = state;
      const updatedArtworks = artworks.map(val => {
        if (val.id === action.payload.id) {
          val.for_sale = action.payload.for_sale;
        }
        return val;
      });
      return { ...state, artworks: [...updatedArtworks] };
    }
    case UPDATE_ARTWORK_PRICE: {
      const { artworks } = state;
      const updatedArtworks = artworks.map(val => {
        if (val.id === action.payload.id) {
          val.price = action.payload.price;
        }
        return val;
      });
      return { ...state, artworks: [...updatedArtworks] };
    }
    default:
      return state;
  }
}

export default galleryReducer;
