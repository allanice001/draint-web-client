import {
  ADD_ARTWORK_TO_CART_IN_FILTER_ARTWORKS,
  ADD_ARTWORK_TO_CART_IN_FILTER_ARTWORKS_BY_PRICE,
  GET_HOMEPAGE_DATA_ERROR,
  GET_HOMEPAGE_DATA_SUCCESS,
  SET_FILTER_ARTWORKS_BY_PRICE_SUCCESS,
  SET_HOMEPAGE_FILTER_ARTWORKS_SUCCESS,
  SET_HOMEPAGE_LOADING,
  SET_LESS_HOMEPAGE_STYLES_SUCCESS,
  SET_MORE_HOMEPAGE_FILTER_ARTWORKS_SUCCESS,
  SET_MORE_HOMEPAGE_STYLES_SUCCESS,
  SET_SLIDES_SUCCESS,
} from 'constants/redux/publicHomepage';
import {
  DEVICE,
  INITIAL_ARTWORKS_LIMIT_BY_PRICE,
} from 'constants/components/homepage';
import {
  getBlogPostsForSlider,
  getLastBlogPosts,
} from 'redux/master/actions/hamepage-blog-actions';
import {
  getInitialContent,
  getInitialSlides,
  getMoreArtworkStyles,
} from 'dataLayer/homepage/homepage';
import { ArtworkService } from 'services/artwork-service';
import { ERROR } from 'constants/components/message-statuses';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { STORAGE_CART } from 'constants/storage-keys';
import axios from 'dataLayer/axiosInstance';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { errorHandler } from 'helpers/redux-helpers/helper';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { getJoinOurSection } from 'redux/master/actions/homepage-join-our-section-actions';
import { getJoinUsSection } from 'redux/master/actions/homepage-join-us-section-actions';
import { getNewsletterSection } from 'redux/master/actions/homepage-newsletter-section-action';
import { getPaintingsByArtist } from 'redux/master/actions/homepage-paintings-by-artists-actions';
import { getReviews } from 'redux/master/actions/homepage-reviews-actions';
import { getShipmentSection } from 'redux/master/actions/homepage-shipment-section-actions';

const artworkService = new ArtworkService();

const INITIAL_STYLES_LIMIT = 24;
const INITIAL_ARTWORKS_LIMIT = 4;

export const setLoading = payload => ({
  type: SET_HOMEPAGE_LOADING,
  payload,
});

export const setError = () => ({
  type: GET_HOMEPAGE_DATA_ERROR,
});

export const getHomePageDataSuccess = payload => ({
  type: GET_HOMEPAGE_DATA_SUCCESS,
  payload,
});

export const setMoreStylesSuccess = payload => ({
  type: SET_MORE_HOMEPAGE_STYLES_SUCCESS,
  payload,
});

export const setLessStylesSuccess = () => ({
  type: SET_LESS_HOMEPAGE_STYLES_SUCCESS,
});

export const setFilterArtworksSuccess = payload => ({
  type: SET_HOMEPAGE_FILTER_ARTWORKS_SUCCESS,
  payload,
});

export const setFilterArtworksMoreSuccess = payload => ({
  type: SET_MORE_HOMEPAGE_FILTER_ARTWORKS_SUCCESS,
  payload,
});

export const setFilterArtworksByPriceSuccess = payload => ({
  type: SET_FILTER_ARTWORKS_BY_PRICE_SUCCESS,
  payload,
});

export const addArtworksToCartInFilterArtworksByPrice = payload => ({
  type: ADD_ARTWORK_TO_CART_IN_FILTER_ARTWORKS_BY_PRICE,
  payload,
});

export const setSlidesSuccess = payload => ({
  type: SET_SLIDES_SUCCESS,
  payload,
});

export const getSliders = () => async dispatch => {
  getInitialSlides()
    .then(result => {
      dispatch(setSlidesSuccess(result.data.slider));
    })
    .catch(error => {
      dispatch(setError());
      dispatch(errorMessageHandler(error));
    });
};

