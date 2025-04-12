import {
  ADD_BLOG_TAB,
  SET_DASHBOARD_LOADING,
  SET_USER_STATUS,
} from 'constants/redux/dashboardLayout';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';

const artistTabs = [
  { name: 'Your Profile Image', path: `${PROFILE_GALLERY}/profile-image` },
  { name: 'Your Paintings', path: `${PROFILE_GALLERY}/paintings` },
  { name: 'Your Instagram Feed', path: `${PROFILE_GALLERY}/instagram-feed` },
];

const salesTabs = [
  { name: 'Offers', path: '/dashboard/collector/offers' },
  { name: 'Sold Artworks', path: '/dashboard/collector/sold' },
];

const collectorTabs = [
  { name: 'User', path: `${PROFILE_GALLERY}/profile-image` },
  { name: 'Artworks', path: `${PROFILE_GALLERY}/paintings` },
];

const settingTabs = [
  { name: 'Account', path: '/dashboard/settings/account' },
  { name: 'Pricing', path: '/dashboard/settings/pricing' },
];

const initialState = {
  loading: true,
  gallaryTabs: artistTabs,
  firstCheck: false,
  isArtist: true,
  settingTabs,
  salesTabs,
};

function layoutReduser(state = initialState, action) {
  switch (action.type) {
    case SET_DASHBOARD_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_USER_STATUS: {
      return {
        ...state,
        firstCheck: true,
        isArtist: action.payload,
        gallaryTabs: action.payload ? state.gallaryTabs : collectorTabs,
        loading: false,
      };
    }
    case ADD_BLOG_TAB: {
      if (state.gallaryTabs.filter(val => val.name === 'Blog').length) {
        return state;
      }
      return {
        ...state,
        gallaryTabs: [
          ...state.gallaryTabs,
          { name: 'Blog', path: `${PROFILE_GALLERY}/blog` },
        ],
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default layoutReduser;
