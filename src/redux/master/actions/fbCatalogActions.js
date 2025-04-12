import {
  ADD_TO_FB_CATALOG_SUCCESS,
  CHANGE_FB_CATALOG_ITEM,
  CLOSE_SNACKBAR,
  CREATE_CSV_SUCCESS,
  DELETE_ARTWORK_FB_SUCCESS,
  GET_ARTWORKS_FB_SUCCESS,
  GET_FB_CATALOG_ITEM_SUCCESS,
  GET_FB_CATALOG_SUCCESS,
  RESET_CSV,
  SET_ARTWORKS_FB_LOADING,
  SET_ARTWORKS_FB_PAGE,
  SET_EDIT_MODE,
  UPDATE_FB_CATALOG_ITEM_SUCCESS,
} from 'constants/redux/masterFbCatalog';

import { ERROR } from 'constants/components/message-statuses';
import addToCatalogRequest from 'dataLayer/master-dashboard/fb-catalog/add-to-catalog-request';
import axios from 'dataLayer/axiosInstanceMaster';
import catalogArtworkRequest from 'dataLayer/master-dashboard/fb-catalog/catalog-artwork-request';
import catalogItemRequest from 'dataLayer/master-dashboard/fb-catalog/catalog-item-request';
import catalogListRequest from 'dataLayer/master-dashboard/fb-catalog/catalog-list-request';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import updateCatalogItemRequest from 'dataLayer/master-dashboard/fb-catalog/update-catalog-item-request';

export const getArtworksSuccess = (
  currentArtworks,
  totalPages,
  totalArtworks
) => ({
  type: GET_ARTWORKS_FB_SUCCESS,
  payload: { currentArtworks, totalPages, totalArtworks },
});

export const setLoading = payload => ({
  type: SET_ARTWORKS_FB_LOADING,
  payload,
});

export const setPage = page => ({
  type: SET_ARTWORKS_FB_PAGE,
  payload: page,
});

export const addToCatalogSuccess = payload => ({
  type: ADD_TO_FB_CATALOG_SUCCESS,
  payload,
});

export const closeFbCatalogSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const getArtworks = (page = 1, query) => dispatch => {
  dispatch(setLoading(true));
  catalogArtworkRequest({
    alternateFilter: 'verified',
    filter: 'verified',
    foSale: 'true',
    price: 'true',
    page,
    query,
  })
    .then(({ data }) => {
      dispatch(
        getArtworksSuccess(data.artworks, data.totalPages, data.totalArtworks)
      );
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(error, ERROR));
    });
};

export const pageChange = (page, query) => dispatch => {
  dispatch(setPage(page));
  dispatch(getArtworks(page, query));
};

export const addToCatalog = (id, page) => dispatch => {
  addToCatalogRequest({ artworkId: id })
    .then(() => {
      dispatch(displayMessage('Added successfully!'));
      dispatch(getArtworks(page));
    })
    .catch(error => dispatch(errorMessageHandler(error, ERROR)));
};

// Catalog List

export const getCatalogSuccess = catalog => ({
  type: GET_FB_CATALOG_SUCCESS,
  payload: catalog,
});

export const getCatalog = ({ page, pageSize, query }) => dispatch => {
  dispatch(setLoading(true));
  catalogListRequest({ page: page, pageSize: pageSize, query: query })
    .then(({ data }) => dispatch(getCatalogSuccess(data)))
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(error, ERROR));
    });
};

export const getCatalogItemSuccess = item => ({
  type: GET_FB_CATALOG_ITEM_SUCCESS,
  payload: item,
});

export const setEditMode = () => ({
  type: SET_EDIT_MODE,
});

export const getCatalogItem = id => dispatch => {
  catalogItemRequest({ itemId: id })
    .then(({ data }) => {
      dispatch(getCatalogItemSuccess(data.item));
      dispatch(setEditMode());
    })
    .catch(error => dispatch(errorMessageHandler(error, ERROR)));
};

export const changeCatalogItem = item => ({
  type: CHANGE_FB_CATALOG_ITEM,
  payload: item,
});

export const updateCatalogItemSuccess = payload => ({
  type: UPDATE_FB_CATALOG_ITEM_SUCCESS,
  payload,
});

export const updateCatalogItem = (form, pagination) => dispatch => {
  dispatch(setLoading(true));
  const { page, pageSize } = pagination;
  updateCatalogItemRequest(form)
    .then(() => {
      dispatch(displayMessage('Updated successfully!'));
      dispatch(getCatalog({ page, pageSize }));
    })
    .catch(error => dispatch(errorMessageHandler(error, ERROR)));
};

export const createCSVsuccess = payload => ({
  type: CREATE_CSV_SUCCESS,
  payload,
});

export const resetCSVflag = () => ({
  type: RESET_CSV,
});

export const createCSV = () => dispatch => {
  dispatch(setLoading(true));
  axios
    .post('/api/master/createCsv')
    .then(() => {
      dispatch(createCSVsuccess());
      dispatch(displayMessage('CSV file created successfully'));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const deletedFromListSuccess = payload => ({
  type: DELETE_ARTWORK_FB_SUCCESS,
  payload,
});

export const deletedFromList = (id, page, pagination) => dispatch => {
  axios
    .delete(`/api/master/deleteCatalogItem?id=${id}`)
    .then(() =>
      dispatch(getCatalog({ page: page, pageSize: pagination.pageSize }))
    )
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};
