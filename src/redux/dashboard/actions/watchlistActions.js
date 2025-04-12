import {
  ADD_ARTWORK_TO_CART_IN_WATCHLIST,
  DELETE_FROM_WATCHLIST_SUCCESS,
  GET_WATCHLIST_SUCCESS,
  SET_RESALE_WATCHLIST_SUCCESS,
  SET_SALE_WATCHLIST_SUCCESS,
  SET_SELECTED_ARTWORK,
  SET_WATCHLIST_LOADING_FALSE,
} from 'constants/redux/dashboardWatchlist';
import {
  addToWatchlistRequest,
  deleteFromWatchlistRequest,
  getWatchlistAllRequest,
  getWatchlistFullRequest,
} from 'dataLayer/watchlist/requests';
import {
  setArtworkPageUnloggedModal,
  setSwitchRoleModal,
} from 'redux/artwork/actions/artworkActions';
import { MESSAGE_FOR_ARTWORK_OWNER } from 'constants/messages';
import { WARNING } from 'constants/components/message-statuses';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from '../../global/notiifcation/actions/error-handler';

export const setLoadingFalse = () => ({
  type: SET_WATCHLIST_LOADING_FALSE,
});

export const setSaleWatchlistSuccess = payload => ({
  type: SET_SALE_WATCHLIST_SUCCESS,
  payload: payload,
});

export const setResaleWatchlistSuccess = payload => ({
  type: SET_RESALE_WATCHLIST_SUCCESS,
  payload: payload,
});

export const getWatchlistSuccess = payload => ({
  type: GET_WATCHLIST_SUCCESS,
  payload: payload,
});

export const addArtworkToCartInWatchlist = payload => ({
  type: ADD_ARTWORK_TO_CART_IN_WATCHLIST,
  payload: payload,
});

export const deleteFromWatchlistSuccess = payload => ({
  type: DELETE_FROM_WATCHLIST_SUCCESS,
  payload,
});

export const setSelectedArtworkId = payload => ({
  type: SET_SELECTED_ARTWORK,
  payload,
});

export const getWatchlistFull = () => (dispatch, getState) => {
  const { account } = getState().user;
  getWatchlistFullRequest(account.id)
    .then(({ data }) => {
      const { watchlist } = data;

      if (watchlist) {
        return dispatch(getWatchlistSuccess(watchlist));
      }

      return dispatch(getWatchlistSuccess([]));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoadingFalse());
    });
};

export const getWatchlistData = ({
  salePage,
  resalePage,
  saleFilter,
  resaleFilter,
}) => (dispatch, getState) => {
  const { account } = getState().user;
  const params = { salePage, resalePage, saleFilter, resaleFilter };

  getWatchlistAllRequest(account.id, account.cartHash, params)
    .then(({ data }) => {
      const { watchlistData } = data;
      const { sale, resale } = watchlistData;

      sale.data && dispatch(setSaleWatchlistSuccess(sale));
      resale.data && dispatch(setResaleWatchlistSuccess(resale));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoadingFalse());
    });
};

export const addToWatchlist = (artwork, setIsAddedToWatchlist) => (
  dispatch,
  getState
) => {
  const { account } = getState().user;

  if (!account.id) {
    return dispatch(setArtworkPageUnloggedModal(artwork));
  }

  if (account.is_artist) {
    if (account.profile_id === artwork.owner_profile_id) {
      return dispatch(displayMessage(MESSAGE_FOR_ARTWORK_OWNER, WARNING));
    }

    dispatch(setSelectedArtworkId(artwork.id));

    return dispatch(setSwitchRoleModal(account.is_artist));
  }

  if (account.profile_id === artwork.owner_profile_id) {
    return dispatch(displayMessage(MESSAGE_FOR_ARTWORK_OWNER, WARNING));
  }

  setIsAddedToWatchlist && setIsAddedToWatchlist(true);

  addToWatchlistRequest(account.id, artwork.id)
    .then(({ data }) => {
      dispatch(getWatchlistFull());
      dispatch(displayMessage(data.message));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoadingFalse());
      setIsAddedToWatchlist && setIsAddedToWatchlist(false);
    });
};

export const deleteFromWatchlist = ({
  artworkId,
  salePage,
  resalePage,
  saleFilter,
  resaleFilter,
}) => (dispatch, getState) => {
  const { account } = getState().user;

  deleteFromWatchlistRequest(account.id, artworkId)
    .then(({ data }) => {
      dispatch(deleteFromWatchlistSuccess({ artworkId }));
      dispatch(
        getWatchlistData({ salePage, resalePage, saleFilter, resaleFilter })
      );
      dispatch(displayMessage(data.message));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoadingFalse());
    });
};
