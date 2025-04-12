import * as ACTION from './constants';

import { APPROVED, DISAPPROVED, PENDING, WAITING } from 'constants/statuses';
import {
  createAtelierContent,
  createAtelierPage,
  getArtistAtelier,
  updateAtelierContent,
} from 'dataLayer/atelier/ateliers';

import { Permissions } from 'models/user-permission';
import { Types } from 'constants/permissions';
import { createImageFile } from 'services/images/imageService';
import displayMessage from '../../../global/notiifcation/actions/displayMessage';
import { uploadMediaFileViaSignedUrl } from 'services/media/media.service';

export const setLoading = (type, payload) => {
  return {
    type: type,
    payload,
  };
};

export const setEditMode = payload => {
  return {
    type: ACTION.ATELIER_SET_EDIT_MODE,
    payload,
  };
};

export const setEditType = payload => {
  return {
    type: ACTION.ATELIER_SET_EDIT_TYPE,
    payload,
  };
};

export const setSuccess = (type, payload) => {
  return {
    type: type,
    payload,
  };
};

export const setError = (type, payload) => {
  return {
    type: type,
    payload,
  };
};

export const setIsOpenModal = payload => ({
  type: ACTION.SET_IS_OPEN_MODAL,
  payload,
});

export const unsetStore = () => {
  return {
    type: ACTION.ATELIER_UNSET,
  };
};

export const getAtelier = () => async (dispatch, getState) => {
  const state = getState();
  const { user, artist } = state;
  const isOwner = user.account.id === artist.currentArtist.account.id;
  const permissions = Permissions.create(state.user.account);
  const canUse = permissions.hasAccess(Types.Atelier);

  dispatch(setLoading(ACTION.ATELIER_SET_LOADING, { loading: true, isOwner }));
  getArtistAtelier(artist.currentArtist.account.profile_id)
    .then(result => {
      dispatch(unsetStore());
      dispatch(
        setSuccess(ACTION.ATELIER_GET_DATA_SUCCESS, {
          ...result.data,
          isOwner,
          canUse,
        })
      );
    })
    .catch(error => dispatch(setError(ACTION.ATELIER_GET_DATA_ERROR, error)));
};

export const createAtelier = () => async (dispatch, getState) => {
  const state = getState();
  const { profile_id: profileId } = state.user.account;

  dispatch(setLoading(ACTION.INITIALIZE_ATELIER_LOADING), { loading: true });
  createAtelierPage({
    profileId,
  })
    .then(async ({ data }) => {
      dispatch(setSuccess(ACTION.INITIALIZE_ATELIER_SUCCESS, data));
    })
    .catch(error => {
      dispatch(setError(ACTION.INITIALIZE_ATELIER_ERROR, error));
      dispatch(displayMessage(error.response.data.message, 'error'));
    });
};

export const saveForm = name => async (dispatch, getState) => {
  const state = getState();
  const { status, id: atelierId } = state.artist.atelier;
  const form = state.form[name];
  const editType = state.artist.atelier.editType;
  const { profile_id: profileId } = state.artist.currentArtist.account;

  if (!form.values) {
    return () => {
      dispatch(setEditType(null));
      dispatch(setEditMode({ name, value: false }));
    };
  }

  const imageFile = form.values.image && createImageFile(form.values.image);
  const type = name.split('-')[1];

  const parseImage = () => {
    if (form.values.image)
      return {
        image: createImageFile(form.values.image).type,
      };
  };

  const checkStatus = statusName => {
    if (statusName === APPROVED) {
      return { atelierId: atelierId, status: PENDING };
    }

    if (statusName === DISAPPROVED) {
      return { atelierId: atelierId, status: WAITING };
    }
  };

  const parseEmptyValues = data => {
    const returnedObject = {};
    for (let value of Object.entries(data)) {
      if (value[1] === '') {
        returnedObject[value[0]] = ' ';
      }
    }
    return returnedObject;
  };

  const onPostCreate = type === 'post' && checkStatus(status);

  const data = form.values;
  const oldImages = data.primary_image && {
    primary_image: data.primary_image,
    small_image: data.small_image,
  };

  const updateAtelierData = () => {
    const data = state.artist.atelier[type];
    dispatch(setLoading(ACTION.UPDATE_ATELIER_LOADING), { loading: true });
    updateAtelierContent(
      {
        id: data.id,
        ...form.values,
        ...parseEmptyValues(form.values),
        ...checkStatus(status),
        ...parseImage(),
        ...oldImages,
      },
      type
    )
      .then(async ({ data }) => {
        if (data.presignedUrl) {
          await uploadMediaFileViaSignedUrl(imageFile, data.presignedUrl);
        }

        dispatch(
          setSuccess(ACTION.UPDATE_ATELIER_SUCCESS, {
            [type]: data[type],
            type: type,
            ...checkStatus(status),
          })
        );
        dispatch(setEditMode({ name, value: false }));
        dispatch(setEditType({ name, value: false }));
      })
      .catch(error => {
        dispatch(setError(ACTION.UPDATE_ATELIER_ERROR, error));
        dispatch(displayMessage(error.response.data.message, 'error'));
        dispatch(setEditMode({ name, value: false }));
        dispatch(setEditType({ name, value: false }));
      });
  };

  const createAtelierData = () => {
    dispatch(setLoading(ACTION.CREATE_ATELIER_LOADING), { loading: true });
    createAtelierContent(
      {
        profileId,
        ...form.values,
        ...parseImage(),
        ...onPostCreate,
      },
      type
    )
      .then(async ({ data }) => {
        if (data.presignedUrl) {
          await uploadMediaFileViaSignedUrl(imageFile, data.presignedUrl);
        }

        dispatch(
          setSuccess(ACTION.CREATE_ATELIER_SUCCESS, {
            [type]: data[type],
            ...checkStatus(status),
          })
        );
        dispatch(setEditMode({ name, value: false }));
      })
      .catch(error => {
        dispatch(setError(ACTION.CREATE_ATELIER_ERROR, error));
        dispatch(displayMessage(error.response.data.message, 'error'));
        dispatch(setEditMode({ name, value: false }));
      });
  };

  if (editType[name]) {
    return updateAtelierData();
  }

  return createAtelierData();
};
