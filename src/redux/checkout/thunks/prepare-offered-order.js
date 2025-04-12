import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { OFFER_SENT } from 'constants/components/checkout/constants';
import { createOfferRequest } from 'dataLayer/checkout/create-offer-request';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { prepareOfferOrder } from 'dataLayer/checkout/prepare-offer-order';
import { setOfferCheckout } from 'redux/artwork/actions/artworkActions';
import { ERROR } from 'constants/components/message-statuses';

const HelperForAnalytic = AnalyticHelper.create();

const prepareOfferedOrder = (
  offerOrderData,
  paymentSystem,
  account,
  handleClose
) => async dispatch => {
  try {
    dispatch(setOfferCheckout({ ...offerOrderData, cardLoading: true }));

    if (paymentSystem.preparePaymentSystem) {
      const paymentData = await paymentSystem.preparePaymentSystem();
      const offerOrderObject = {
        ...offerOrderData,
        payment_system: paymentSystem.name,
        paymentData: paymentData.token,
        buyer: account.id,
        paymentSystem: paymentSystem.getDataForPayment(),
      };

      createOfferRequest({
        price: offerOrderObject.offerPrice,
        artwork_id: offerOrderObject.id,
        to_account: offerOrderObject.ownerInfo.account_id,
        from_account: offerOrderObject.buyer,
        paymentData: paymentData.token,
        payment_system: paymentSystem.name,
      })
        .then(({ data }) => {
          if (data.errorMessage) {
            dispatch(
              setOfferCheckout({ ...offerOrderData, cardLoading: false })
            );
            return dispatch(
              displayMessage(`Card Error: ${data.errorMessage}`, ERROR)
            );
          }

          const { offer } = data;
          prepareOfferOrder({ ...offerOrderObject, offer })
            .then(() => {
              dispatch(displayMessage(OFFER_SENT));

              HelperForAnalytic.createEvent('OfferWasSent', {
                value: offer.price,
                eventId: offer.id,
              });

              handleClose();
              dispatch(
                setOfferCheckout({ ...offerOrderData, cardLoading: false })
              );
            })
            .catch(error => {
              dispatch(
                setOfferCheckout({ ...offerOrderData, cardLoading: false })
              );
              dispatch(errorMessageHandler(error));
            });
        })
        .catch(error => {
          dispatch(setOfferCheckout({ ...offerOrderData, cardLoading: false }));
          dispatch(errorMessageHandler(error));
        });
    }
  } catch (error) {
    dispatch(setOfferCheckout({ ...offerOrderData, cardLoading: false }));
    dispatch(errorMessageHandler(error));
  }
};

export default prepareOfferedOrder;
