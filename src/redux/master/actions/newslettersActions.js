import {
  CLOSE_SNACKBAR,
  GET_AUTO_LETTERS_ERROR,
  GET_AUTO_LETTERS_SUCCESS,
  GET_NEW_ARTISTS_SUCCESS,
  GET_NEW_ARTWORKS_ERROR,
  GET_NEW_ARTWORKS_SUCCESS,
  GET_RECIPIENTS_SUCCESS,
  GET_STATS_ERROR,
  GET_STATS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_TEMPLATE_SUCCESS,
  RESET_RECIPIENTS_LIST,
  RESET_SELECTED_ARTIST_DATE,
  RESET_SELECTED_ARTWORK_DATE,
  RESET_TEMPLATE,
  SAVE_LETTER_DIALOG,
  SAVE_LETTER_ERROR,
  SAVE_LETTER_SUCCESS,
  SELECT_ALL_RECIPIENTS,
  SET_ARTISTS_END_DATE,
  SET_ARTISTS_SELECTED_DATE,
  SET_ARTISTS_START_DATE,
  SET_ARTWORKS_END_DATE,
  SET_ARTWORKS_SELECTED_DATE,
  SET_ARTWORKS_START_DATE,
  SET_AUTO_LETTER_TYPE,
  SET_CHECKED_ARTISTS_DATA,
  SET_CHECKED_ARTWORKS_DATA,
  SET_MAIL_FORM,
  SET_NEWSLETTERS_LOADING,
  SET_PREV_TEMPLATE,
  SET_RECIPIENTS_FILTER,
  SET_RECIPIENTS_LIST,
  SET_RECIPIENTS_PAGE,
  SET_SUBSCRIPTIONS_FILTER,
  SET_SUBSCRIPTIONS_ORDER,
} from 'constants/redux/masterNewsletters';
import { ERROR, WARNING } from '../../../constants/components/message-statuses';
import {
  FILL_FORM_ALERT,
  FORM_SUCCESS_UPDATED,
  SELECT_TYPE_ALERT,
} from 'constants/master-dashboard/automated-newslaters';

import axios from 'dataLayer/axiosInstanceMaster';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

export const setLoading = () => ({
  type: SET_NEWSLETTERS_LOADING,
});

export const setMailForm = payload => ({
  type: SET_MAIL_FORM,
  payload,
});

export const getAutoLettersSuccess = payload => ({
  type: GET_AUTO_LETTERS_SUCCESS,
  payload,
});

export const getAutoLettersError = error => ({
  type: GET_AUTO_LETTERS_ERROR,
  payload: error,
});

export const setLetterType = payload => ({
  type: SET_AUTO_LETTER_TYPE,
  payload,
});

export const getNewArtworksSuccess = payload => ({
  type: GET_NEW_ARTWORKS_SUCCESS,
  payload,
});

export const getNewArtworksError = error => ({
  type: GET_NEW_ARTWORKS_ERROR,
  payload: error,
});

export const getNewArtistsSuccess = payload => ({
  type: GET_NEW_ARTISTS_SUCCESS,
  payload,
});

export const setArtistsDateSelected = payload => ({
  type: SET_ARTISTS_SELECTED_DATE,
  payload,
});

export const setArtworksDateSelected = payload => ({
  type: SET_ARTWORKS_SELECTED_DATE,
  payload,
});

export const setArtistsDateFrom = (field, date) => ({
  type: SET_ARTISTS_START_DATE,
  payload: { [field]: date },
});

export const setArtistsDateTo = (field, date) => ({
  type: SET_ARTISTS_END_DATE,
  payload: { [field]: date },
});

export const setArtworksDateFrom = (field, date) => ({
  type: SET_ARTWORKS_START_DATE,
  payload: { [field]: date },
});

export const setArtworksDateTo = (field, date) => ({
  type: SET_ARTWORKS_END_DATE,
  payload: { [field]: date },
});

export const saveLetterSuccess = payload => ({
  type: SAVE_LETTER_SUCCESS,
  payload,
});

