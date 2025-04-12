import { useDispatch, useSelector } from 'react-redux';

import { fetchBillingTimeLineData } from '../redux/billing/billing-actions';
import { useMemo } from 'react';

export const useTimeline = () => {
  const { account } = useSelector(store => store.user);
  const { billingHistory } = useSelector(store => store.billing.history);
  const { subscription } = account;
  const dispatch = useDispatch();

  useMemo(() => {
    if (subscription && billingHistory) {
      dispatch(fetchBillingTimeLineData());
    }
  }, [dispatch, subscription, billingHistory]);

  const { timeLineHistory } = useSelector(store => store.billing.timeLine);

  const left = timeLineHistory.reduce((accumulator, currentValue) => {
    if (currentValue.active) {
      return currentValue.left;
    }

    return accumulator;
  }, 0);

  return {
    subscription,
    timeLineHistory,
    left,
  };
};
