import { SET_PLANS_FROM_QUERY } from '../../../constants/redux/pricing';
import { getPlansList } from '../../../dataLayer/pricing/subscriptons-data';

const getSubscriptionsList = () => dispatch => {
  getPlansList().then(res => {
    dispatch({
      type: SET_PLANS_FROM_QUERY,

      payload: {
        plans: res.data.plans,
      },
    });
  });
};

export default getSubscriptionsList;
