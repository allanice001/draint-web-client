import {
  SET_ARTWORK_UPLOADING_STATE,
  SET_LOADING_STATE,
  SET_UPLOADED_COUNT_STATE,
} from 'constants/redux/user';

export default function setLoadingState(load) {
  return { type: SET_LOADING_STATE, payload: load };
}

export const setArtworkUploading = payload => ({
  type: SET_ARTWORK_UPLOADING_STATE,
  payload,
});

export const setArtworkUploadingCount = payload => ({
  type: SET_UPLOADED_COUNT_STATE,
  payload,
});
