import { UpdateKlarnaOrders } from '../../../dataLayer/pricing/order';
import displayMessage from '../../global/notiifcation/actions/displayMessage';

export const KlarnaOrderUpdate = params => async dispatch => {
  try {
    const res = await UpdateKlarnaOrders(params);
    dispatch(displayMessage(res.data.message));
    console.log(res);
  } catch (err) {
    if (err.response.data)
      dispatch(displayMessage(err.response.data.message, 'error'));
    console.log(err);
  }
};
