import { FETCHED, FETCHING } from 'constants/redux/checkout';

import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import nextStep from 'redux/checkout/actions/nextStep';
import setCheckoutData from 'redux/checkout/actions/setCheckoutData';
import setLocationData from 'redux/user/account/actions/setLocationData';
import { setUserData } from 'redux/user/account/actions/setUserData';
import { updateUserAddress } from 'dataLayer/user/userData';

export default function AddressUpdate(values) {
  return (dispatch, getState) => {
    const state = getState();
    if (
      state.user.account.is_artist ||
      state.user.account.is_artist === undefined
    ) {
      dispatch({ type: FETCHING });
      const data = {
        sign_up_token: state.user.account.sign_up_token,
        email: state.user.account.email,
        isArtist: false,
        locationInfo: { ...values },
      };
      return updateUserAddress(data)
        .then(res => {
          dispatch(setLocationData(res.data.location));
          dispatch(setUserData(res.data.account));
          dispatch(displayMessage('Proceed to enter your payment credentials'));
          dispatch({ type: FETCHED });
          dispatch(
            setCheckoutData({
              first_name: res.data.account.first_name,
              last_name: res.data.account.last_name,

              address: {
                addressLine1: res.data.location.addressLine1,
                addressLine2: res.data.location.addressLine2,
                city: res.data.location.city,
                state: res.data.location.state || res.data.location.region,
                zipcode: res.data.location.zipcode,
                postalCode: res.data.location.zipcode,
                country: res.data.location.country,
              },
            })
          );
          dispatch(nextStep());
        })
        .catch(err => {
          console.log(err);
          dispatch(displayMessage(err.response.data.message, 'error'));
        });
    }
    dispatch(
      setCheckoutData({
        address: { ...values },
      })
    );
    dispatch(nextStep());
  };
}
