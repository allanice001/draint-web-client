import {
  CLEAR_SHIPMENT_TRACK_SUCCESS,
  FETCH_IN_COMING_ORDERS_SUCCESS,
  FETCH_OFFERS,
  FETCH_OFFERS_FAILED,
  FETCH_OFFERS_SUCCESS,
  FETCH_ORDERS,
  FETCH_ORDERS_FAILED,
  FETCH_ORDERS_SUCCESS,
  FETCH_OUT_COMING_ORDERS_SUCCESS,
  GET_SHIPMENT_TRACK_SUCCESS,
  SET_AUCTION_MODAL,
  SET_CURRENT_OFFER,
  SET_OFFER_PAGINATION,
  SET_ORDERS_LOADING,
  SET_ORDERS_LOADING_FALSE,
  SET_ORDERS_LOADING_TRUE,
} from 'constants/redux/dashboardOrders';
import {
  COLLECTOR,
  OFFER_SENT,
  ORDER_ADDED_TO_CART,
  ORDER_DECLINED,
  ORDER_RESERVED,
  ORDER_VERIFIED,
  PAYMENT_CANCELED_OID,
  PAYMENT_FAIL_OWD,
  TRACK_NO_INFO,
  VERIFIED,
} from 'constants/components/orders';
import {
  addOfferToCartRequest,
  buyerOfferPriceRequest,
  checkOrderVerificationRequest,
  confirmOrderPaymentRequest,
  confirmOrderPickUpDateRequest,
  deleteWrappedPhotoRequest,
  fetchOffersRequest,
  getOrdersRequest,
  getPackageInfoRequest,
  saveWrappedPhotoRequest,
  sellerOfferPriceRequest,
  verifyOfferRequest,
  verifyOrderRequest,
} from 'dataLayer/order/order';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { ERROR, WARNING } from 'constants/components/message-statuses';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { generateUuid } from 'services/tokenService';
import { setOrdersLoading } from 'redux/master/actions/orders-actions';
import { uploadMediaFileViaSignedUrl } from 'services/media/media.service';

const HelperForAnalytic = AnalyticHelper.create();

export const fetchOutComingOrdersSuccess = payload => ({
  type: FETCH_OUT_COMING_ORDERS_SUCCESS,
  payload,
});

export const fetchInComingOrdersSuccess = payload => ({
  type: FETCH_IN_COMING_ORDERS_SUCCESS,
  payload,
});

export const fetchOrdersSuccess = payload => ({
  type: FETCH_ORDERS_SUCCESS,
  payload,
});

export const fetchOrdersFailed = payload => ({
  type: FETCH_ORDERS_FAILED,
  payload,
});

export const fetchOffersSuccess = payload => ({
  type: FETCH_OFFERS_SUCCESS,
  payload,
});

export const fetchOffersFailed = payload => ({
  type: FETCH_OFFERS_FAILED,
  payload,
});

export const setLoading = () => ({
  type: SET_ORDERS_LOADING,
});

export const setLoadingFalse = () => ({
  type: SET_ORDERS_LOADING_FALSE,
});

export const setAuctionModal = () => ({
  type: SET_AUCTION_MODAL,
});

export const setCurrentOffer = payload => ({
  type: SET_CURRENT_OFFER,
  payload,
});

export const setOfferPagination = payload => ({
  type: SET_OFFER_PAGINATION,
  payload,
});

export const getShipmentTrackPackage = payload => ({
  type: GET_SHIPMENT_TRACK_SUCCESS,
  payload,
});

export const clearShipmentTrackPackage = () => ({
  type: CLEAR_SHIPMENT_TRACK_SUCCESS,
});

export const fetchOrders = (page = 1, limit = 2) => dispatch => {
  dispatch({ type: FETCH_ORDERS, payload: page });

  getOrdersRequest(page, limit)
    .then(res => {
      dispatch(fetchOrdersSuccess({ ...res.data, page }));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(fetchOrdersFailed({}));
    });
};

