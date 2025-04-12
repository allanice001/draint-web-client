import setCheckoutData from '../actions/setCheckoutData';

export default function setUserToCheckout(payload) {
  return (dispatch, getState) => {
    const { account } = getState().user;
    dispatch(setCheckoutData({
      ...{
        first_name: account.first_name,
        last_name: account.last_name,
      },

      ...payload,
    }));
  };
}
