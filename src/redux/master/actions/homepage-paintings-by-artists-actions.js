import { SET_PAINTINGS } from 'constants/redux/publicHomepage';
import axios from 'dataLayer/axiosInstance';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { setSearchResult } from 'redux/search/action-creators';

export const setPaintings = payload => ({
  type: SET_PAINTINGS,
  payload,
});

export const getPaintingsByArtist = params => dispatch => {
  axios
    .get('/api/homepage/paintings-by-artist', { params })
    .then(res => {
      dispatch(setPaintings(res.data));
      dispatch(
        setSearchResult({
          inTrade: false,
        })
      );
    })
    .catch(error => dispatch(errorMessageHandler(error)));
};
