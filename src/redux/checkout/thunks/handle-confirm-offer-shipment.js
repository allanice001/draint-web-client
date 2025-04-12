import {
  calculateTotal,
  sendConfirmShipmentEvents,
} from 'helpers/shipment/helpers';
import {
  confirmShipmentRequest,
  publicManualRatesRequest,
} from 'dataLayer/shipping/requests';
import {
  setOfferCheckout,
  setRates,
} from 'redux/artwork/actions/artworkActions';
import { ERROR } from 'constants/components/message-statuses';
import { SHIPPING_ERROR } from 'constants/components/checkout/constants';
import { calculating } from 'redux/cart/actions/cart-actions';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import handleConfirmOfferManualShipment from './handle-confirm-offer-manual-shipment';

const handleConfirmOfferShipment = (
  artwork,
  profileId,
  address,
  offerCheckout
) => dispatch => {
  const buyerProfileId = profileId;
  const buyerAddress = address;
  const artworkId = artwork.id;
  const selectedRate = artwork.selectedRateId;
  const sellerProfileId = artwork.ownerInfo.profile_id;
  dispatch(setOfferCheckout({ ...offerCheckout, calculating: true }));

  confirmShipmentRequest(
    buyerProfileId,
    buyerAddress,
    artworkId,
    selectedRate,
    sellerProfileId
  )
    .then(({ data }) => {
      dispatch(calculating(true));

      if (data.shipError) {
        return publicManualRatesRequest(
          buyerProfileId,
          sellerProfileId,
          artworkId
        ).then(({ data: manual }) => {
          dispatch(setRates(manual));
          artwork.rates = manual.rates;

          return dispatch(
            handleConfirmOfferManualShipment(
              artwork,
              profileId,
              address,
              offerCheckout
            )
          );
        });
        // prev error handle
        // const { shipError } = data;
        // dispatch(
        //   setOfferCheckout({
        //     ...offerCheckout,
        //     shipError: shipError,
        //     calculating: false,
        //   })
        // );
        //
        // dispatch(calculating(false));
        // return dispatch(displayMessage(`${shipError}`, WARNING));
      }

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

export default handleConfirmOfferShipment;
