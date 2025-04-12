import artistsReducer from './reducers/artistsReducer';
import { combineReducers } from 'redux';

const reducers = {
  publicArtists: artistsReducer,
};

const artistsRootReducer = combineReducers(reducers);

export default artistsRootReducer;
