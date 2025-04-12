import axios from '../../../dataLayer/axiosInstance';
import getShipmentRate from '../actions/getShipmentRate';

export default function getShippingRates(id) {
  return (dispatch, getState) => {
    const state = getState();
    const address = state.form[`addressForm-${id}`].values;
    axios
      .get(
        `/api/shipping/get-rates?address=${JSON.stringify(address)}&id=${id}`
      )
      .then(response => {
        dispatch(getShipmentRate({ shipping: response.data, id }));
      })
      .catch(response => {
        console.log(response);
      });
  };
}
