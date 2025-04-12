import {
  SET_ACCESS_FILTERS,
  SET_PERMISSION_FILTERS,
  SET_PERMISSION_USERS,
  SET_SEARCH_FILTERS,
  UPDATE_USER_PERMISSION,
} from 'constants/redux/masterPermissions';
import { errorHandler, successHandler } from 'helpers/redux-helpers/helper';
import {
  getUsers,
  sendUserInvite,
  updateUser,
} from 'dataLayer/permissions/masterPermissions';

import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { reset } from 'redux-form';

export const setSearchFilters = payload => ({
  type: SET_SEARCH_FILTERS,
  payload,
});

export const setPermissionFilters = payload => ({
  type: SET_PERMISSION_FILTERS,
  payload,
});

export const setAccessFilters = payload => ({
  type: SET_ACCESS_FILTERS,
  payload,
});

export const getUsersAction = params => (dispatch, getState) => {
  dispatch({ type: SET_PERMISSION_USERS });

  const { form } = getState();
  const searchValues = !params.search && form?.permission?.values;

  getUsers({ ...params, ...searchValues })
    .then(({ data }) => {
      dispatch(successHandler(SET_PERMISSION_USERS, data));
    })
    .catch(error => {
      dispatch(errorHandler(SET_PERMISSION_USERS, error));
      dispatch(displayMessage('Something went wrong', 'error'));
    });
};

export const updateUserAction = (userId, { role, access }) => dispatch => {
  updateUser(userId, { role, access })
    .then(({ data }) => {
      dispatch(successHandler(UPDATE_USER_PERMISSION, data.user));
    })
    .catch(error => {
      dispatch(errorHandler(UPDATE_USER_PERMISSION, error));
      dispatch(displayMessage('Something went wrong', 'error'));
    });
};

export const inviteUserAction = values => dispatch => {
  sendUserInvite(values)
    .then(() => {
      dispatch(reset('invite'));
      return dispatch(displayMessage('User successfully invited'));
    })
    .catch(error => {
      dispatch(displayMessage(error?.response?.data?.message, 'error'));
    });
};
