import {
  fetchItems,
  getCartRates,
  loadCartItems,
  setCartData,
  setCartItems,
} from 'redux/cart/actions/cart-actions';
import { CART_FAIL } from 'constants/components/cart/cart';
import { CartItem } from 'models/cart-item';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getCartItems } from 'dataLayer/cart/cart-requests';

const getCartItemsResponse = () => (dispatch, getState) => {
  const cartId = localStorage.getItem('cartId');
  const state = getState();
  const artworkBuyer = state.user.account.id;

  dispatch(fetchItems(true));
  dispatch(loadCartItems(true));

  getCartItems(cartId, artworkBuyer)
    .then(({ data }) => {
      dispatch(setCartData(data));
      dispatch(setCartItems(data.items.map(item => new CartItem(item))));
      dispatch(fetchItems(false));
      dispatch(loadCartItems(false));
      window.Echo.emit('getCartItemsCount', { id: cartId });
    })
    .then(() => {
      const store = getState();
      const cartItems = store.cart.cartData.cartItems;
      const { user, location } = store.cart.cartData.cartResponse;

      if (cartItems.length) {
        dispatch(getCartRates(cartItems, user[0], location));
      }
    })
    .catch(() => {
      dispatch(fetchItems(false));
      dispatch(loadCartItems(false));
      dispatch(displayMessage(CART_FAIL));
    });
};

export default getCartItemsResponse;
