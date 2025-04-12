import { UPDATE_USER_DATA_SUCCESS } from '../../../../constants/redux/user';

export default function updateSubscriptionData(user) {
  return (dispatch, getState) => {
    getState().user.account.permissions.plan = user.planName;
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: UPDATE_USER_DATA_SUCCESS,

      payload: {
        subscription: user.subscription,
        planId: user.planId,
        planName: user.planName,
        permissions: user.planName,
      },
    });
  };
}
