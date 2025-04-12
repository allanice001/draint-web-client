import { UPDATE_USER_SUBSCRIPTION_DATA_SUCCESS } from '../../../../constants/redux/user';

export default function updateSubscriptionData() {
  return (dispatch, getStore) => {
    getStore().user.account.permissions.plan = getStore().pricing.checkedPlan;
    dispatch({
      type: UPDATE_USER_SUBSCRIPTION_DATA_SUCCESS,

      payload: {
        subscription: getStore().pricing.checkedPlan !== 'Test' && true,
        planId: getStore().pricing.checkedPlanId,
        planName: getStore().pricing.checkedPlan,
      },
    });
  };
}
