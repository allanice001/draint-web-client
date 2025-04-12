import * as fromBilling from './billing/billing-reducer';
import * as fromBlog from './blog';

import { DELETE_USER_DATA_SUCCESS } from '../constants/redux/user';
import artistRootReducer from './artist/artistRootReduser';
import artistsRootReducer from './artists/artistsRootReducer';
import artworkRootReducer from './artwork/artworkRootReducer';
import artworksRootReducer from './artworks/artworksRootReducer';
import cartRootReducer from './cart/cart-root-reducer';
import checkoutReducer from './checkout/checkoutReducer';
import { combineReducers } from 'redux';
import dashboardRootReducer from './dashboard/dashboardRootReducer';
import faqReducer from './faq/reducers/faqReducer';
import filtersReducer from './global/filters/filtersReducer';
import { reducer as formReducer } from 'redux-form';
import homepageRootReducer from './homepage/homeRootReducer';
import legalReducer from './legal/reducers/legalReducer';
import masterRootReducer from './master/masterRootReducer';
import navbarReducer from './global/navbar/navbarReducer';
import notificationReducer from './global/notiifcation/notificationReducer';
import pricingReducer from './pricing/reducers/pricingReducer';
import searchReducer from './search';
import userReducer from './user';

const reducers = {
  user: userReducer,
  notification: notificationReducer,
  master: masterRootReducer,
  dashboard: dashboardRootReducer,
  artist: artistRootReducer,
  artists: artistsRootReducer,
  artwork: artworkRootReducer,
  artworks: artworksRootReducer,
  home: homepageRootReducer,
  filters: filtersReducer,
  navbar: navbarReducer,
  form: formReducer,
  checkout: checkoutReducer,
  pricing: pricingReducer,
  legal: legalReducer,
  cart: cartRootReducer,
  faq: faqReducer,
  blog: fromBlog.reducer,
  billing: fromBilling.reducer,
  search: searchReducer,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
  if (action.type === DELETE_USER_DATA_SUCCESS) {
    state.form = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
