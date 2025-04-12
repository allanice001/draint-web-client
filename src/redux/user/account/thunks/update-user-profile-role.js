import {
  ARTIST_DASHBOARD,
  COLLECTOR_DASHBOARD,
} from 'constants/components/artist-collector-button';
import { SET_LOADING_USER_DATA } from 'constants/redux/user';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { setUserData } from 'redux/user/account/actions/setUserData';
import updateUserProfileRoleRequest from 'dataLayer/user/update-user-profile-role-request';

const updateUserProfileRole = (params, history) => dispatch => {
  dispatch({ type: SET_LOADING_USER_DATA, payload: true });

  updateUserProfileRoleRequest(params)
    .then(({ data: { account } }) => {
      const {
        is_artist: isArtist,
        is_activated: isActivated,
        isRoleChanged,
      } = account;
      dispatch(setUserData(account));

      if (isArtist && !isActivated && isRoleChanged) {
        return history.push(ARTIST_DASHBOARD);
      }

      if (isArtist) {
        return history.push(ARTIST_DASHBOARD);
      }

      return history.push(COLLECTOR_DASHBOARD);
    })
    .catch(error => {
      dispatch({ type: SET_LOADING_USER_DATA, payload: false });
      dispatch(errorMessageHandler(error));
    });
};

export default updateUserProfileRole;
