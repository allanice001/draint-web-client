import setShipmentRate from '../actions/setShipmentRate';

export default function selectShippingRate(rate) {
  return (dispatch) => {
    dispatch(setShipmentRate(rate));
  };
}
