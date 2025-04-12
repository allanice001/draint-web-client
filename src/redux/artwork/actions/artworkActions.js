import {
  ADD_PUBLIC_ARTWORK_TO_CART,
  CHANGE_PUBLIC_ARTWORK_FOR_SALE_STATUS,
  CHANGE_PUBLIC_ARTWORK_STATUS,
  GET_PUBLIC_ARTWORK_DATA,
  GET_PUBLIC_ARTWORK_DATA_ERROR,
  GET_PUBLIC_ARTWORK_MEDIUM,
  GET_PUBLIC_ARTWORK_RATES,
  GET_PUBLIC_ARTWORK_STYLES,
  GET_PUBLIC_ARTWORK_SURFACE,
  SET_ARTWORK_PAGE_UNLOGGED_MODAL,
  SET_DELETE_MODAL,
  SET_EDIT_MODE,
  SET_GALLERY_MODAL,
  SET_INITIAL_STATE,
  SET_OFFER_CHECKOUT,
  SET_OFFER_MODAL,
  SET_PUBLIC_ARTWORK_GALLARY,
  SET_PUBLIC_ARTWORK_HASHTAG,
  SET_PUBLIC_ARTWORK_LOADING,
  SET_PUBLIC_ARTWORK_RATES,
  SET_PUBLIC_ARTWORK_SHIPPING_LOADING,
  SET_PUBLIC_ARTWORK_SHIPPING_RATES,
  SET_REQUIRED_SALE_INFO_MODAL_FORMS,
  SET_REQUIRED_SALE_INFO_MODAL_OPEN,
  SET_SWITCH_ROLE_MODAL,
  UPDATE_ARTWORKS_COUNT,
  UPDATE_PUBLIC_ARTWORK_HASHTAGS,
} from 'constants/redux/publicArtwork';
import { ERROR, WARNING } from 'constants/components/message-statuses';
import {
  GEOLOCATION_MESSAGE,
  WAIT_FOR_SELLER_ACTION,
  WAIT_TRADE_PROCESS,
} from 'constants/components/artwork-page';
import {
  addArtworkToCartInArtworkCard,
  addArtworkToCartInFiltersByPrice,
} from 'redux/homepage/actions/homepageActions';
import {
  checkIsActiveOffer,
  checkIsOfferInOrder,
  checkOrderOnAvailability,
} from 'dataLayer/checkout/checkout';
import {
  setArtworkUploading,
  setArtworkUploadingCount,
} from 'redux/user/loader/actions/setLoading';
import { ALREADY_ORDERED_AND_FINISHED_CHECKOUT } from 'constants/artwork';
import { ARTWORKS_UPLOAD_LIMIT_ON_TEST_PLAN } from 'constants/global';
import { ARTWORK_UPLOAD_FORM } from 'constants/components/forms';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { GET_PUBLIC_ARTWORK_STYLES_PAGINATION } from 'constants/redux/publicArtwork';
import { HOVER_FROM } from 'constants/components/homepage';
import { SIGN_UP_TEST_PLAN_ID } from 'constants/components/signup-page';
import { addArtworkToCartInWatchlist } from 'redux/dashboard/actions/watchlistActions';
import { addToCartSearchResult } from 'redux/search/action-creators';
import artworkUpdateRequest from 'dataLayer/artwork/artwork-update-request';
import axios from 'dataLayer/axiosInstance';
import axiosOriginal from 'axios';
import { change } from 'redux-form';
import checkArtworkDimensions from 'redux/artwork/thunks/check-artwork-dimensions';
import deleteArtworkRequest from 'dataLayer/artwork/delete-artwork-request';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { generateUuid } from 'services/tokenService';
import { getArtistArtworksSuccess } from 'redux/artist/actions/artistProfileActions';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { getArtworksSuccess } from 'redux/master/actions/approvalArtworksActions';
import getGeolocation from 'services/geolocation-service';
import { getGeolocationByCoords } from 'dataLayer/user/userData';
import handlePublicArtworkRates from 'redux/shipping/thunks/public-artwork-rates';
import history from 'routers/history';
import recoverArtworkRequest from 'dataLayer/artwork/recover-artwork-request';
import { setUserCartHash } from 'redux/user/account/actions/setUserData';
import { addToCartRequest } from 'dataLayer/cart/cart-requests';

