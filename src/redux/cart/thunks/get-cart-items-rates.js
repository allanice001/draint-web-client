import {
  calculateCartTotal,
  setCartItems,
} from 'redux/cart/actions/cart-actions';
import {
  publicManualRatesRequest,
  publicRatesRequest,
} from 'dataLayer/shipping/requests';
import { RATE_FAIL } from 'constants/components/cart/cart';

const setRateData = (dispatch, cartItems, key, response) => {
  cartItems[key].newRates = response;
  cartItems[key].ratesLoadingStatus = false;
  dispatch(setCartItems(cartItems));
  dispatch(calculateCartTotal(cartItems));
};

const handleCartItemsRates = (cartItems, buyerData) => dispatch => {
  return cartItems.forEach((item, key) => {
    const sellerProfileId = item.seller_profile_id;
    const artworkId = item.id;

    publicRatesRequest(buyerData, sellerProfileId, artworkId)
      .then(({ data: ups }) => {
        if (ups.rateError) {
          return publicManualRatesRequest(buyerData, sellerProfileId, artworkId)
            .then(({ data: manual }) => {
              setRateData(dispatch, cartItems, key, manual);
            })
            .catch(() => {
              cartItems[key].ratesLoadingStatus = false;
              cartItems[key].newRates = { rateError: RATE_FAIL };
            });
        }

        setRateData(dispatch, cartItems, key, ups);
      })
      .catch(() => {
        cartItems[key].ratesLoadingStatus = false;
        cartItems[key].newRates = { rateError: RATE_FAIL };
      });
  });
};

export default handleCartItemsRates;
