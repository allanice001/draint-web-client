import artworkReducer from './reducers/artworkReducer';
import { combineReducers } from 'redux';

const reducers = {
  artworkData: artworkReducer,
};

const artworkRootReducer = combineReducers(reducers);

export default artworkRootReducer;