const HelperForAnalytic = AnalyticHelper.create();

export const setGalleryModal = payload => ({
  type: SET_GALLERY_MODAL,
  payload,
});

export const setDeleteModal = payload => ({
  type: SET_DELETE_MODAL,
  payload,
});

export const setEditMode = payload => ({
  type: SET_EDIT_MODE,
  payload,
});

export const setOfferModal = payload => ({
  type: SET_OFFER_MODAL,
  payload,
});

export const setLoading = status => ({
  type: SET_PUBLIC_ARTWORK_LOADING,
  payload: status,
});

export const setShippingLoading = () => ({
  type: SET_PUBLIC_ARTWORK_SHIPPING_LOADING,
});

export const setRequiredSaleInfoModalOpen = payload => ({
  type: SET_REQUIRED_SALE_INFO_MODAL_OPEN,
  payload,
});

export const setRequiredSaleInfoModalForms = payload => ({
  type: SET_REQUIRED_SALE_INFO_MODAL_FORMS,
  payload,
});

export const addArtworkToCart = () => ({
  type: ADD_PUBLIC_ARTWORK_TO_CART,
});

export const updateArtworkHashtags = payload => ({
  type: UPDATE_PUBLIC_ARTWORK_HASHTAGS,
  payload,
});

export const setArtworkHashtag = payload => ({
  type: SET_PUBLIC_ARTWORK_HASHTAG,
  payload,
});

export const setArtworkGallary = payload => ({
  type: SET_PUBLIC_ARTWORK_GALLARY,
  payload,
});

export const setVerificationStatus = payload => ({
  type: CHANGE_PUBLIC_ARTWORK_STATUS,
  payload,
});

export const setShippingRates = payload => ({
  type: SET_PUBLIC_ARTWORK_SHIPPING_RATES,
  payload,
});

export const setForSaleStatus = payload => ({
  type: CHANGE_PUBLIC_ARTWORK_FOR_SALE_STATUS,
  payload,
});

export const getStylesList = payload => ({
  type: GET_PUBLIC_ARTWORK_STYLES,
  payload,
});

export const getStylesPagination = payload => ({
  type: GET_PUBLIC_ARTWORK_STYLES_PAGINATION,
  payload,
});

export const fetchRates = () => ({
  type: GET_PUBLIC_ARTWORK_RATES,
});

export const setRates = payload => ({
  type: SET_PUBLIC_ARTWORK_RATES,
  payload,
});

export const getMediumsList = payload => ({
  type: GET_PUBLIC_ARTWORK_MEDIUM,
  payload,
});

export const getSurfacesList = payload => ({
  type: GET_PUBLIC_ARTWORK_SURFACE,
  payload,
});

export const getArtworkData = payload => ({
  type: GET_PUBLIC_ARTWORK_DATA,
  payload,
});

export const setOfferCheckout = payload => ({
  type: SET_OFFER_CHECKOUT,
  payload,
});

export const getArtworkDataError = payload => ({
  type: GET_PUBLIC_ARTWORK_DATA_ERROR,
  payload,
});

export const setArtworkPageUnloggedModal = payload => ({
  type: SET_ARTWORK_PAGE_UNLOGGED_MODAL,
  payload,
});

export const setSwitchRoleModal = payload => ({
  type: SET_SWITCH_ROLE_MODAL,
  payload,
});

export const createImagesObject = imagesLinks =>
  Object.fromEntries(
    imagesLinks.map((image, i) => [
      i,
      {
        id: image.id,
        imgPath: image.image_url,
        small_image: image.small_image,
        index: i,
      },
    ])
  );

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const artworkUpdated = isUploaded => (dispatch, getState) => {
  const {
    user: { account },
  } = getState();

  const artworksCount = isUploaded
    ? account.artworksCount + 1
    : account.artworksCount - 1;

  dispatch({
    type: UPDATE_ARTWORKS_COUNT,
    payload: {
      artworksCount,
      canUploadArtwork:
        artworksCount < ARTWORKS_UPLOAD_LIMIT_ON_TEST_PLAN ||
        account.planId !== SIGN_UP_TEST_PLAN_ID,
    },
  });
};

