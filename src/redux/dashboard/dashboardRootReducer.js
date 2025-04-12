import * as fromInterview from '../my-vita/reducers';

import { combineReducers } from 'redux';
import contactToolReducer from './reducers/contactToolReducer';
import galleryReducer from './reducers/galleryReducer';
import layoutReducer from './reducers/layoutReduser';
import ordersReducer from './reducers/ordersReducer';
import salesReducer from './reducers/salesReducer';
import settingsReducer from './reducers/settingsReducer';
import socialMediaReducer from './reducers/socialMediaReducer';
import watchlistReducer from './reducers/watchlistReducer';

const reducers = {
  layout: layoutReducer,
  gallery: galleryReducer,
  watchlist: watchlistReducer,
  settings: settingsReducer,
  socialMedia: socialMediaReducer,
  orders: ordersReducer,
  sales: salesReducer,
  contactTool: contactToolReducer,
  about: fromInterview.reducer,
};

const dashboardRootReducer = combineReducers(reducers);

export default dashboardRootReducer;
