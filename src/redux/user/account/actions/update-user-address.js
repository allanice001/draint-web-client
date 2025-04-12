import { ERROR, WARNING } from 'constants/components/message-statuses';
import {
  EXTERNAL_ADDRESS_ERROR,
  SUCCESS_ADDRESS_MESSAGE,
} from 'constants/components/address/adress-form-notification';
import { ADDRESS_UPDATE_FORM } from 'constants/components/forms';
import { MASTER_ROLE } from 'constants/permissions';
import { UPDATE_LOCATION_DATA_SUCCESS } from 'constants/redux/user';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { getArtistAccountSuccess } from 'redux/artist/actions/artistProfileActions';
import { getArtworkData } from 'redux/artwork/actions/artworkActions';
import { getUserAccountSuccess } from 'redux/dashboard/actions/settingsActions';
import { reset } from 'redux-form';
import { setRequiredSaleInfoModalForms } from 'redux/artwork/actions/artworkActions';
import { updateUserAddressRequest } from 'dataLayer/user/userData';

const updateOwnerAddressInfo = (addressData, locationId) => (
  dispatch,
  getState
) => {
  const { currentArtwork = {} } = getState().artwork.artworkData;
  const { account = {} } = getState().artist.currentArtist;

  if (currentArtwork.ownerInfo.profile_id) {
    dispatch(
      getArtworkData({
        currentArtwork: {
          ...currentArtwork,
          ownerAddress: {
            id: locationId,
            ...addressData,
          },
        },
      })
    );
  }

  if (account.id) {
    dispatch(
      getArtistAccountSuccess({
        ...account,
        location: {
          id: locationId,
          ...addressData,
        },
      })
    );
  }

  return dispatch(setRequiredSaleInfoModalForms({ addressForm: false }));
};

const updateUserAddress = (addressData, profileId) => (dispatch, getState) => {
  const { permission } = getState().user.account;
  const forms = getState().form;

  updateUserAddressRequest(addressData, profileId)
    .then(response => {
      const { locationId } = response.data;

      if (permission !== MASTER_ROLE) {
        if (response.data.error) {
          if (forms.addressUpdateForm) dispatch(reset(ADDRESS_UPDATE_FORM));
          return dispatch(displayMessage(response.data.error, WARNING));
        }

        dispatch({
          type: UPDATE_LOCATION_DATA_SUCCESS,
          payload: {
            address: addressData,
            coords: {
              latitude: addressData.latitude,
              longitude: addressData.longitude,
            },
            locationId,
          },
        });
        dispatch(getUserAccountSuccess({ location: addressData }));

        return dispatch(updateOwnerAddressInfo(addressData, locationId));
      }

      if (response.data.error) {
        if (forms.addressUpdateForm) dispatch(reset(ADDRESS_UPDATE_FORM));
        return dispatch(displayMessage(response.data.error, WARNING));
      }

      dispatch(updateOwnerAddressInfo(addressData, locationId));
      return dispatch(getUserAccountSuccess({ location: addressData }));
    })
    .catch(() => {
      dispatch(displayMessage(EXTERNAL_ADDRESS_ERROR, ERROR));
    });
};

const handleChangeUserAddress = (
  addressData,
  profileId,
  callback
) => dispatch => {
  try {
    dispatch(updateUserAddress(addressData, profileId));
    dispatch(displayMessage(SUCCESS_ADDRESS_MESSAGE));
    if (callback) return callback();
  } catch (error) {
    dispatch(errorMessageHandler(error));
    dispatch(setRequiredSaleInfoModalForms({ addressForm: false }));
  }
};

export default handleChangeUserAddress;
