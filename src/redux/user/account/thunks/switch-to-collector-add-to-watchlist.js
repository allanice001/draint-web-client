import { COLLECTOR_WATCHLIST } from 'constants/components/artist-collector-button';
import { SET_LOADING_USER_DATA } from 'constants/redux/user';
import { addToWatchlistRequest } from 'dataLayer/watchlist/requests';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { setUserData } from 'redux/user/account/actions/setUserData';
import updateUserProfileRoleRequest from 'dataLayer/user/update-user-profile-role-request';

const switchToCollectorAddToWatchlist = (
  params,
  artworkId,
  history
) => dispatch => {
  dispatch({ type: SET_LOADING_USER_DATA, payload: true });

  updateUserProfileRoleRequest(params)
    .then(({ data: { account } }) => {
      const { id: accountId } = account;

      addToWatchlistRequest(accountId, artworkId)
        .then(({ data }) => {
          dispatch(setUserData(account));
          history.push(COLLECTOR_WATCHLIST);
          dispatch(displayMessage(data.message));
        })
        .catch(error => {
          dispatch({ type: SET_LOADING_USER_DATA, payload: false });
          dispatch(errorMessageHandler(error));
        });
    })
    .catch(error => {
      dispatch({ type: SET_LOADING_USER_DATA, payload: false });
      dispatch(errorMessageHandler(error));
    });
};

export default switchToCollectorAddToWatchlist;
