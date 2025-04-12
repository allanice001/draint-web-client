import cartReducer from './reducers/cart-reducer';
import { combineReducers } from 'redux';

const reducers = {
  cartData: cartReducer,
};

const cartRootReducer = combineReducers(reducers);

export default cartRootReducer;
