import {
  CALCULATING,
  GET_CART_ITEMS,
  LOAD_CART_ITEMS,
  SET_CART_DATA,
  SET_CART_ITEMS,
  SET_CART_TOTAL,
} from 'constants/redux/cart';
import {
  DELETE_ERROR,
  EMPTY_RATE_MESSAGE,
  GEOLOCATION_MESSAGE,
} from 'constants/components/cart/cart';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { WARNING } from 'constants/components/message-statuses';
import { deleteCartItem } from 'dataLayer/cart/cart-requests';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import getGeolocation from 'services/geolocation-service';
import { getGeolocationByCoords } from 'dataLayer/user/userData';
import handleCartItemsRates from 'redux/cart/thunks/get-cart-items-rates';

export const calculating = status => ({
  type: CALCULATING,
  payload: status,
});

export const loadCartItems = status => ({
  type: LOAD_CART_ITEMS,
  payload: status,
});

export const fetchItems = status => ({
  type: GET_CART_ITEMS,
  payload: status,
});

export const setCartItems = items => ({
  type: SET_CART_ITEMS,
  payload: items,
});

export const setCartData = cartData => ({
  type: SET_CART_DATA,
  payload: cartData,
});

export const setCartTotal = cartTotal => ({
  type: SET_CART_TOTAL,
  payload: cartTotal,
});

export const emptyRateMessage = rateError => dispatch => {
  if (rateError) return dispatch(displayMessage(EMPTY_RATE_MESSAGE, WARNING));
};

export const removeCatItem = (cartId, artworkId, buyerId, sellerId) => (
  dispatch,
  getState
) => {
  const state = getState();
  deleteCartItem(cartId, artworkId, buyerId, sellerId)
    .then(() => {
      const cartItems = state.cart.cartData.cartItems;
      const items = cartItems.filter(item => item.id !== artworkId);
      window.Echo.emit('getCartItemsCount', { id: cartId });

      ReactPixel.trackCustom('ItemRemovedFromCart', {
        content_category: 'Product',
        content_name: 'Item removed from the cart',
        contents: [
          {
            artworkId,
            user: state.user.account,
          },
        ],
      });

      PinterestTag.track('Custom', {
        content_category: 'Product',
        action: 'Item removed from the cart',
        line_items: [
          {
            product_id: artworkId,
          },
        ],
      });

      ReactGA.event({
        category: 'Product',
        label: 'Item removed from the cart',
        action: 'Item Removed FromCart',
      });

      dispatch(setCartItems(items));
    })
    .catch(() => {
      dispatch(errorMessageHandler(DELETE_ERROR));
    });
};

export const calculateCartTotal = items => dispatch => {
  if (items.length) {
    const total = items.reduce((sum, item) => +sum + +item.totalCost, 0);

    return dispatch(setCartTotal(total.toFixed(2)));
  }

  return dispatch(setCartTotal('0'));
};

export const getCartRates = (cartItems, user, location) => async dispatch => {
  if (!location) {
    const geolocation = await getGeolocation();

    if (!geolocation) {
      return dispatch(displayMessage(GEOLOCATION_MESSAGE, WARNING));
    }

    const address = await getGeolocationByCoords(geolocation);
    const buyerAddress = address.data.address;

    return dispatch(handleCartItemsRates(cartItems, buyerAddress));
  }

  const buyerProfileId = user.profile_id;

  return dispatch(handleCartItemsRates(cartItems, buyerProfileId));
};

export const updateCheckout = NewItems => dispatch => {
  dispatch(setCartItems(NewItems));
  dispatch(calculateCartTotal(NewItems));
  dispatch(calculating(false));
};
