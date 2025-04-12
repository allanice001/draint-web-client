import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

export const getItem = (items, artworkId) => {
  return items.filter(item => item.id === artworkId)[0];
};

export const prepareNewItems = (items, artwork) => {
  return items.map(item => {
    if (item.id === artwork.id) return artwork;

    return item;
  });
};

export const calculateTotal = (itemPrice, ratePrice) => {
  return Number(Number(Number(itemPrice) + Number(ratePrice)).toFixed(2));
};

export const isShippingPrepare = items => {
  return !!!items.filter(item => item.shippingId === undefined).length;
};

export const sendConfirmShipmentEvents = () => {
  ReactGA.event({
    category: 'Checkout',
    label:
      'User get new rates for specified address on checkout shipping-page step',
    action: 'GotNewRates',
  });

  ReactPixel.trackCustom('GotNewRates', {
    content_category: 'Checkout',
    content_name:
      'User get new rates for specified address on checkout shipping-page step',
  });
};

export const sendCancelShipmentEvents = () => {
  ReactGA.event({
    category: 'Checkout',
    label:
      'User cancel new rates for specified address on checkout shipping-page step',
    action: 'CancelNewRates',
  });
  ReactPixel.trackCustom('CancelNewRates', {
    content_category: 'Checkout',
    content_name:
      'User cancel new rates for specified address on checkout shipping-page step',
  });
};

export const sendFinishedSecondStep = () => {
  ReactGA.event({
    category: 'Checkout',
    label: 'Customer had finished second step of checkout',
    action: 'CheckoutSecondStepFinished',
  });
  ReactPixel.trackCustom('CheckoutSecondStepFinished', {
    content_category: 'Checkout',
    content_name: 'Customer had finished second step of checkout',
  });
};
