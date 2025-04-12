import { AnalyticEvent } from '../../models/analytic-event';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

class AnalyticHelper {
  event = {};

  static create() {
    return new AnalyticHelper();
  }

  createEvent(name, data, page) {
    this.event = {};
    this.event = new AnalyticEvent(name, data, page);
    this.tractEvent();
  }

  tractEvent() {
    if (Object.values(this.event).length) {
      switch (this.event.type) {
        case 'custom': {
          this.trackCustom();
          break;
        }
        default: {
          this.trackPageView();
        }
      }
    }
  }

  trackPageView() {
    ReactPixel.trackCustom('PageView', {
      label: this.event.label,
    });
    ReactGA.pageview(this.event.page);
  }

  trackCustom() {
    ReactGA.event({
      category: this.event.category,
      label: this.event.title,
      action: this.event.label,
    });

    const data = {
      content_name: this.event.label,
      content_category: this.event.category,
      content_type: this.event.content_type,
      ...this.event.data,
    };

    if (this.event.eventId) {
      window.fbq('track', this.event.title, data, {
        eventID: this.event.eventId,
      });
    } else {
      ReactPixel.trackCustom(this.event.title, data);
    }
  }
}

export default AnalyticHelper;
