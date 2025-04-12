import {
  CREATE_MASTER_POST,
  DELETE_POST,
  SET_CATEGORIES,
  SET_FILTERS,
  SET_LOADING,
  SET_POSTS,
  UPDATE_POST,
} from 'constants/redux/masterBlog';
import { error, success } from 'helpers/redux-helpers/helper';

const initialState = {
  loading: false,
  posts: [],
  categories: [],
  filters: {
    status: '',
    community: '',
    image: '',
    category: '',
    permission: '',
  },
  error: false,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
    case UPDATE_POST:
    case DELETE_POST:
    case SET_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case success(SET_POSTS): {
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        pagination: action.payload.pagination,
      };
    }
    case success(CREATE_MASTER_POST): {
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
      };
    }
    case success(UPDATE_POST): {
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post =>
          post.uuid === action.payload.uuid
            ? { ...action.payload, profile: post.profile }
            : post
        ),
      };
    }
    case success(DELETE_POST): {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(post => post.uuid !== action.payload),
      };
    }
    case success(SET_CATEGORIES): {
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    }
    case error(SET_POSTS):
    case error(SET_CATEGORIES):
    case error(UPDATE_POST):
    case error(DELETE_POST): {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case SET_FILTERS: {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default:
      return state;
  }
};

export default blogReducer;
