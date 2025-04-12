import { SET_SHIPMENT_SECTION } from 'constants/redux/publicHomepage';
import axios from 'dataLayer/axiosInstance';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

export const setSection = payload => ({
  type: SET_SHIPMENT_SECTION,
  payload,
});

export const getShipmentSection = () => dispatch => {
  axios
    .get('/api/homepage/shipment-section')
    .then(res => dispatch(setSection(res.data.section)))
    .catch(error => dispatch(errorMessageHandler(error)));
};
