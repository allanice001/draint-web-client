import artworksReducer from './reducers/artworksReducer';
import { combineReducers } from 'redux';

const reducers = {
  publicArtworks: artworksReducer,
};

const artworksRootReducer = combineReducers(reducers);

export default artworksRootReducer;
