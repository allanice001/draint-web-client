import * as ACTIONS from 'redux/billing/billing-actions';
import * as CONSTANTS from '../constants/components/pricing';
import { CARD_PM, DEBIT_PM, STRIPE } from 'constants/components/pricing';
import { useDispatch, useSelector } from 'react-redux';
import BankBlue from 'components/icons/bank-blue';
import MasterCardIcon from 'components/icons/masterCard';
import { useEffect } from 'react';

export const useBillingPM = () => {
  const dispatch = useDispatch();
  const { account } = useSelector(store => store.user);
  const { paymentMethod, isOpenPaymentModal, updating } = useSelector(
    store => store.billing
  );
  const { subscription } = account;

  useEffect(() => {
    if (subscription) {
      dispatch(ACTIONS.fetchBillingMethodData());
    }
  }, [dispatch, subscription]);

  const { type, endingOn, system } = paymentMethod;

  const getIcon = () => {
    if (type === CARD_PM) {
      return MasterCardIcon;
    }

    if (type === DEBIT_PM) {
      return BankBlue;
    }

    return MasterCardIcon;
  };

  const getTitle = () => {
    if (type === CARD_PM) {
      return `Card ends on  ${endingOn}`;
    }

    if (type === DEBIT_PM) {
      return `IBAN ends on ${endingOn}`;
    }

    return MasterCardIcon;
  };

  const getFormType = () => {
    if (type === CONSTANTS.CARD_PM) {
      return CONSTANTS.STRIPE_PM_CARD_FORM;
    }

    return CONSTANTS.STRIPE_PM_SEPA_DEBIT_FORM;
  };

  return {
    isStripe: subscription && system === STRIPE,
    paymentMethod,
    Icon: getIcon(),
    title: getTitle(),
    isOpen: isOpenPaymentModal,
    openPaymentModal: () => dispatch(ACTIONS.openPaymentModal()),
    closePaymentModal: () => dispatch(ACTIONS.closePaymentModal()),
    formType: getFormType(),
    updating,
  };
};
