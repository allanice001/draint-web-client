import {
  ADDRESS_FORM,
  CUSTOMER_FORM,
  PROFILE_FORM,
} from 'constants/components/forms';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { STEP_BACK } from 'constants/redux/checkout';
import { reset } from 'redux-form';
import setInitialState from './setInitialState';

const previousStep = () => (dispatch, getState) => {
  if (getState().checkout.step === 1) {
    dispatch(setInitialState());

    return [CUSTOMER_FORM, ADDRESS_FORM, PROFILE_FORM].map(val =>
      dispatch(reset(val))
    );
  }

  ReactGA.event({
    category: 'Checkout',
    label: 'Customer had return one step back on checkout',
    action: 'CheckoutStepBack',
  });

  ReactPixel.trackCustom('CheckoutStepBack', {
    content_category: 'Checkout',
    content_name: 'Customer had return one step back on checkout',
  });

  PinterestTag.track('Checkout', {
    action: 'CheckoutStepBack',
    content_name: 'Customer had return one step back on checkout',
  });

  return dispatch({ type: STEP_BACK });
};

export default previousStep;
