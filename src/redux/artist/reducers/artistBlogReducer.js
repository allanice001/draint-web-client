import {
  ADD_CURRENT_ARTIST_BLOG_POSTS,
  DELETE_CURRENT_SINGLE_BLOG_POST,
  RESET_CURRENT_ARTIST_BLOG_POST,
  SET_ARTIST_POSTS_LOADING,
  SET_CURRENT_ARTIST_BLOG_POST,
  SET_CURRENT_ARTIST_BLOG_POSTS,
  SET_CURRENT_ARTIST_BLOG_POST_ERROR,
  SET_INITIAL_VALUE_OF_CURRENT_ARTIST_POSTS,
  UPDATE_CURRENT_SINGLE_BLOG_POST,
} from 'constants/redux/publicArtistProfile';

const initialState = {
  loading: false,
  posts: [],

  selectedPost: {},
};

function artistBlogReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ARTIST_POSTS_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SET_CURRENT_ARTIST_BLOG_POSTS: {
      return {
        ...state,
        posts: [...action.payload.posts],
        pagination: action.payload.pagination,
        loading: false,
      };
    }
    case SET_CURRENT_ARTIST_BLOG_POST: {
      return {
        ...state,
        selectedPost: action.payload,
        error: false,
        loading: false,
      };
    }
    case RESET_CURRENT_ARTIST_BLOG_POST: {
      return {
        ...state,
        selectedPost: {},
        error: false,
        loading: false,
      };
    }
    case SET_CURRENT_ARTIST_BLOG_POST_ERROR: {
      return { ...state, error: true, loading: false };
    }
    case DELETE_CURRENT_SINGLE_BLOG_POST: {
      const posts = state.posts.filter(value => value.uuid !== action.payload);
      return { ...state, posts };
    }
    case UPDATE_CURRENT_SINGLE_BLOG_POST: {
      return {
        ...state,
        posts: state.posts.map(item =>
          item.uuid === action.payload.uuid
            ? {
                ...action.payload,
                profile: item.profile,
                category: item.category,
              }
            : item
        ),
      };
    }
    case ADD_CURRENT_ARTIST_BLOG_POSTS: {
      return { ...state, posts: [action.payload, ...state.posts] };
    }
    case SET_INITIAL_VALUE_OF_CURRENT_ARTIST_POSTS: {
      return { ...state, posts: [], loading: false };
    }
    default:
      return state;
  }
}

export default artistBlogReducer;
