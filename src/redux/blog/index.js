import * as ACTION from './constants';
export * as actions from './actions';

const initialState = {
  loading: false,
  error: null,
  categories: null,
  pagination: {},
  popular: null,
  main: null,
  posts: null,
  footer_blogs: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case ACTION.GET_POSTS_SUCCESS:
    case ACTION.GET_CATEGORY_POSTS_SUCCESS:
    case ACTION.GET_POPULAR_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }
    case ACTION.GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    }
    case ACTION.GET_FOOTER_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        footer_blogs: action.payload.data,
      };
    }
    case ACTION.GET_POSTS_ERROR:
    case ACTION.GET_CATEGORIES_ERROR:
    case ACTION.GET_FOOTER_POSTS_ERROR:
    case ACTION.GET_CATEGORY_POSTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