export const getRates = (buyerProfileId, sellerProfileId, artworkId) => async (
  dispatch,
  getState
) => {
  const state = getState();
  const { location } = state.user.account;

  if (!location?.address?.country) {
    const geolocation = await getGeolocation();

    if (!geolocation) {
      return dispatch(displayMessage(GEOLOCATION_MESSAGE, WARNING));
    }

    const address = await getGeolocationByCoords(geolocation);
    const buyerAddress = address.data.address;
    const sellerProfile = sellerProfileId
      ? sellerProfileId
      : state.artwork.artworkData.profile_id;

    return dispatch(
      handlePublicArtworkRates(buyerAddress, sellerProfile, artworkId)
    );
  }

  return dispatch(
    handlePublicArtworkRates(buyerProfileId, sellerProfileId, artworkId)
  );
};

export const getArtwork = params => dispatch => {
  return axios
    .get(`/api/artworks/id/${params.id}?cartHash=${params.cartHash}`)
    .then(res => {
      const {
        artworkData,
        styles,
        mediums,
        surfaces,
        inOrder,
        inOffer,
        inCart,
        imagesLinks,
        hashtags,
        ownerData,
        priceInfo,
        inCurrentUserOrder,
        ownerAddress,
        employeeData,
        isOwnerCanEditArtwork,
        country,
        IsArtistsHavePaidOrders,
        IsArtistsHaveVerifiedOrders,
      } = res.data;

      dispatch(
        getArtworkData({
          inOrder,
          inOffer,
          inCart,
          inCurrentUserOrder,
          isOwnerCanEditArtwork,
          IsArtistsHavePaidOrders,
          IsArtistsHaveVerifiedOrders,
          profile_id: artworkData.profile_id,
          isUsername: ownerData.is_username,
          gallerySteps: createImagesObject(imagesLinks),
          hashtags,

          currentArtwork: {
            id: artworkData.id,
            owner_profile_id: artworkData.owner_profile_id,
            ownerAddress: ownerAddress ? ownerAddress : {},
            primary_image: artworkData.primary_image,
            small_image: artworkData.small_image,
            verification: artworkData.verification,
            title: artworkData.title,
            for_sale: artworkData.for_sale,
            price: Number(artworkData.price),
            width: artworkData.width,
            height: artworkData.height,
            thickness: artworkData.thickness,
            weight: artworkData.weight,
            style: styles,
            medium: mediums,
            surface: surfaces,
            completed: +artworkData.completed,
            description: artworkData.description,
            country: country,

            purchase_history: {
              artworks_purchase_history: artworkData.artworks_purchase_history,
              above_original_price: +artworkData.above_original_price,
              avg_price_increase: +artworkData.avg_price_increase,
              avg_month_increase: +artworkData.avg_month_increase,
            },

            deleted_at: artworkData.deleted_at,
            deleted_by: artworkData.deleted_by,

            authorInfo: {
              profile_id: artworkData.profile_id,
              account_id: artworkData.account_id,
              firstName: artworkData.author_first_name,
              lastName: artworkData.author_last_name,
              username: artworkData.username,
              phone: artworkData.phone,
              isEmployee: artworkData.is_employee,
              employeeId: artworkData.employee_id,
              location: artworkData.location_id,
            },

            ownerInfo: {
              profile_id: ownerData.id,
              account_id: ownerData.account_id,
              isArtist: ownerData.is_artist,
              firstName: ownerData.first_name,
              lastName: ownerData.last_name,
              username: ownerData.username,
              phone: ownerData.phone,
              isEmployee: Boolean(ownerData.is_employee),
              employeeId: ownerData.employee_id,
              employeeData: Object.keys(employeeData).length
                ? employeeData
                : null,
              location: ownerData.location_id,
            },

            priceInfo,
            ratesRequested: false,
            ratesFetching: false,
            shipping: {
              rates: [],
              lowestRatePrice: '',
              lowestRateCode: '',
              lowestRateName: '',
            },
          },
        })
      );
    })
    .catch(error => {
      dispatch(getArtworkDataError(null));
      dispatch(errorMessageHandler(error));
    });
};

