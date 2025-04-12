import {
  isShippingPrepare,
  sendFinishedSecondStep,
} from 'helpers/shipment/helpers';
import { CALCULATE_MESSAGE } from 'constants/components/checkout/constants';
import { WARNING } from 'constants/components/message-statuses';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import nextStep from 'redux/checkout/actions/nextStep';

export default function setShippingSettings(items) {
  return dispatch => {
    if (isShippingPrepare(items)) {
      sendFinishedSecondStep();
      dispatch(nextStep());
    } else {
      dispatch(displayMessage(CALCULATE_MESSAGE, WARNING));
    }
  };
}
