import { INITIAL_STEP } from 'constants/redux/checkout';

export function setInitialCheckoutStep() {
  return { type: INITIAL_STEP };
}
