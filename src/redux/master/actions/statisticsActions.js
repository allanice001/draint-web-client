import {
  GET_MASTER_STATISTICS_DATA_SUCCESS,
  SET_MASTER_STATISTICS_DATA_DATE_FILTER,
  SET_MASTER_STATISTICS_DATA_FILTER,
  SET_MASTER_STATISTICS_DATA_OPTIONS_FILTER,
  SET_MASTER_STATISTICS_INITIAL_LOADING,
  SET_MASTER_STATISTICS_LOADING,
} from 'constants/redux/masterStatistics';

import axios from 'dataLayer/axiosInstanceMaster';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import getStatisticParameters from '../../../services/get-statistic-parameters';

export const setInitialLoading = () => ({
  type: SET_MASTER_STATISTICS_INITIAL_LOADING,
});

export const setLoading = chart => ({
  type: SET_MASTER_STATISTICS_LOADING,
  chart,
});

export const getStatisticsSuccess = (chart, payload) => ({
  type: GET_MASTER_STATISTICS_DATA_SUCCESS,
  payload,
  chart,
});

export const setFilter = (chart, filter) => ({
  type: SET_MASTER_STATISTICS_DATA_FILTER,
  payload: { filter },
  chart,
});

export const setDateFilter = (chart, date) => ({
  type: SET_MASTER_STATISTICS_DATA_DATE_FILTER,
  payload: { date },
  chart,
});

export const setCheckbox = (chart, options) => ({
  type: SET_MASTER_STATISTICS_DATA_OPTIONS_FILTER,
  payload: options,
  chart,
});

export const getStatistics = chart => (dispatch, getState) => {
  dispatch(setLoading(chart));
  const { statistics } = getState().master;
  const parameters = getStatisticParameters(chart, statistics);

  axios
    .get(`/api/metrics/${chart}`, { params: parameters })
    .then(res => dispatch(getStatisticsSuccess(chart, res.data.response)))
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
      dispatch(setLoading(chart));
    });
};

export const getAllStatistics = chartNames => async dispatch => {
  dispatch(setInitialLoading());

  const promises = chartNames.map(chart => {
    return dispatch(getStatistics(chart));
  });
  return Promise.all(promises).then(() => dispatch(setInitialLoading()));
};
