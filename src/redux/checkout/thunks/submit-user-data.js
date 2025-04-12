import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import submitAddressUpdate from './submitAddressUpdate';
import submitProfile from './submitProfile';

export default function submitUserData() {
  return (dispatch, getState) => {
    const { is_artist: isArtist } = getState().user.account;

    if (!isArtist) {
      dispatch(submitAddressUpdate());
    } else {
      dispatch(submitProfile());
    }

    ReactGA.event({
      category: 'Checkout',
      label: 'Customer had finished first step of checkout',
      action: 'CheckoutFirstStepFinished',
    });
    ReactPixel.trackCustom('CheckoutFirstStepFinished', {
      content_category: 'Checkout',
      content_name: 'Customer had finished first step of checkout',
    });
    PinterestTag.track('Checkout', {
      action: 'CheckoutFirstStepFinished',
      content_name: 'Customer had finished first step of checkout',
    });
  };
}