export const confirmSubscription = secretId => async dispatch => {
  await axios
    .put('/api/newsletter-subscription/confirm', { secret: secretId })
    .then(res => {
      dispatch(displayMessage(res.data.message));

      ReactPixel.trackCustom('NewsletterSubscription', {
        content_category: 'User',
        content_name: 'Newsletter unsubscription action',
      });
      PinterestTag.track('Custom', {
        content_category: 'User',
        action: 'Newsletter Unsubscription',
      });
      ReactGA.event({
        category: 'User',
        action: 'Newsletter Unsubscription',
        label: 'NewsletterSubscription',
      });
    })
    .catch(error => {
      dispatch(errorHandler(GET_HOMEPAGE_DATA_ERROR, error));
    });
};

export const confirmPersonalSubscription = secretId => async dispatch => {
  await axios
    .put('/api/personal-subscriptions/confirm', { secret: secretId })
    .then(res => {
      dispatch(displayMessage(res.data.message));

      ReactPixel.trackCustom('NewsletterSubscription', {
        content_category: 'User',
        content_name: 'Newsletter unsubscription action',
      });
      PinterestTag.track('Custom', {
        content_category: 'User',
        action: 'Newsletter Unsubscription',
      });
      ReactGA.event({
        category: 'User',
        action: 'Newsletter Unsubscription',
        label: 'NewsletterSubscription',
      });
    })
    .catch(error => {
      dispatch(errorHandler(GET_HOMEPAGE_DATA_ERROR, error));
    });
};

export const getInitialData = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const cartHash =
    getState().user.account.cartHash || localStorage.getItem(STORAGE_CART);
  getInitialContent({
    pageSizeStyles: INITIAL_STYLES_LIMIT,
    pageSizeArtworks: INITIAL_ARTWORKS_LIMIT,
    pageSizeArtworksByPrice: INITIAL_ARTWORKS_LIMIT_BY_PRICE[DEVICE],
    cartHash,
  })
    .then(result => {
      dispatch(getHomePageDataSuccess(result.data));
    })
    .then(() => {
      dispatch(getSliders());
    })
    .then(() => {
      dispatch(getReviews());
    })
    .then(() => {
      dispatch(getShipmentSection());
    })
    .then(() => {
      dispatch(getJoinUsSection());
    })
    .then(() => {
      dispatch(getJoinOurSection());
    })
    .then(() => {
      dispatch(getNewsletterSection());
    })
    .then(() => {
      dispatch(getPaintingsByArtist());
    })
    .then(() => {
      dispatch(getLastBlogPosts());
    })
    .then(() => {
      dispatch(getBlogPostsForSlider());
    })
    .then(() => {
      dispatch(setLoading(false));
    })
    .catch(error => {
      dispatch(setError());
      dispatch(errorMessageHandler(error));
      dispatch(setLoading(false));
    });
};

export const onStylesPageChanged = (params, type) => async dispatch => {
  getMoreArtworkStyles(params)
    .then(({ data }) => {
      if (!type) return dispatch(setMoreStylesSuccess(data.stylesPaginate));
      dispatch(setLessStylesSuccess());
    })
    .catch(error => {
      dispatch(setError());
      dispatch(displayMessage(error?.response?.message, ERROR));
    });
};

export const addArtworkToCartInArtworkCard = payload => ({
  type: ADD_ARTWORK_TO_CART_IN_FILTER_ARTWORKS,
  payload: payload,
});

export const addArtworkToCartInFiltersByPrice = payload => ({
  type: ADD_ARTWORK_TO_CART_IN_FILTER_ARTWORKS_BY_PRICE,
  payload: payload,
});

export const onArtworksChanged = params => async (dispatch, getState) => {
  const cartHash =
    getState().user.account.cartHash || localStorage.getItem(STORAGE_CART);

  artworkService
    .getArtworksHomepage({ ...params, cartHash })
    .then(res => {
      const data = {
        artworks: res.data.artworks,
        pagination: res.data.pagination,
      };
      if (params.sortByUserCountry) {
        return dispatch(setFilterArtworksByPriceSuccess(data));
      }
      if (params.page > 1) {
        return dispatch(setFilterArtworksMoreSuccess(data));
      }
      return dispatch(setFilterArtworksSuccess(data));
    })
    .catch(error => {
      dispatch(setError());
      dispatch(displayMessage(error?.response?.message, ERROR));
    });
};
