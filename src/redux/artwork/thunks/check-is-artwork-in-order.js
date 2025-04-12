import { WAIT_TRADE_PROCESS_ADD_TO_CART } from 'constants/components/artwork-page';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

const checkIsArtworkInOrder = params => (dispatch, getState) => {
  const state = getState();
  let inOrder;
  if (params) {
    inOrder = params.inOrder;
  } else {
    inOrder = state.artwork.artworkData.inOrder;
  }
  const user = state.user.account.id;

  if (!user) return false;

  if (inOrder) {
    dispatch(displayMessage(WAIT_TRADE_PROCESS_ADD_TO_CART));

    return inOrder;
  }

  return false;
};

export default checkIsArtworkInOrder;
