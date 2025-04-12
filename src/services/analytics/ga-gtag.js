import {
  CURRENCY,
  PLANS,
  SEND_DATA_TYPE,
  TARGET_ID,
} from 'constants/analytics/analytics-constants';

class GTag {
  static init(trackingId) {
    const scriptId = 'ga-gtag';

    if (document.querySelector(`#${scriptId}`) || !window) return;

    const { head } = document;
    const script = document.createElement('script');

    script.id = scriptId;
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;

    head.insertBefore(script, head.firstChild);

    window.dataLayer = window.dataLayer || [];

    this.send.raw('js', new Date());
    this.send.raw('config', trackingId);
  }

  static send = {
    raw() {
      // arguments objects in dataLayer
      if (window) window.dataLayer.push(arguments);
    },

    conversion(planId) {
      const plan = PLANS[planId];

      this.raw(SEND_DATA_TYPE, TARGET_ID, {
        value: plan.value,
        send_to: plan.send_to,
        currency: CURRENCY,
      });
    },
  };
}

export default GTag;
