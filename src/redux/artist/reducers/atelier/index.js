import * as ACTION from './constants';
export * as actions from './actions';

const form = {
  post: 'atelier-post-form',
  notes: 'atelier-notes-form',
  banner: 'atelier-banner-form',
  process: 'atelier-process-form',
};

const initialState = {
  form,
  editMode: {
    [form.post]: false,
    [form.notes]: false,
    [form.banner]: false,
    [form.process]: false,
  },
  editType: {
    [form.post]: false,
    [form.notes]: false,
    [form.banner]: false,
    [form.process]: false,
  },
  empty: false,
  emptyPageImage: null,
  banner: null,
  posts: [],
  notes: null,
  process: null,
  error: null,
  loading: true,
  isOwner: false,
  isOpenModal: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.CREATE_ATELIER_LOADING:
    case ACTION.UPDATE_ATELIER_LOADING:
    case ACTION.INITIALIZE_ATELIER_LOADING:
    case ACTION.DELETE_POST_BY_MASTER_LOADING:
    case ACTION.ATELIER_SET_LOADING: {
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    }

    case ACTION.ATELIER_SET_EDIT_TYPE: {
      const { name, value } = action.payload;

      return {
        ...state,
        editType: {
          ...state.editMode,
          [name]: value,
        },
      };
    }

    case ACTION.ATELIER_SET_EDIT_MODE: {
      const { name, value } = action.payload;

      return {
        ...state,
        editMode: {
          ...state.editMode,
          [name]: value,
        },
      };
    }

    case ACTION.INITIALIZE_ATELIER_SUCCESS: {
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    }

    case ACTION.ATELIER_GET_DATA_SUCCESS: {
      const { banner, posts, notes, process } = action.payload;
      const isEmpty = !(banner || posts || notes || process);

      return {
        ...state,
        ...action.payload,
        loading: false,
        empty: isEmpty,
      };
    }

    case ACTION.CREATE_ATELIER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        posts: action.payload.post
          ? [...state.posts, action.payload.post]
          : state.posts,
        status: action.payload.status || state.status,
        isOpenModal: false,
        loading: false,
      };
    }

    case ACTION.UPDATE_ATELIER_SUCCESS: {
      const { type, status } = action.payload;

      return {
        ...state,
        [type]: action.payload[type],
        status: status || state.status,
        loading: false,
      };
    }

    case ACTION.SET_IS_OPEN_MODAL: {
      return {
        ...state,
        isOpenModal: action.payload,
      };
    }

    case ACTION.DELETE_POST_BY_MASTER_SUCCESS: {
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    }

    case ACTION.INITIALIZE_ATELIER_ERROR:
    case ACTION.ATELIER_GET_DATA_ERROR:
    case ACTION.UPDATE_ATELIER_ERROR:
    case ACTION.DELETE_POST_BY_MASTER_ERROR:
    case ACTION.CREATE_ATELIER_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    case ACTION.ATELIER_UNSET: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}
