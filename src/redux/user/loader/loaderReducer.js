import {
  SET_ARTWORK_UPLOADING_STATE,
  SET_LOADING_STATE,
  SET_UPLOADED_COUNT_STATE,
} from 'constants/redux/user';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialLoadState = {
  state: false,
  artworkLoader: false,
  uploadCount: 0,
};

function loadReducer(state = initialLoadState, action) {
  switch (action.type) {
    case SET_LOADING_STATE: {
      return { ...state, state: action.payload };
    }
    case SET_ARTWORK_UPLOADING_STATE: {
      return { ...state, artworkLoader: action.payload };
    }
    case SET_UPLOADED_COUNT_STATE: {
      return {
        ...state,

        uploadCount:
          state.uploadCount + action.payload > 100
            ? 0 + action.payload
            : state.uploadCount + action.payload,
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialLoadState;
    }
    default:
      return state;
  }
}

export default loadReducer;
