import {
  calculateTotal,
  sendConfirmShipmentEvents,
} from 'helpers/shipment/helpers';
import { ERROR } from 'constants/components/message-statuses';
import { SHIPPING_ERROR } from 'constants/components/checkout/constants';
import { calculating } from 'redux/cart/actions/cart-actions';
import { confirmShipmentManualRequest } from 'dataLayer/shipping/requests';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { setOfferCheckout } from 'redux/artwork/actions/artworkActions';

const handleConfirmOfferManualShipment = (
  artwork,
  profileId,
  address,
  offerCheckout
) => dispatch => {
  const buyerProfileId = profileId;
  const buyerAddress = address;
  artwork.seller_profile_id = artwork.ownerInfo.profile_id;
  artwork.selectedRateId = artwork.rates[0].rateCode;
  artwork.selectedRate = artwork.rates[0].ratePrice;

  dispatch(setOfferCheckout({ ...offerCheckout, calculating: true }));

  confirmShipmentManualRequest(buyerProfileId, buyerAddress, artwork)
    .then(({ data }) => {
      dispatch(calculating(true));

      const { offerPrice } = offerCheckout;
      const { shipId, rates } = data;
      const [{ ratePrice }] = rates;

      dispatch(
        setOfferCheckout({
          ...offerCheckout,
          shipConfirm: data,
          shippingId: shipId,
          calculatedRate: rates,
          totalCost: calculateTotal(offerPrice, ratePrice),
          selectedAddress: buyerAddress,
          calculating: false,
        })
      );

      dispatch(calculating(false));

      sendConfirmShipmentEvents();
    })
    .catch(() => {
      dispatch(
        setOfferCheckout({
          ...offerCheckout,
          shipError: SHIPPING_ERROR,
        })
      );
      dispatch(calculating(false));
      dispatch(setOfferCheckout({ ...offerCheckout, calculating: false }));
      dispatch(displayMessage(SHIPPING_ERROR, ERROR));
    });
};

export default handleConfirmOfferManualShipment;
