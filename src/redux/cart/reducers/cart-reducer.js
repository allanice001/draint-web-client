import {
  CALCULATING,
  GET_CART_ITEMS,
  LOAD_CART_ITEMS,
  SET_CART_DATA,
  SET_CART_ITEMS,
  SET_CART_TOTAL,
} from 'constants/redux/cart';

const initialState = {
  fetchItems: false,
  loadCartItems: false,
  cartItems: [],
  cartResponse: [],
  cartTotal: '0',
  calculating: false,
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS: {
      return {
        ...state,
        fetchItems: action.payload,
      };
    }
    case LOAD_CART_ITEMS: {
      return {
        ...state,
        loadCartItems: action.payload,
      };
    }
    case SET_CART_ITEMS: {
      return {
        ...state,
        cartItems: action.payload,
      };
    }
    case SET_CART_DATA: {
      return {
        ...state,
        cartResponse: action.payload,
      };
    }
    case SET_CART_TOTAL: {
      return {
        ...state,
        cartTotal: action.payload,
      };
    }
    case CALCULATING: {
      return {
        ...state,
        calculating: action.payload,
      };
    }
    default:
      return state;
  }
}

export default cartReducer;
