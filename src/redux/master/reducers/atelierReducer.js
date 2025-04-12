import {
  DELETE_POST_BY_MASTER,
  MASTER_UPDATE_ATELIER,
  SET_ATELIER_POSTS,
  SET_FILTERS,
  UPDATE_TITLES_BY_MASTER,
} from 'constants/redux/masterAtelier';
import { error, success } from 'helpers/redux-helpers/helper';

const initialState = {
  loading: false,
  posts: [],
  filters: {
    status: '',
    public: '',
  },
  titles: {},
  error: false,
};

const atelierReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ATELIER_POSTS:
    case MASTER_UPDATE_ATELIER:
    case DELETE_POST_BY_MASTER: {
      return {
        ...state,
        loading: true,
      };
    }
    case success(SET_ATELIER_POSTS): {
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        pagination: action.payload.pagination,
        titles: action.payload.titles[0],
      };
    }
    case success(UPDATE_TITLES_BY_MASTER): {
      return {
        ...state,
        loading: false,
        titles: action.payload,
      };
    }
    case success(MASTER_UPDATE_ATELIER): {
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post =>
          post.aid === action.payload.postId
            ? {
                ...post,
                status: action.payload.status,
                public: action.payload.public,
              }
            : post
        ),
      };
    }
    case success(DELETE_POST_BY_MASTER): {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    }
    case error(SET_ATELIER_POSTS):
    case error(MASTER_UPDATE_ATELIER):
    case error(DELETE_POST_BY_MASTER): {
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

    default:
      return state;
  }
};

export default atelierReducer;
