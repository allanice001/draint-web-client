import { fetchRates, setRates } from 'redux/artwork/actions/artworkActions';
import {
  publicManualRatesRequest,
  publicRatesRequest,
} from 'dataLayer/shipping/requests';
import { CANT_CALCULATE } from 'constants/components/artwork-page';
import { WARNING } from 'constants/components/message-statuses';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

const handlePublicArtworkRates = (
  buyerData,
  sellerId,
  artworkId
) => dispatch => {
  dispatch(fetchRates());

  publicRatesRequest(buyerData, sellerId, artworkId)
    .then(({ data: ups }) => {
      if (ups.rateError) {
        return publicManualRatesRequest(buyerData, sellerId, artworkId)
          .then(({ data: manual }) => {
            dispatch(setRates(manual));
          })
          .catch(() => {
            dispatch(fetchRates());
            dispatch(displayMessage(CANT_CALCULATE, WARNING));
          });
      }

      dispatch(setRates(ups));
    })
    .catch(() => {
      dispatch(fetchRates());
      dispatch(displayMessage(CANT_CALCULATE, WARNING));
    });
};

export default handlePublicArtworkRates;
