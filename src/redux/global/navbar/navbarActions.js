import {
  GET_NAVBAR_DATA_SUCCESS,
  SET_IS_NAV_BAR_MENU_OPENED,
  SET_NAVBAR_LOADING,
} from 'constants/redux/global/navbar';

import { navbarAPI } from 'dataLayer/navbar/navbar-api';

export const getNavbarDataSuccess = payload => ({
  type: GET_NAVBAR_DATA_SUCCESS,
  payload,
});

export const setNavbarLoading = () => ({
  type: SET_NAVBAR_LOADING,
});

export const setIsNavBarMenuOpened = payload => ({
  type: SET_IS_NAV_BAR_MENU_OPENED,
  payload,
});

export const setIsNavBarMenuWithTimeout = payload => (dispatch, getState) => {
  const { isNavBarMenuOpened } = getState().navbar;

  if (isNavBarMenuOpened) {
    // compensation for sidebar transition effect on mobile
    setTimeout(dispatch.bind(this, setIsNavBarMenuOpened(payload)), 150);
  } else dispatch(setIsNavBarMenuOpened(payload));
};

export const getNavbarData = () => async dispatch => {
  try {
    dispatch(setNavbarLoading);
    const response = await navbarAPI.getPopularNavBar();
    dispatch(getNavbarDataSuccess(response.data));
  } finally {
    dispatch(setNavbarLoading);
  }
};
