import { ADDRESS_SHIPPING_FORM, OFFER_FORM } from 'constants/components/forms';
import {
  DRAINT_RATE,
  STRIPE_CARD,
} from 'constants/components/checkout/constants';
import React, { useEffect, useState } from 'react';
import { getFormSyncErrors, getFormValues } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import BasicModal from 'components/basic-modal/basic-modal';
import CheckoutPaymentDetails from 'components/cart/checkout-payment-detials/checkout-payment-detials';
import { OFFER_MODAL_CONTENT } from 'constants/components/modals';
import OfferAddressForm from './offer-address-form-content';
import OfferContent from './offer-content';
import PaymentFactory from 'models/paymentSystems/payment-system-factory';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import handleCancelManualOfferShipment from 'redux/checkout/thunks/handle-cancel-manual-offer-shipment';
import handleCancelOfferShipment from 'redux/checkout/thunks/handle-cancel-offer-shipment';
import handleConfirmOfferManualShipment from 'redux/checkout/thunks/handle-confirm-offer-manual-shipment';
import handleConfirmOfferShipment from 'redux/checkout/thunks/handle-confirm-offer-shipment';
import prepareOfferedOrder from 'redux/checkout/thunks/prepare-offered-order';
import { setOfferCheckout } from 'redux/artwork/actions/artworkActions';
import styles from './artwork-page-offer-modal.module.scss';
import { useArtworkPage } from 'hooks/use-artwork-page';