export const saveLetterError = error => ({
  type: SAVE_LETTER_ERROR,
  payload: error,
});

export const saveLetterDialog = () => ({
  type: SAVE_LETTER_DIALOG,
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const getRecipientsSuccess = payload => ({
  type: GET_RECIPIENTS_SUCCESS,
  payload,
});

export const setRecipientsList = payload => ({
  type: SET_RECIPIENTS_LIST,
  payload,
});

export const selectAllRecipients = () => ({
  type: SELECT_ALL_RECIPIENTS,
});

export const resetRecipients = () => ({
  type: RESET_RECIPIENTS_LIST,
});

export const resetSelectedDateArtist = () => ({
  type: RESET_SELECTED_ARTIST_DATE,
});

export const resetSelectedDateArtwork = () => ({
  type: RESET_SELECTED_ARTWORK_DATE,
});

export const setFilter = (field, filter) => ({
  type: SET_RECIPIENTS_FILTER,
  payload: { [field]: filter },
});

export const setPage = page => ({
  type: SET_RECIPIENTS_PAGE,
  payload: page,
});

export const getSubscriptionsSuccess = payload => ({
  type: GET_SUBSCRIPTIONS_SUCCESS,
  payload,
});

export const getSubscriptionsError = error => ({
  type: GET_SUBSCRIPTIONS_ERROR,
  payload: error,
});

export const setSubscriptionsFilter = filter => ({
  type: SET_SUBSCRIPTIONS_FILTER,
  payload: filter,
});

export const setSubscriptionsOrder = order => ({
  type: SET_SUBSCRIPTIONS_ORDER,
  payload: order,
});

export const getStatsSuccess = payload => ({
  type: GET_STATS_SUCCESS,
  payload,
});

export const getTemplateSuccess = payload => ({
  type: GET_TEMPLATE_SUCCESS,
  payload,
});

export const setCheckedArtworkData = payload => ({
  type: SET_CHECKED_ARTWORKS_DATA,
  payload,
});

export const setCheckedArtistData = payload => ({
  type: SET_CHECKED_ARTISTS_DATA,
  payload,
});

export const resetTemplate = () => ({
  type: RESET_TEMPLATE,
});

export const getStatsError = error => ({
  type: GET_STATS_ERROR,
  payload: error,
});

export const setPrevTemplate = payload => ({
  type: SET_PREV_TEMPLATE,
  payload,
});

export const getCheckedArtworkData = checkedArtworks => dispatch => {
  axios
    .get('/api/newsletter-subscription/checked-artworks', {
      params: { checkedArtworks },
    })
    .then(res => dispatch(setCheckedArtworkData(res.data)))
    .catch(err => dispatch(errorMessageHandler(err)));
};

export const getCheckedArtistData = checkedArtists => dispatch => {
  axios
    .get('/api/newsletter-subscription/checked-artists', {
      params: { checkedArtists },
    })
    .then(res => dispatch(setCheckedArtistData(res.data)))
    .catch(err => dispatch(errorMessageHandler(err)));
};

export const getNewArtworks = (from, to, query) => dispatch => {
  axios
    .get('/api/master/artworksLatest', { params: { from, to, query } })
    .then(res => dispatch(getNewArtworksSuccess(res.data.artworks)))
    .catch(err => dispatch(errorMessageHandler(err)));
};

export const getNewArtists = (from, to, query) => dispatch => {
  axios
    .get('/api/master/artistsLatest', { params: { from, to, query } })
    .then(res => dispatch(getNewArtistsSuccess(res.data.artists)))
    .catch(err => dispatch(errorMessageHandler(err)));
};

export const getWeeklyTemplateData = () => async dispatch => {
  axios
    .get('/api/newsletter-subscription/weekly-template')
    .then(res => dispatch(setPrevTemplate(res.data)))
    .catch(err => dispatch(errorMessageHandler(err)));
};

export const saveWeeklyLetter = (
  form,
  checkedArtworks,
  checkedArtists
) => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/newsletter-subscription/newsletter', {
      form,
      checkedArtworks,
      checkedArtists,
    })
    .then(res => {
      dispatch(saveLetterSuccess(res.data.message));
      dispatch(getWeeklyTemplateData(res.data.newsletters));
      dispatch(displayMessage('Form successfully updated'));
    })
    .catch(err => dispatch(errorMessageHandler(err)));
};

