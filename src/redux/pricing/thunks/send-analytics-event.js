import {
  CURRENCY,
  PLANS,
  SEND_DATA_TYPE,
  TARGET_ID,
} from 'constants/analytics/analytics-constants';

import GTag from 'services/analytics/ga-gtag';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

const TEST_ID = 'ff7b3bf0-2a82-4437-9672-64fc661ea1a7';

export const AddArtworkToCartEvent = value => {
  GTag.send.raw(SEND_DATA_TYPE, TARGET_ID, { value, currency: CURRENCY });
};

export const HandleSignUpSubscriptionAnalyticEvents = (
  checkedPlan,
  checkedPlanId,
  accountId
) => {
  const label = PLANS[checkedPlanId].name;
  const content =
    checkedPlanId === TEST_ID
      ? 'Standard SignUp was completed by Artist '
      : `${checkedPlan}Standard SignUp was completed by Artist`;

  GTag.send.conversion(checkedPlanId);

  window.fbq('track', label, { category: 'User' }, { eventID: accountId });
  ReactGA.event({ category: 'User', label, action: content });
};

const sendAnalyticsEvents = (response, userId, planId) => {
  const eventData = {
    content_category: 'User',
    content_name: 'Subscription process',

    contents: {
      id: userId,
      planId: response.data.subscription.planId,
      planIdStripe: response.data.subscription.planIdStripe || null,
      status: response.data.subscription.status || 'unsubscribed',
    },
  };

  const planName = PLANS[planId].name;

  switch (eventData.contents.status) {
    case 'active':
    case 'unsubscribed':
      GTag.send.conversion(planId);

      window.fbq(
        'track',
        planName,
        {
          category: 'User',
          label: 'Subscription process',
        },
        { eventID: `${userId}-${planId}` }
      );

      ReactGA.event({
        category: 'User',
        label: planName,
        action: 'Subscription process',
      });
      break;
    case 'past_due':
      ReactPixel.trackCustom('Finish subscription processError', eventData);
      ReactGA.event({
        category: 'User',

        label:
          "Payment on the latest invoice either failed or wasn't attempted.",

        action: 'Subscription process',
      });
      break;
    case 'incomplete':
      ReactPixel.trackCustom(
        'Finish subscription process incomplete',
        eventData
      );
      ReactGA.event({
        category: 'User',
        label: `Payment failed when the subscription was created. A successful payment needs to be made within 23
        hours to activate the subscription. See the payments section for details on resolving subscriptions with this status.`,
        action: 'Subscription process',
      });
      break;
    case 'incomplete_expired':
      ReactPixel.trackCustom(
        'Finish subscription process incomplete expaired',
        eventData
      );
      ReactGA.event({
        category: 'User',
        label: `The initial payment on the subscription failed and no successful payment was made within 23 hours of
        creating the subscription. These subscriptions do not bill customers. This status exists so you can track
        customers that failed to activate their subscriptions.`,
        action: 'Subscription process',
      });
      break;
    case 'canceled':
      // this.state.eventData.contents.status = 'Authorization needed';
      ReactPixel.trackCustom('Finish subscription process canceled', eventData);
      PinterestTag.track('Custom', {
        action: 'Finish subscription process canceled',
        ...eventData,
      });
      ReactGA.event({
        category: 'User',

        label:
          'The subscription has been canceled. During cancellation, automatic collection for all unpaid invoices is disabled',

        action: 'Subscription process ',
      });
      break;
    case 'unpaid':
      // this.state.eventData.contents.status = 'Authorization needed';
      ReactPixel.trackCustom('Finish subscription process unpaid', eventData);
      PinterestTag.track('Custom', {
        action: 'Finish subscription process unpaid',
        ...eventData,
      });
      ReactGA.event({
        category: 'User',
        label: `The latest invoice hasnt been paid but the subscription remains in place. The latest invoice remains
        open and invoices continue to be generated but payments arent attempted.`,
        action: 'Subscription process ',
      });
      break;
    default:
      ReactPixel.trackCustom('Finish subscription process failed', eventData);
      PinterestTag.track('Custom', {
        action: 'Finish subscription process failed',
        ...eventData,
      });
      ReactGA.event({
        category: 'User',
        label: 'Failed',
        action: 'Subscription process ',
      });
      break;
  }
};

export default sendAnalyticsEvents;
