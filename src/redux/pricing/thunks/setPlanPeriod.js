import { setPlanPeriod } from '../actions/pricingActions';

const setInitialPlanPeriod = planPeriod => (dispatch) => {
  dispatch(setPlanPeriod(planPeriod));
};

export default setInitialPlanPeriod;
