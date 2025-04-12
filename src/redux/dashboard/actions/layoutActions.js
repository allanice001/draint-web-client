import {
  ADD_BLOG_TAB,
  SET_DASHBOARD_LOADING,
  SET_USER_STATUS,
} from '../../../constants/redux/dashboardLayout';

export const setLoading = () => ({
  type: SET_DASHBOARD_LOADING,
});

export const setIsArtist = payload => ({
  type: SET_USER_STATUS,
  payload,
});

export const setBlogTab = () => ({
  type: ADD_BLOG_TAB,
});