export const getAutoLetters = () => async (dispatch, getState) => {
  dispatch(setLoading());
  axios
    .get('/api/newsletter-subscription/auto-letters')
    .then(res => {
      const { letters } = res.data;
      const { selectedType } = getState().master.newsletters;
      const autoForm = letters.find(el => el.type === selectedType);
      dispatch(getAutoLettersSuccess(res.data.letters));
      dispatch(setMailForm(autoForm));
    })
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const saveAutoLetter = (form, selectedType) => dispatch => {
  axios
    .put('/api/newsletter-subscription/auto-letters', { form, selectedType })
    .then(() => {
      dispatch(displayMessage(FORM_SUCCESS_UPDATED));
      dispatch(getAutoLetters());
      dispatch(saveLetterDialog());
    })
    .catch(error => {
      dispatch(displayMessage(error.message, ERROR));
      dispatch(saveLetterDialog());
    });
};

export const handleSaveAutoLetterLetter = (form, selectedType) => dispatch => {
  if (form.title === '' || form.text === String('<p><br></p>')) {
    return dispatch(displayMessage(FILL_FORM_ALERT, WARNING));
  }

  if (selectedType === '') {
    return dispatch(displayMessage(SELECT_TYPE_ALERT, WARNING));
  }

  dispatch(saveAutoLetter(form, selectedType));
};

export const getRecipients = (
  query,
  filter,
  artworkFilter,
  subscriptionFilter,
  page,
  roleFilter
) => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/master/artistsEmails', {
      params: {
        query,
        filter,
        artworkFilter,
        subscriptionFilter,
        page,
        roleFilter,
      },
    })
    .then(res =>
      dispatch(
        getRecipientsSuccess({
          currentAccounts: res.data.artists,
          totalAccounts: res.data.totalArtists,
          totalPages: res.data.totalPages,
        })
      )
    )
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const sendCustomLetter = (form, checkedAccounts) => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/newsletter-subscription/custom-letter', {
      form,
      checkedAccounts,
    })
    .then(res => {
      const date = () => {
        if (form.dateSelected) {
          const a = new Date(form.selectedDate);
          const b = a.toUTCString();
          return `at ${b}`;
        }
        return '';
      };

      dispatch(
        setMailForm({
          title: '',
          text: '',
          img_link: '',
          dateSelected: false,
          selectedDate: null,
        })
      );

      dispatch(
        displayMessage(`${res.data.recipients} letter(s) will be set ${date()}`)
      );
    })
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

const handleSortSubscriptionsDate = (newsletter, order) => {
  newsletter.sort((a, b) => {
    if (order === 'asc') return new Date(b.date_add) - new Date(a.date_add);
    return new Date(a.date_add) - new Date(b.date_add);
  });
  return newsletter;
};

export const sortSubscriptionsDate = (newsletter, order) => dispatch => {
  const sortSubscriptions = handleSortSubscriptionsDate(newsletter, order);
  dispatch(getSubscriptionsSuccess(sortSubscriptions));
};

export const getSubscriptions = (filter, order) => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/newsletter-subscription?statusFilter=${filter}`)
    .then(res => dispatch(sortSubscriptionsDate(res.data.data, order)))
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const getStats = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/newsletter-subscription/stats')
    .then(res => dispatch(getStatsSuccess(res.data.stats.stats)))
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const getTemplate = data => dispatch => {
  axios
    .post('/api/newsletter-subscription/template', data)
    .then(res => dispatch(getTemplateSuccess(res.data)))
    .catch(err => dispatch(errorMessageHandler(err)));
};