function ArtworkOfferModal({ isWatchList, watchListArtwork }) {
  const {
    offerModalOpen: open,
    closeOfferModal: handleClose,
    getOwnerName,
    artworkName: title,
    artworkPrice: initPrice,
    smallImage: src,
    currentArtwork,
    shippingRates,
    lowesRate,
    account,
    setOfferOpenCheck,
  } = useArtworkPage();

  const paymentSystem = PaymentFactory.construct(STRIPE_CARD, account);
  const dispatch = useDispatch();
  const state = useSelector(store => store);
  const offerCheckout = useSelector(
    store => store.artwork.artworkData.offerCheckout
  );
  const offerFormSyncErrors = getFormSyncErrors(OFFER_FORM)(state);
  const offerFormValues = getFormValues(OFFER_FORM)(state);
  const isValidOfferForm = !!Object.keys(offerFormSyncErrors).length;
  const { profile_id: profileId } = account;
  const [step, setStep] = useState(OFFER_MODAL_CONTENT.OFFER_FORM);

  useEffect(() => {
    if (open) {
      setStep(OFFER_MODAL_CONTENT.OFFER_FORM);
    }
  }, [open]);

  useEffect(() => {
    if (isWatchList) {
      if (currentArtwork.id === watchListArtwork?.id) {
        setOfferOpenCheck();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArtwork]);

  function confirmShipment(artwork) {
    const address = getFormValues(`${ADDRESS_SHIPPING_FORM}-${artwork.id}`)(
      state
    );
    const selectedRate = artwork.selectedRateId;

    if (selectedRate === DRAINT_RATE) {
      return dispatch(
        handleConfirmOfferManualShipment(
          artwork,
          profileId,
          address,
          offerCheckout
        )
      );
    }

    dispatch(
      handleConfirmOfferShipment(artwork, profileId, address, offerCheckout)
    );
  }

  function cancelShipment(artwork) {
    const selectedRate = artwork.selectedRateId;

    if (selectedRate === DRAINT_RATE) {
      return dispatch(handleCancelManualOfferShipment(artwork));
    }

    dispatch(handleCancelOfferShipment(artwork));
  }

  function closeModalWindow() {
    cancelShipment(offerCheckout);

    return handleClose();
  }

  function findRate(rateId) {
    const rate = offerCheckout.rates.find(rate => rate.rateCode === rateId);

    return rate.ratePrice;
  }

  function getTotalPrice(price, rate) {
    return Number(Number(Number(price) + Number(rate)).toFixed(2));
  }

  function handleRateChange(e) {
    const { value } = e.target;
    const ratePrice = findRate(value);
    dispatch(
      setOfferCheckout({
        ...offerCheckout,
        selectedRateId: value,
        totalCost: getTotalPrice(offerFormValues.price, ratePrice),
      })
    );

    ReactGA.event({
      category: 'Checkout',
      label: 'User selected another rate',
      action: 'GotNewRates',
    });
    ReactPixel.trackCustom('GotNewRates', {
      content_category: 'Checkout',
      content_name:
        'User get new rates for specified address on checkout shipping-page step',
    });
    PinterestTag.track('Checkout', {
      action: 'GotNewRates',
      content_name:
        'User get new rates for specified address on checkout shipping-page step',
    });
  }

  function getOfferContent() {
    switch (step) {
      case OFFER_MODAL_CONTENT.OFFER_FORM:
        return (
          <OfferContent
            title={title}
            src={src}
            artist={getOwnerName()}
            initPrice={initPrice}
            lowesRate={lowesRate}
          />
        );
      case OFFER_MODAL_CONTENT.ADDRESS_FORM:
        return (
          <OfferAddressForm
            items={[offerCheckout]}
            // removeItemFromShipment={removeItemFromShipment}
            confirmShipment={confirmShipment}
            cancelShipment={cancelShipment}
            handleRateChange={handleRateChange}
          />
        );
      case OFFER_MODAL_CONTENT.CARD_FROM:
        return (
          <CheckoutPaymentDetails
            selectedPaymentMethod={STRIPE_CARD}
            // handlePaymentMethodChange={handlePaymentMethodChange}
            paymentSystem={paymentSystem}
            modal
          />
        );
      default:
        return handleClose();
    }
  }

  function handleNextStep() {
    if (step === OFFER_MODAL_CONTENT.OFFER_FORM) {
      dispatch(
        setOfferCheckout({
          ...currentArtwork,
          totalCost: getTotalPrice(offerFormValues.price, lowesRate),
          offerPrice: offerFormValues.price,
          rates: currentArtwork.shipping.rates,
          selectedRateId: currentArtwork.shipping.lowestRateCode,
        })
      );
    }

    if (step === OFFER_MODAL_CONTENT.CARD_FROM) {
      dispatch(
        prepareOfferedOrder(offerCheckout, paymentSystem, account, handleClose)
      );
    }

    if (step !== OFFER_MODAL_CONTENT.CARD_FROM) {
      return setStep(step + 1);
    }
  }

  function handleBackStep() {
    if (step !== OFFER_MODAL_CONTENT.OFFER_FORM) {
      return setStep(step - 1);
    }

    closeModalWindow();
  }

  function isDisabledNext() {
    switch (step) {
      case OFFER_MODAL_CONTENT.OFFER_FORM:
        return isValidOfferForm;
      case OFFER_MODAL_CONTENT.ADDRESS_FORM:
        return !!!offerCheckout.shippingId;
      case OFFER_MODAL_CONTENT.CARD_FROM:
        return !!offerCheckout.cardLoading;
      default:
        return false;
    }
  }

  function isDisabledBack() {
    switch (step) {
      case OFFER_MODAL_CONTENT.ADDRESS_FORM:
        return !!offerCheckout.calculating;
      case OFFER_MODAL_CONTENT.CARD_FROM:
        return !!offerCheckout.cardLoading;
      default:
        return false;
    }
  }

  function nextButtonName() {
    if (step !== OFFER_MODAL_CONTENT.CARD_FROM) {
      return OFFER_MODAL_CONTENT.nextButton;
    }

    return OFFER_MODAL_CONTENT.submitButton;
  }

  function backButtonName() {
    if (step !== OFFER_MODAL_CONTENT.OFFER_FORM) {
      return OFFER_MODAL_CONTENT.backButton;
    }

    return OFFER_MODAL_CONTENT.closeButton;
  }

  return (
    <BasicModal
      title={OFFER_MODAL_CONTENT.title}
      isOpen={!!(open && shippingRates.length)}
      handleClose={closeModalWindow}
      footerClassName={styles.footer}
      className={styles.modal_body}
      footer={
        <div className={styles.step_buttons}>
          <button
            disabled={isDisabledBack()}
            className="secondary-button"
            type="button"
            onClick={() => {
              handleBackStep();
            }}
          >
            {backButtonName()}
          </button>
          <button
            disabled={isDisabledNext()}
            className="primary-button"
            type="button"
            onClick={() => {
              handleNextStep();
            }}
          >
            {nextButtonName()}
          </button>
        </div>
      }
    >
      {getOfferContent()}
    </BasicModal>
  );
}

export default ArtworkOfferModal;