export const handleOutComingOrdersOrders = (
  page = 1,
  limit = 2
) => dispatch => {
  dispatch({ type: FETCH_ORDERS, payload: page });

  getOrdersRequest(page, limit, COLLECTOR)
    .then(res => {
      dispatch(fetchOutComingOrdersSuccess({ ...res.data, page }));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const handleInComingOrdersOrders = (page = 1, limit = 2) => dispatch => {
  dispatch({ type: FETCH_ORDERS, payload: page });

  getOrdersRequest(page, limit)
    .then(res => {
      dispatch(fetchInComingOrdersSuccess({ ...res.data, page }));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const checkOrderVerification = (
  param,
  page,
  limit,
  setOpen
) => dispatch => {
  dispatch({ type: SET_ORDERS_LOADING_TRUE });

  checkOrderVerificationRequest(param)
    .then(response => {
      dispatch(fetchOrders(page, limit));
      const { isDeclined = false } = response.data;
      isDeclined && dispatch(displayMessage(ORDER_DECLINED, WARNING));
      setOpen(!isDeclined);
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });

  dispatch({ type: SET_ORDERS_LOADING_FALSE });
};

export const checkResaleOrderVerification = (
  param,
  page,
  limit,
  setOpen
) => dispatch => {
  dispatch({ type: SET_ORDERS_LOADING_TRUE });

  checkOrderVerificationRequest(param)
    .then(response => {
      dispatch(handleInComingOrdersOrders(page, limit));
      const { isDeclined = false } = response.data;
      isDeclined && dispatch(displayMessage(ORDER_DECLINED, WARNING));
      setOpen(!isDeclined);
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });

  dispatch({ type: SET_ORDERS_LOADING_FALSE });
};

export const verifyOrder = (param, page, limit) => dispatch => {
  dispatch({ type: SET_ORDERS_LOADING_TRUE });

  verifyOrderRequest(param)
    .then(response => {
      dispatch(fetchOrders(page, limit));
      const { isDeclined = false, isVerified = false } = response.data;
      isDeclined && dispatch(displayMessage(ORDER_DECLINED, WARNING));
      isVerified && dispatch(displayMessage(ORDER_VERIFIED));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });

  dispatch({ type: SET_ORDERS_LOADING_FALSE });
};

export const verifyResaleOrder = (param, page, limit) => dispatch => {
  dispatch({ type: SET_ORDERS_LOADING_TRUE });

  verifyOrderRequest(param)
    .then(response => {
      dispatch(handleInComingOrdersOrders(page, limit));
      const { isDeclined = false, isVerified = false } = response.data;
      isDeclined && dispatch(displayMessage(ORDER_DECLINED, WARNING));
      isVerified && dispatch(displayMessage(ORDER_VERIFIED));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });

  dispatch({ type: SET_ORDERS_LOADING_FALSE });
};

export const confirmResaleOrderPayment = (param, page, limit) => dispatch => {
  dispatch({ type: SET_ORDERS_LOADING_TRUE });

  confirmOrderPaymentRequest(param)
    .then(response => {
      const { failPayment = false, isDeclined = false } = response.data;
      failPayment && dispatch(displayMessage(PAYMENT_FAIL_OWD, WARNING));
      isDeclined && dispatch(displayMessage(PAYMENT_CANCELED_OID, WARNING));
      dispatch(handleInComingOrdersOrders(page, limit));
      dispatch({ type: SET_ORDERS_LOADING_FALSE });
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch({ type: SET_ORDERS_LOADING_FALSE });
    });
};

export const confirmOrderPayment = (param, page = 1, limit = 2) => dispatch => {
  dispatch({ type: SET_ORDERS_LOADING_TRUE });

  confirmOrderPaymentRequest(param)
    .then(response => {
      const { failPayment = false, isDeclined = false } = response.data;
      failPayment && dispatch(displayMessage(PAYMENT_FAIL_OWD, WARNING));
      isDeclined && dispatch(displayMessage(PAYMENT_CANCELED_OID, WARNING));
      dispatch(fetchOrders(page, limit));
      dispatch({ type: SET_ORDERS_LOADING_FALSE });
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch({ type: SET_ORDERS_LOADING_FALSE });
      dispatch(fetchOrders(page, limit));
    });
};

export const confirmPickUpDate = (
  param,
  orderPagination,
  resale
) => dispatch => {
  const { page, limit } = orderPagination;
  dispatch({ type: SET_ORDERS_LOADING_TRUE });
  confirmOrderPickUpDateRequest(param)
    .then(() => {
      if (resale) {
        return dispatch(handleInComingOrdersOrders(page, limit));
      }

      return dispatch(fetchOrders(page, limit));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
  dispatch({ type: SET_ORDERS_LOADING_FALSE });
};

export const verifyOffer = (param, page, limit) => dispatch => {
  verifyOfferRequest(param)
    .then(({ data }) => {
      if (param.status === VERIFIED) {
        if (data.cartData) {
          return dispatch(addToCartOldOffer(data, page, limit));
        }

        // verify offer and order and confirm payment if it's new offer
        if (data.orderId) {
          dispatch(fetchOffers(page, limit));
          return dispatch(confirmOrderPayment(data));
        }
      }

      dispatch(fetchOffers(page, limit));
      dispatch(fetchOrders());
    })
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const addToCartOldOffer = (data, page, limit) => dispatch => {
  const cartData = {
    ...data.cartData,
    cartId: generateUuid(),
  };

  dispatch(addOfferToBuyerCart(cartData, page, limit));

  dispatch(fetchOffers(page, limit));
};

export const updateSellerOfferPrice = price => (dispatch, getState) => {
  const {
    currentOffer: { id: offerId, page, pageCount: limit },
    currentOffer: offer,
  } = getState().dashboard.orders;

  sellerOfferPriceRequest(price, offerId)
    .then(() => {
      HelperForAnalytic.createEvent('SellerOfferPriceWasUpdated', {
        value: price,
      });

      offer.sellerOfferPrice = price;
      offer.isSellerOfferedLast = true;
      dispatch(setCurrentOffer(offer));
      dispatch(fetchOffers(page, limit));

      dispatch(displayMessage(OFFER_SENT));
    })
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const changeOfferPrice = data => (dispatch, getState) => {
  const { currentOffer: offer } = getState().dashboard.orders;

  buyerOfferPriceRequest(data)
    .then(() => {
      HelperForAnalytic.createEvent('OfferPriceWasUpdated', {
        value: data.price,
      });

      offer.sellerOfferPrice = data.price;
      offer.isSellerOfferedLast = false;
      dispatch(setCurrentOffer(offer));
    })
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const saveWrappedPhoto = (step, file) => dispatch => {
  saveWrappedPhotoRequest(step, file[0].type)
    .then(async result => {
      const { presignedUrl } = result.data;
      await uploadMediaFileViaSignedUrl(file[0], presignedUrl);
    })
    .then(() => {
      dispatch(fetchOrders());
      dispatch(handleInComingOrdersOrders());
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const deleteWrappedPhoto = (
  step,
  order,
  orderPagination
) => dispatch => {
  const { page, limit } = orderPagination;

  deleteWrappedPhotoRequest(step, order.id)
    .then(() => {
      dispatch(fetchOrders(page, limit));
      dispatch(handleInComingOrdersOrders(page, limit));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const fetchOffers = (page = 1, limit = 2) => dispatch => {
  dispatch({ type: FETCH_OFFERS, payload: page });

  fetchOffersRequest(page, limit)
    .then(res => {
      dispatch(fetchOffersSuccess({ ...res.data, page }));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(fetchOffersFailed({}));
    });
};

export const getPackageInfo = (order, setOpen) => dispatch => {
  dispatch(setOrdersLoading());

  getPackageInfoRequest(order)
    .then(({ data }) => {
      const { statusData } = data;
      const { statusResponse } = statusData;

      if (statusResponse) {
        dispatch(setLoadingFalse());
        setOpen(true);

        return dispatch(getShipmentTrackPackage(statusData));
      }

      dispatch(setLoadingFalse());
      setOpen(false);
      dispatch(displayMessage(TRACK_NO_INFO, WARNING));

      return dispatch(getShipmentTrackPackage(statusData));
    })
    .catch(error => {
      dispatch(setLoadingFalse());
      dispatch(errorMessageHandler(error));
    });
};

const addOfferToBuyerCart = (cartData, page, limit) => dispatch => {
  addOfferToCartRequest(cartData)
    .then(({ data }) => {
      window.Echo.emit('getCartItemsCount', { id: data.cartId });
    })
    .then(() => displayMessage(ORDER_ADDED_TO_CART))
    .catch(() => {
      dispatch(fetchOffers(page, limit));
      dispatch(displayMessage(ORDER_RESERVED, ERROR));
    });
};
