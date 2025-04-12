const updateStoreData = (checkedPlanId, checkedPlan) => {
  if (checkedPlan !== 'Standard') {
    const user = JSON.parse(localStorage.getItem('user'));
    user.subscription = true;
    user.planId = checkedPlanId;
    user.planName = checkedPlan;
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    const user = JSON.parse(localStorage.getItem('user'));
    user.subscription = false;
    user.planId = checkedPlanId;
    user.planName = checkedPlan;
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export default updateStoreData;
