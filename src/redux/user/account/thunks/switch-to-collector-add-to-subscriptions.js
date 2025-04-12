import { COLLECTOR_DASHBOARD } from 'constants/components/artist-collector-button';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { saveNewsLetter } from 'redux/global/footer/footer-actions';
import { setUserData } from 'redux/user/account/actions/setUserData';
import updateUserProfileRoleRequest from 'dataLayer/user/update-user-profile-role-request';

const switchToCollectorAddToSubscriptions = (
  account,
  email,
  history
) => dispatch => {
  updateUserProfileRoleRequest(account)
    .then(({ data: { account } }) => {
      const { profile_id: profileId } = account;
      dispatch(setUserData(account));
      history.push(COLLECTOR_DASHBOARD);
      dispatch(saveNewsLetter(email, profileId));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export default switchToCollectorAddToSubscriptions;
