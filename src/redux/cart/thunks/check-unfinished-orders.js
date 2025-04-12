import { CART_CLEARED_AO } from 'constants/components/cart/cart';
import { checkUnfinishedOrders } from 'dataLayer/cart/cart-requests';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { fetchItems } from 'redux/cart/actions/cart-actions';

export default function handleCheckUnfinishedOrders() {
  return (dispatch, getState) => {
    const state = getState();
    const cartItems = state.cart.cartData.cartItems;
    const accountId = state.user.account.id;
    const cartId = localStorage.getItem('cartId');
    dispatch(fetchItems(true));

    return checkUnfinishedOrders(cartItems, accountId, cartId)
      .then(result => {
        const { cartCleared } = result.data;

        if (cartCleared) {
          dispatch(displayMessage(CART_CLEARED_AO));
        }

        dispatch(fetchItems(false));

        return cartCleared;
      })
      .catch(() => {
        dispatch(fetchItems(false));
      });
  };
}
