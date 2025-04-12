import {
  EXTERNAL_ADDRESS_ERROR,
  INVALID_ADDRESS_ERROR,
  SUCCESS_ADDRESS_MESSAGE,
} from 'constants/components/address/adress-form-notification';
import {
  UPDATE_LOCATION_DATA_FAILURE,
  UPDATE_LOCATION_DATA_SUCCESS,
} from 'constants/redux/user';
import { CURRENT_USER_ADDRESS_UPDATE } from 'constants/api-calls/pricing/address';
import axios from 'dataLayer/axiosInstance';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { setRequiredSaleInfoModalForms } from 'redux/artwork/actions/artworkActions';

const updateAddress = parameters => dispatch => {
  return axios
    .put(CURRENT_USER_ADDRESS_UPDATE, parameters)
    .then(response => {
      dispatch({
        type: UPDATE_LOCATION_DATA_SUCCESS,
        payload: {
          address: parameters,
          coords: {
            latitude: parameters.latitude,
            longitude: parameters.longitude,
          },
          locationId: response.data.locationId,
        },
      });
      dispatch(setRequiredSaleInfoModalForms({ addressForm: false }));
      dispatch(displayMessage(SUCCESS_ADDRESS_MESSAGE));
    })
    .catch(() => {
      dispatch({ type: UPDATE_LOCATION_DATA_FAILURE });
      dispatch(displayMessage(EXTERNAL_ADDRESS_ERROR, 'error'));
    });
};

export default function updateLocationData(address, callback) {
  return async dispatch => {
    try {
      dispatch(updateAddress({ ...address }));
      if (callback) return callback();
    } catch (error) {
      dispatch(displayMessage(INVALID_ADDRESS_ERROR, 'warning'));
    }
  };
}