export const getAllArtworkProperties = () => dispatch => {
  return axios
    .get('/api/artworks/getAllArtworkProperties')
    .then(res => {
      dispatch(getStylesList(res.data.styles));
      dispatch(getMediumsList(res.data.mediums));
      dispatch(getSurfacesList(res.data.surfaces));
    })
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const getStyles = () => async dispatch => {
  await axios
    .get('/api/artworks/styles')
    .then(res => {
      dispatch(getStylesList(res.data));
    })
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const getPaginateStyles = limit => async dispatch => {
  await axios
    .get('/api/artworks/stylesPaginate', { params: { limit } })
    .then(res => {
      dispatch(getStylesPagination(res.data));
    })
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const getMediums = () => async dispatch => {
  await axios
    .get('/api/artworks/medium')
    .then(res => dispatch(getMediumsList(res.data)))
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const getSurfaces = () => async dispatch => {
  await axios
    .get('/api/artworks/surface')
    .then(res => dispatch(getSurfacesList(res.data)))
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const initialRequest = param => async dispatch => {
  dispatch(setLoading(true));
  await dispatch(getArtwork(param));
  await dispatch(getAllArtworkProperties());
  dispatch(setLoading(false));
};

export const getShippingRates = profile_id => async dispatch => {
  dispatch(setShippingLoading());
  await axios
    .get(`/api/artwork/shipping-rates?profile_id=${profile_id}`)
    .then(res => dispatch(setShippingRates(res.data)))
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const addHashtag = param => async dispatch => {
  await axios
    .put('/api/artworks/hashtag', { ...param })
    .then(res => dispatch(updateArtworkHashtags(res.data.hashtags)))
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const removeHashtag = param => async dispatch => {
  await axios
    .delete('/api/artworks/hashtag', { ...param })
    .then(res => dispatch(updateArtworkHashtags(res.data.hashtags)))
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

const checkerTradeData = artworkConverted => (dispatch, getStore) => {
  const store = getStore();
  if (artworkConverted) {
    const artworkSeller = artworkConverted.ownerInfo
      ? artworkConverted.ownerInfo.account_id
      : artworkConverted.ownerData.account_id;
    const { id: artworkId, isOwnerCanEditArtwork } = artworkConverted;
    const artworkBuyer = store.user.account.id;

    return {
      artworkId,
      artworkSeller,
      artworkBuyer,
      isOwnerCanEditArtwork,
    };
  }

  const {
    id: artworkId,
    ownerInfo: { account_id: artworkSeller },
  } = store.artwork.artworkData.currentArtwork;
  const artworkBuyer = store.user.account.id;
  const { isOwnerCanEditArtwork } = store.artwork.artworkData;

  return {
    artworkId,
    artworkSeller,
    artworkBuyer,
    isOwnerCanEditArtwork,
  };
};

export const checkOrderAvailability = artworkConverted => dispatch => {
  const params = dispatch(checkerTradeData(artworkConverted));
  const { artworkBuyer, isOwnerCanEditArtwork, artworkId } = params;

  if (artworkBuyer) {
    return checkOrderOnAvailability(params)
      .then(response => {
        const { isCheckoutOrder } = response.data;

        if (!isOwnerCanEditArtwork && !isCheckoutOrder) {
          return dispatch(displayMessage(WAIT_TRADE_PROCESS));
        }

        if (isCheckoutOrder) {
          return dispatch(
            displayMessage(ALREADY_ORDERED_AND_FINISHED_CHECKOUT, WARNING)
          );
        }

        return dispatch(
          addToCart({
            artwork_id: artworkId,
            username: artworkConverted?.username,
            fromWatchlist: !!artworkConverted?.fromWatchlist,
            fromArtworkCard: artworkConverted?.addToCartFrom,
          })
        );
      })
      .catch(error => {
        dispatch(errorMessageHandler(error));
      });
  }

  return dispatch(
    addToCart({
      artwork_id: artworkId,
      username: artworkConverted?.username,
      fromWatchlist: !!artworkConverted?.fromWatchlist,
      fromArtworkCard: artworkConverted?.addToCartFrom,
    })
  );
};

export const checkOfferAvailability = (
  history,
  getOfferShipmentRates
) => async dispatch => {
  const params = dispatch(checkerTradeData());
  const { artworkBuyer, isOwnerCanEditArtwork } = params;

  if (artworkBuyer) {
    if (!isOwnerCanEditArtwork) {
      return dispatch(displayMessage(WAIT_TRADE_PROCESS));
    }

    const isActiveOffer = await dispatch(checkIsOfferActive(params));

    if (isActiveOffer) {
      return history.push('/collector-dashboard/offers');
    }

    const IsOfferInOrder = await dispatch(checkIsOfferInOrderNow(params));

    if (IsOfferInOrder) {
      return dispatch(displayMessage(WAIT_FOR_SELLER_ACTION));
    }

    return getOfferShipmentRates();
  }

  return false;
};

export const checkIsOfferActive = params => dispatch => {
  const { artworkBuyer } = params;

  if (artworkBuyer) {
    return checkIsActiveOffer(params)
      .then(({ data }) => {
        const { isActiveOffer } = data;

        return isActiveOffer;
      })
      .catch(error => {
        dispatch(errorMessageHandler(error));
      });
  }

  return false;
};

export const checkIsOfferInOrderNow = params => dispatch => {
  const { artworkBuyer } = params;

  if (artworkBuyer) {
    return checkIsOfferInOrder(params)
      .then(({ data }) => {
        const { isOfferInOrder } = data;

        return isOfferInOrder;
      })
      .catch(error => {
        dispatch(errorMessageHandler(error));
      });
  }

  return false;
};

export const addToCart = parameters => (dispatch, getState) => {
  if (localStorage.cartId === 'null' || !localStorage.cartId) {
    localStorage.setItem('cartId', generateUuid());
  }

  const { profile_id: profileId = null } = getState().user.account;
  const { artwork_id: artworkId } = parameters;
  const { cartId } = localStorage;

  addToCartRequest(artworkId, profileId, cartId)
    .then(({ data }) => {
      if (data.inCart) return;

      if (parameters.fromWatchlist) {
        dispatch(addArtworkToCartInWatchlist(parameters.artwork_id));
      }

      if (parameters.fromArtworkCard === HOVER_FROM.artworkCard) {
        dispatch(addArtworkToCartInArtworkCard(parameters.artwork_id));
        dispatch(addArtworkToCartInFiltersByPrice(parameters.artwork_id));
      }

      if (parameters.fromArtworkCard === HOVER_FROM.artworkGalleryCard) {
        const { artworks } = getState().artist.currentArtist;
        const newArtworks = [];

        for (const artwork of artworks) {
          if (artwork.id === parameters.artwork_id) {
            artwork.inCart = true;
          }

          newArtworks.push({
            ...artwork,
          });
        }

        dispatch(getArtistArtworksSuccess(newArtworks));
      }

      if (parameters.fromArtworkCard === HOVER_FROM.artworkSearchCard) {
        dispatch(addToCartSearchResult(parameters.artwork_id));
      }

      dispatch(addArtworkToCart());
      dispatch(setUserCartHash(localStorage.cartId));

      window.Echo.emit('getCartItemsCount', { id: localStorage.cartId });

      // for now
      // HelperForAnalytic.createEvent('AddToCart', {
      //   value: artwork.price,
      //   eventId: artwork.id,
      // });
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const changeArtworkSaleStatus = (artworkId, status) => dispatch => {
  axios
    .post('/api/artwork/update/status', { artworkId, status })
    .then(res => dispatch(setForSaleStatus(res.data)))
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const sendRequest = formData => dispatch => {
  artworkUpdateRequest(formData)
    .then(() => {
      dispatch(
        getArtwork({ id: formData.id, cartHash: localStorage.cartId })
      ).then(() => {
        dispatch(displayMessage('You have successfully changed artwork info!'));
        dispatch(setEditMode(false));
        dispatch(checkArtworkDimensions());
      });
    })
    .catch(error => dispatch(errorMessageHandler(error, ERROR)));
};

export const sendOfferRequest = formData => dispatch => {
  axios
    .put('/api/orders/send/offer', { formData })
    .then(({ data }) => {
      dispatch(displayMessage('You have successfully sent offer!'));

      HelperForAnalytic.createEvent('OfferWasSent', {
        value: formData.price,
        eventId: data.offer.id,
      });
    })
    .catch(error => {
      dispatch(displayMessage(error.message, ERROR));
    });
};

export const changeArtworkStatus = (data, status, artistId) => dispatch => {
  let url;
  if (status === 'verified') url = '/api/master/artworks';
  if (status === 'unverified') url = '/api/master/artworks/unverify';
  if (status === 'pending') url = '/api/master/artworks/pending';
  axios
    .post(url, { id: data, artistId })
    .then(() => dispatch(setVerificationStatus(status)))
    .then(() => dispatch(displayMessage(`Status changed to '${status}'`)))
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const saveSmallArtwork = data => dispatch => {
  axios
    .post('/api/artwork/replace/small', data)
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const saveArtwork = data => dispatch => {
  axios
    .post('/api/artwork/replace/file', data)
    .then(res =>
      dispatch(setArtworkGallary(createImagesObject(res.data.imagesLinks)))
    )
    .then(() =>
      dispatch(displayMessage('You have successfully changed artwork image!'))
    )
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const saveSecondaryArtwork = (data, isNewImg) => dispatch => {
  if (isNewImg) {
    axios
      .post('/api/artwork/create/image', data)
      .then(res =>
        dispatch(setArtworkGallary(createImagesObject(res.data.imagesLinks)))
      )
      .then(() =>
        dispatch(
          displayMessage(
            'You have successfully created secondary artwork image!'
          )
        )
      )
      .catch(err => dispatch(displayMessage(err.message, ERROR)));
  } else {
    axios
      .post('/api/artwork/replace/image', data)
      .then(res =>
        dispatch(setArtworkGallary(createImagesObject(res.data.imagesLinks)))
      )
      .then(() =>
        dispatch(
          displayMessage(
            'You have successfully updated secondary artwork image!'
          )
        )
      )
      .catch(err => dispatch(displayMessage(err.message, ERROR)));
  }
};

const s3upload = (percent, url, file) => dispatch =>
  axiosOriginal
    .put(url, file, {
      headers: {
        'Content-Type': 'image/jpeg',
        reportProgress: true,
      },
    })
    .then(res => {
      dispatch(setArtworkUploadingCount(percent));
      return res;
    });

export const saveMultipleArtworks = (artworkData, files) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(setArtworkUploading(true));

    const {
      data: { media, artworkId },
    } = await axios.post('/api/artwork/upload/file', {
      artworkData,
      imagesMimeTypes: files.map(file => file.type),
    });

    const percent = 100 / files.length;

    await Promise.all(
      media.map(async ({ presignedUrl }, index) =>
        dispatch(s3upload(percent, presignedUrl, files[index]))
      )
    );

    dispatch(artworkUpdated(true));
    dispatch(displayMessage('You have successfully created artwork!'));

    const username = getState().user?.account?.username;

    history.push(getArtworkUrl(artworkId, artworkData.title, username));
  } catch (error) {
    dispatch(displayMessage(error.message, ERROR));
  } finally {
    dispatch(setArtworkUploading(false));
  }
};

export const deleteArtwork = (data, callback) => async dispatch => {
  deleteArtworkRequest(data)
    .then(({ data }) => {
      dispatch(artworkUpdated(false));
      dispatch(displayMessage(data.message));
      const { deletedCarts } = data;

      if (deletedCarts) {
        for (const hash of deletedCarts) {
          window.Echo.emit('getCartItemsCount', { id: hash });
        }
      }

      if (callback) callback();
    })
    .catch(error => {
      dispatch(errorMessageHandler(error, ERROR));
    });
};

export const recoverArtwork = parameters => (dispatch, getState) => {
  recoverArtworkRequest(parameters)
    .then(({ data }) => {
      if (data.forbidToRestore) {
        return dispatch(displayMessage(data.message, WARNING));
      }
      if (parameters.isMaster) {
        const { currentArtworks } = getState().master.approvalArtworks;
        const updated = currentArtworks.filter(
          artwork => artwork.id !== parameters.artworkId
        );
        dispatch(getArtworksSuccess({ currentArtworks: updated }));
      }
      dispatch(displayMessage(data.message));
      dispatch(
        initialRequest({
          id: parameters.artworkId,
          cartHash: localStorage.cartId,
        })
      );
    })
    .catch(error => {
      dispatch(errorMessageHandler(error, ERROR));
    });
};

export const updateArtworks = (
  { added, deleted, changedIndex },
  files,
  callback
) => async (dispatch, getState) => {
  try {
    dispatch(setArtworkUploading(true));
    const {
      id: artworkId,
      authorInfo: { username: artistUsername },
    } = getState().artwork.artworkData.currentArtwork;

    const { new_permission: adminRole } = getState().user.account;

    const {
      data: { presignedUrls },
    } = await axios.put(`/api/artwork/update/artwork-images/${artworkId}`, {
      added: added.map(({ index }, itemIndex) => ({
        index,
        mimeType: files[itemIndex]?.type,
      })),
      deleted,
      changedIndex,
      adminRole,
    });

    const percent = 100 / files.length + 1;

    await Promise.all(
      presignedUrls.map((url, index) => {
        return dispatch(s3upload(percent, url, files[index]));
      })
    );

    dispatch(artworkUpdated(true));
    dispatch(displayMessage('You have successfully updated the artwork!'));

    HelperForAnalytic.createEvent('ArtworkImagesWasEdited', {
      artist_name: artistUsername,
      quantity: files.length,
    });

    dispatch(
      initialRequest({
        id: artworkId,
        cartHash: localStorage.cartId,
      })
    );

    callback();
  } catch (error) {
    dispatch(setArtworkUploading(false));
    dispatch(errorMessageHandler(error, ERROR));
  }
};

export const checkRequiredInfoForSale = () => (dispatch, getState) => {
  const { profile_id: profileId } = getState().artwork.artworkData;
  const {
    owner_profile_id: ownerId,
    ownerAddress,
    ownerInfo,
  } = getState().artwork.artworkData.currentArtwork;

  const isSold = profileId !== ownerId;

  function checkAddressData() {
    if (ownerAddress) {
      const {
        country,
        city,
        state,
        zipcode: postal,
        addressLine1: streetName,
      } = ownerAddress;

      return !(country && city && state && postal && streetName);
    }

    return true;
  }

  function isEmployeeStatus() {
    if (!isSold) {
      // return ownerInfo.isEmployee;
      return false;
    }

    return false;
  }

  function checkUserName() {
    return !(ownerInfo.firstName && ownerInfo.lastName);
  }

  const modalForms = {
    addressForm: checkAddressData(),
    statusForm: isEmployeeStatus(),
    profileForm: checkUserName(),
  };

  if (
    modalForms.addressForm ||
    modalForms.statusForm ||
    modalForms.profileForm
  ) {
    dispatch(setRequiredSaleInfoModalForms(modalForms));
    dispatch(setRequiredSaleInfoModalOpen(true));
  }
};

export const checkRequiredInfoForSaleUpload = () => (dispatch, getState) => {
  const { account } = getState().artist.currentArtist;

  function checkAddressData() {
    if (account.location) {
      const {
        country,
        city,
        state,
        zipcode: postal,
        addressLine1: streetName,
      } = account.location;

      return !(country && city && state && postal && streetName);
    }

    return true;
  }

  function isEmployeeStatus() {
    return false;
  }

  function checkUserName() {
    return !(account.first_name && account.last_name);
  }

  const modalForms = {
    addressForm: checkAddressData(),
    statusForm: isEmployeeStatus(),
    profileForm: checkUserName(),
  };

  if (
    modalForms.addressForm ||
    modalForms.statusForm ||
    modalForms.profileForm
  ) {
    dispatch(setRequiredSaleInfoModalForms(modalForms));
    dispatch(change(ARTWORK_UPLOAD_FORM, 'for_sale', false));
    dispatch(setRequiredSaleInfoModalOpen(true));
  }
};
