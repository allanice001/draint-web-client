import { combineReducers } from 'redux';
import loaderReducer from './loader/loaderReducer';
import queryReduser from '../general/queryReducer';
import userReducer from './account/userReducer';

const reducers = {
  account: userReducer,
  loader: loaderReducer,
  query: queryReduser,
};

const IndexUserReducer = combineReducers(reducers);

export default IndexUserReducer;
