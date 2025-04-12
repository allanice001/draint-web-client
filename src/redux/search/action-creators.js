import ACTIONS from './action-types';
import { generateView } from 'helpers/search/generateView';
import { getTotalByQuery } from 'redux/global/filters/filtersActions';

// Action Creators
export const setCurrentTab = payload => ({
  type: ACTIONS.SET_CURRENT_TAB,
  payload,
});

export const setShowResultFor = payload => ({
  type: ACTIONS.SET_SHOW_RESULT,
  payload,
});

const setSearchLoading = payload => ({
  type: ACTIONS.SET_SEARCH_LOADING,
  payload,
});

export const setSearchResult = payload => ({
  type: ACTIONS.SET_SEARCH_RESULT,
  payload,
});

export const addToCartSearchResult = payload => ({
  type: ACTIONS.ADD_TO_CART_SEARCH_RESULT,
  payload,
});

export const clearSearchResult = () => ({
  type: ACTIONS.CLEAR_SEARCH_RESULT,
});

export const clearSearchURLS = () => ({
  type: ACTIONS.CLEAR_SEARCH_URLS,
});

export const setSavedURL = payload => ({
  type: ACTIONS.SET_SAVED_URL,
  payload,
});

// Thunks
export const fetchSearchResult = payload => async dispatch => {
  const { action, params, withQuery } = payload;

  try {
    dispatch(setSearchLoading({ loading: true }));

    const res = await action(params);

    dispatch(
      setSearchResult({
        pages: res.totalPages,
        total: res.total,
        inTrade: res.inTrade,
        result: generateView(res.data),
      })
    );
    if (withQuery) {
      dispatch(getTotalByQuery(params));
    }
  } finally {
    dispatch(setSearchLoading({ loading: false }));
  }
};
