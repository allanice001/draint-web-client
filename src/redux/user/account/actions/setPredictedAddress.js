import { change } from 'redux-form';

export default function setPredictedAddress(address) {
  console.log(address);
  return (dispatch) => {
    dispatch(change('addressUpdateForm', 'addressLine1', address.address1));
    dispatch(change('addressUpdateForm', 'addressLine2', address.address2));
    dispatch(change('addressUpdateForm', 'city', address.city));
    dispatch(change('addressUpdateForm', 'state', address.state));
    dispatch(change('addressUpdateForm', 'zipcode', address.zipcode));
    dispatch(change('addressUpdateForm', 'country', address.country));
  };
}
