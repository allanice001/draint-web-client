import {
  ADDRESS_FORM,
  ADDRESS_SHIPPING_FORM,
  CUSTOMER_FORM,
  PROFILE_FORM,
} from 'constants/components/forms';
import {
  PAYMENT_INFO_STEP,
  SHIPPING_INFO_STEP,
} from 'constants/components/checkout';
import {
  DECLINED,
  DRAINT_RATE,
  STRIPE_CARD,
} from 'constants/components/checkout/constants';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@material-ui/core';
import { CheckoutFooter } from 'components/cart/checkout-footer/checkout-footer';
import { CheckoutHeader } from 'components/cart/checkout-header/checkout-header';
import { ERROR } from 'socket.io-json-parser';
import PaymentFactory from 'models/paymentSystems/payment-system-factory';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import cancelOrderHandler from 'redux/checkout/thunks/cancel-order-handler';
import cancelShipmentsHandler from 'redux/checkout/thunks/cancel-shipments-handler';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import handleCancelConfirmShipment from 'redux/checkout/thunks/handle-cancel-confirm-shipment';
import handleCancelManualConfirmShipment from 'redux/checkout/thunks/handle-cancel-manual-confirm-shipment';
import handleConfirmManualShipment from 'redux/checkout/thunks/handle-confirm-manual-shipment';
import handleConfirmShipment from 'redux/checkout/thunks/handle-confirm-shipment';
import isChangedAddressForm from 'redux/checkout/actions/changeAddressForm';
import isChangedInfoForm from 'redux/checkout/actions/changeInfoForm';
import preparingOrder from 'redux/checkout/thunks/prepare-order';
import previousStep from 'redux/checkout/actions/previousStep';
import sendCheckoutHandler from 'redux/checkout/thunks/sendCheckout';
import setShippingSettings from 'redux/checkout/thunks/setShippingSettings';
import { CheckoutContent } from './checkout-content';

function StepperCheckout({
  cartItems,
  summaryInfo,
  changeSummaryInfo,
  removeItem,
}) {
  const dispatch = useDispatch();

  const { account: user } = useSelector(state => state.user);
  const { checkout } = useSelector(state => state);
  const paymentSystemState = checkout.paymentSystem;
  const forms = useSelector(state => state.form);
  const form = {
    profileInfoForm: forms.profileInfoForm,
    customerForm: forms.customerForm,
    addressShippingForm: forms.addressShippingForm,
  };

  const [paymentSystem, setPaymentSystem] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    STRIPE_CARD
  );
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  const { step, loading, orders, is_changed: isChanged } = checkout;
  const { is_artist: isArtist, profile_id: profileId, token } = user;
  const isPaymentsFromValid = paymentSystemState.isPaymentsFromValid;
  const hasUserAccess = paymentSystemState.hasUserAccess;

  function finalizeOrder() {
    dispatch(preparingOrder(items, paymentSystem));

    ReactGA.event({
      category: 'Checkout',
      label: 'Customer had finished third step of checkout',
      action: 'CheckoutThirdStepFinished',
    });
    ReactPixel.trackCustom('CheckoutThirdStepFinished', {
      content_category: 'Checkout',
      content_name: 'Customer had finished third step of checkout',
    });
    PinterestTag.track('Checkout', {
      action: 'CheckoutThirdStepFinished',
      content_name: 'Customer had finished third step of checkout',
    });
  }

  function sendCheckout(orders, paymentSystemType, items) {
    dispatch(
      sendCheckoutHandler(orders, paymentSystemType.getDataForPayment(), items)
    );
  }

  function handleDisableNextButton() {
    const paymentSystemState =
      step === PAYMENT_INFO_STEP
        ? !hasUserAccess || !isPaymentsFromValid
        : false;
    const user = token && !isArtist;
    const forms = [user ? CUSTOMER_FORM : PROFILE_FORM, ADDRESS_FORM];
    const isDeclinedOrders = orders
      ? orders.some(order => order.verification === DECLINED)
      : false;
    const isInValid = forms.some(formType => form[formType]?.syncErrors);

    return isInValid || paymentSystemState || isDeclinedOrders;
  }

  function handleDisableChangeButton() {
    return Object.values(isChanged).filter((val, i) => i === step)[0];
  }

  function handleChangeForms() {
    dispatch(isChangedInfoForm(true));
    dispatch(isChangedAddressForm(true));
  }

  function confirmShipment(artwork) {
    const address = forms[`${ADDRESS_SHIPPING_FORM}-${artwork.id}`].values;
    const selectedRate = artwork.selectedRateId;

    if (selectedRate === DRAINT_RATE) {
      return dispatch(
        handleConfirmManualShipment(artwork, profileId, address, items)
      );
    }

    dispatch(handleConfirmShipment(artwork, profileId, address, items));
  }

  function cancelShipment(artwork) {
    const selectedRate = artwork.selectedRateId;

    if (selectedRate === DRAINT_RATE) {
      dispatch(handleCancelManualConfirmShipment(artwork, items));
    }

    dispatch(handleCancelConfirmShipment(artwork, items));
  }

  function setShippingData(items) {
    items.map(item => {
      item.newSelectedAddress = {
        ...forms[`${ADDRESS_SHIPPING_FORM}-${item.id}`].values,
      };
      return item;
    });

    dispatch(setShippingSettings(items));
  }

  function handleRateChange(e, artwork) {
    const itemsNew = items.map(item => {
      if (item.id === artwork.id) artwork.newSelectedRate = e.target.value;
      return item;
    });
    setItems(itemsNew);
    changeSummaryInfo(itemsNew);
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

  async function handleNext() {
    switch (step) {
      case SHIPPING_INFO_STEP:
        return setShippingData(items);
      case PAYMENT_INFO_STEP:
        return finalizeOrder();
      default:
        return 'Unknown step';
    }
  }

  function handlePaymentMethodChange(paymentType) {
    try {
      const paymentSystem = PaymentFactory.construct(
        paymentType,
        checkout.data
      );
      setSelectedPaymentMethod(paymentType);
      setPaymentSystem(paymentSystem);
    } catch (err) {
      dispatch(displayMessage(err.message, ERROR));
    }
  }

  function removeItemFromShipment(id, sellerId) {
    removeItem(id, sellerId);
  }

  return (
    <div className="paper-content">
      <div id="checkout-stepper-form">
        <Card className="paper-content">
          <CheckoutHeader activeStep={step} />

          <CheckoutContent
            step={step}
            items={items}
            removeItemFromShipment={removeItemFromShipment}
            confirmShipment={confirmShipment}
            cancelShipment={cancelShipment}
            handleRateChange={handleRateChange}
            paymentSystem={paymentSystem}
            selectedPaymentMethod={selectedPaymentMethod}
            user={user}
            setPaymentSystem={setPaymentSystem}
            handlePaymentMethodChange={handlePaymentMethodChange}
          />

          {!!items.length && (
            <CheckoutFooter
              loading={loading}
              step={step}
              previousStep={() => dispatch(previousStep())}
              handleNext={handleNext}
              disabledNext={handleDisableNextButton() || loading}
              disabledENV={process.env.NODE_ENV === 'production'}
              disabledChange={handleDisableChangeButton()}
              handleChangeForms={handleChangeForms}
              summaryInfo={summaryInfo}
              cancelShipment={() => {
                dispatch(cancelShipmentsHandler(items));
              }}
              cancelOrder={() => {
                dispatch(cancelOrderHandler(orders, items));
              }}
              sendCheckout={() => sendCheckout(orders, paymentSystem, items)}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default StepperCheckout;
