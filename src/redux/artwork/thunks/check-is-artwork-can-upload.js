import {
  ADD_PROFILE_IMAGE,
  USER_CANT_UPLOAD_ARTWORK_NOTIFICATION,
} from 'constants/components/artworks.contants';
import { ERROR, WARNING } from 'constants/components/message-statuses';
import {
  PROFILE_GALLERY,
  PROFILE_SUBSCRIPTIONS,
} from 'constants/routes/artist-profile';
import { MESSAGE_SOMETHING_WENT_WRONG } from 'constants/global';
import { UPLOAD_ARTWORK } from 'constants/routes/userModule/dashboard';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { handleCheckIsCanUploadArtwork } from 'dataLayer/artwork/artwork';
import { permissions } from 'constants/permissions';
import { updateQueryParams } from 'services/query-string.service';

const checkIsArtworkCanUpload = (history, setIsPricingIsOpen) => async (
  dispatch,
  getState
) => {
  const { account } = getState().user;
  const isMaster = account.permission === permissions.MASTER;

  await handleCheckIsCanUploadArtwork(account.id)
    .then(response => {
      const { canUploadArtwork } = response.data;

      if (canUploadArtwork === false && !isMaster) {
        if (setIsPricingIsOpen) {
          return setIsPricingIsOpen(true);
        }

        dispatch(
          displayMessage(USER_CANT_UPLOAD_ARTWORK_NOTIFICATION, WARNING)
        );

        return history.push(PROFILE_SUBSCRIPTIONS);
      }

      if (!account.avatar || !account.theme) {
        dispatch(displayMessage(ADD_PROFILE_IMAGE, WARNING));
        return history.push(PROFILE_GALLERY);
      }

      return updateQueryParams({
        history,
        path: `${UPLOAD_ARTWORK}/${account.username}`,
      });
    })
    .catch(() => {
      dispatch(displayMessage(MESSAGE_SOMETHING_WENT_WRONG, ERROR));
    });
};

export default checkIsArtworkCanUpload;
