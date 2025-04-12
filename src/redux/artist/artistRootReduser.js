import * as atelier from './reducers/atelier';

import artistBlogReducer from './reducers/artistBlogReducer';
import artistProfileReducer from './reducers/artistProfileReducer';
import { combineReducers } from 'redux';

const reducers = {
  currentArtist: artistProfileReducer,
  blog: artistBlogReducer,
  atelier: atelier.reducer,
};

const artistRootReducer = combineReducers(reducers);

export default artistRootReducer;
