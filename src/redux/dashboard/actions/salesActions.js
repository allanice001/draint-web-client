import {
  FETCH_PAYOUTS_ORDERS,
  FETCH_PAYOUTS_ORDERS_SUCCESS,
  SET_COLLECTORS_INCOMING_OFFERS_SUCCESS,
  SET_COLLECTORS_OUTCOMING_OFFERS_SUCCESS,
  SET_PAGE,
  SET_PAGE_SIZE,
  SET_SALES_DASHBOARD_LOADING,
} from 'constants/redux/dashboardSales';
import {
  DECLINED,
  ORDER_ADDED_TO_CART,
  ORDER_RESERVED,
  PAYMENT_CANCELED_OID,
  PAYMENT_FAIL_OWD,
  PAYOUT_REQUEST_SUCCESS,
  VERIFIED,
} from 'constants/components/orders';
import {
  SET_ORDERS_LOADING_FALSE,
  SET_ORDERS_LOADING_TRUE,
} from 'constants/redux/dashboardOrders';
import { ERROR, WARNING } from 'constants/components/message-statuses';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { generateUuid } from 'services/tokenService';
import getFullSalesOffersRequest from 'dataLayer/collector-dashboard/get-full-sales-offers-request';
import getInComingSaleOffersRequest from 'dataLayer/collector-dashboard/get-in-coming-sale-offers-request';
import getOutComingSaleOfferRequest from 'dataLayer/collector-dashboard/get-out-coming-sale-offer-request';
import {
  addOfferToCartRequest,
  confirmOrderPaymentRequest,
  getPayoutsOrdersRequest,
  sendManualPayoutRequest,
  verifyOfferRequest,
} from 'dataLayer/order/order';
import { setCurrentOffer } from './ordersActions';

export const handleSetPage = payload => ({
  type: SET_PAGE,
  payload,
});

export const handleSetPageSize = payload => ({
  type: SET_PAGE_SIZE,
  payload,
});

export const fetchPayoutsOrdersSuccess = payload => ({
  type: FETCH_PAYOUTS_ORDERS_SUCCESS,
  payload,
});

export const fetchPayoutsOrders = payload => ({
  type: FETCH_PAYOUTS_ORDERS,
  payload,
});

export const setLoading = () => ({
  type: SET_SALES_DASHBOARD_LOADING,
});

export const setCollectorsIncomingOffersSuccess = payload => ({
  type: SET_COLLECTORS_INCOMING_OFFERS_SUCCESS,
  payload,
});

export const setCollectorsOutcomingOffersSuccess = payload => ({
  type: SET_COLLECTORS_OUTCOMING_OFFERS_SUCCESS,
  payload,
});

export const getFullSalesOffers = (outComingPage, inComingPage) => dispatch => {
  getFullSalesOffersRequest(outComingPage, inComingPage)
    .then(({ data }) => {
      const { inComing, outComing } = data.offers;
      inComing && dispatch(setCollectorsIncomingOffersSuccess(inComing));
      outComing && dispatch(setCollectorsOutcomingOffersSuccess(outComing));
    })
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const getInComingSalesOffers = (
  inComingPage,
  inComingCount
) => dispatch => {
  getInComingSaleOffersRequest(inComingPage, inComingCount)
    .then(({ data }) => {
      const { inComing } = data.offers;
      inComing && dispatch(setCollectorsIncomingOffersSuccess(inComing));
    })
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const getOutComingSalesOffers = (
  outComingPage,
  outComingCount
) => dispatch => {
  getOutComingSaleOfferRequest(outComingPage, outComingCount)
    .then(({ data }) => {
      const { outComing } = data.offers;
      outComing && dispatch(setCollectorsOutcomingOffersSuccess(outComing));
    })
    .catch(error => dispatch(errorMessageHandler(error)));
};

const addOfferToBuyerCart = (cartData, page, limit) => dispatch => {
  addOfferToCartRequest(cartData)
    .then(res => {
      window.Echo.emit('getCartItemsCount', { id: res.data.cartId });
    })
    .then(() => displayMessage(ORDER_ADDED_TO_CART))
    .catch(() => {
      dispatch(getInComingSalesOffers(page, limit));
      dispatch(displayMessage(ORDER_RESERVED, ERROR));
    });
};

export const changeCollectorsOfferStatus = param => (dispatch, getState) => {
  const {
    currentOffer: { page, pageCount: limit },
  } = getState().dashboard.orders;

  verifyOfferRequest(param)
    .then(({ data }) => {
      if (param.status === VERIFIED) {
        if (data.cartData) {
          const cartData = {
            ...data.cartData,
            cartId: generateUuid(),
          };

          dispatch(addOfferToBuyerCart(cartData, page, limit));

          return dispatch(getInComingSalesOffers(page, limit));
        }

        // verify offer and order and confirm payment if it's new offer
        if (data.orderId) {
          dispatch({ type: SET_ORDERS_LOADING_TRUE });

          return confirmOrderPaymentRequest(data)
            .then(response => {
              const { failPayment = false, isDeclined = false } = response.data;
              failPayment &&
                dispatch(displayMessage(PAYMENT_FAIL_OWD, WARNING));
              isDeclined &&
                dispatch(displayMessage(PAYMENT_CANCELED_OID, WARNING));

              param.offerData.isCheckout = !failPayment && !isDeclined;
              param.offerData.verification =
                failPayment || isDeclined ? DECLINED : VERIFIED;
              dispatch(setCurrentOffer(param.offerData));

              dispatch({ type: SET_ORDERS_LOADING_FALSE });
            })
            .catch(error => {
              dispatch(errorMessageHandler(error));
              dispatch({ type: SET_ORDERS_LOADING_FALSE });
              dispatch(getInComingSalesOffers(page, limit));
            });
        }
      }

      dispatch(getInComingSalesOffers(page, limit));
    })
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const getPayoutsOrders = (page, pageSize) => (dispatch, getState) => {
  const account = getState().user.account;

  getPayoutsOrdersRequest(account.id, page, pageSize)
    .then(response => {
      dispatch(fetchPayoutsOrders(true));
      dispatch(fetchPayoutsOrdersSuccess(response.data));
      dispatch(fetchPayoutsOrders(false));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(fetchPayoutsOrders(false));
    });
};

export const sendManualPayout = (payoutRequest, setIsOpen) => dispatch => {
  sendManualPayoutRequest(payoutRequest)
    .then(() => {
      dispatch(displayMessage(PAYOUT_REQUEST_SUCCESS));
      dispatch(getPayoutsOrders());
      setIsOpen(false);
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};
