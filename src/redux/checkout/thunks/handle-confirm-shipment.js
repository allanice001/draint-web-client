import { calculating, updateCheckout } from 'redux/cart/actions/cart-actions';
import {
  confirmShipmentRequest,
  publicManualRatesRequest,
} from 'dataLayer/shipping/requests';
import { getItem, sendConfirmShipmentEvents } from 'helpers/shipment/helpers';
import { ERROR } from 'constants/components/message-statuses';
import { SHIPPING_ERROR } from 'constants/components/checkout/constants';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import handleConfirmManualShipment from './handle-confirm-manual-shipment';
import { prepareNewItems } from 'helpers/shipment/helpers';

const handleConfirmShipment = (
  artwork,
  profileId,
  address,
  items
) => dispatch => {
  dispatch(calculating(true));

  const buyerProfileId = profileId;
  const buyerAddress = address;
  const artworkId = artwork.id;
  const selectedRate = artwork.selectedRateId;
  const sellerProfileId = artwork.seller_profile_id;
  const item = getItem(items, artwork.id);

  confirmShipmentRequest(
    buyerProfileId,
    buyerAddress,
    artworkId,
    selectedRate,
    sellerProfileId
  )
    .then(({ data }) => {
      if (data.shipError) {
        return publicManualRatesRequest(
          buyerProfileId,
          sellerProfileId,
          artworkId
        ).then(({ data: manual }) => {
          item.rates = manual.rates;
          item.selectedRate = manual.lowestRatePrice;
          item.selectedRateId = manual.lowestRateCode;
          item.lowestRateCode = manual.lowestRateCode;
          item.lowestRatePrice = manual.lowestRatePrice;
          dispatch(
            handleConfirmManualShipment(artwork, profileId, address, items)
          );
        });
        // prev error handler
        // item.shipError = data;
        // dispatch(updateCheckout(prepareNewItems(items, artwork)));
        //
        // return dispatch(displayMessage(`${data.shipError}`, WARNING));
      }
      item.shipConfirm = data;
      dispatch(updateCheckout(prepareNewItems(items, artwork)));

      sendConfirmShipmentEvents();
    })
    .catch(() => {
      dispatch(calculating(false));
      dispatch(displayMessage(SHIPPING_ERROR, ERROR));
    });
};

export default handleConfirmShipment;
