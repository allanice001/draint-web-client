const defaultOptions = {
  debug: false,
};

class PinterestTag {
  initialized = false;
  debug = false;

  init(uniqueTagId, options = defaultOptions) {
    /* eslint-disable */
    !(function(e) {
      if (!window.pintrk) {
        window.pintrk = function() {
          window.pintrk.queue.push(Array.prototype.slice.call(arguments));
        };
        const n = window.pintrk;
        (n.queue = []), (n.version = '3.0');
        const t = document.createElement('script');
        (t.async = !0), (t.src = e);
        const r = document.getElementsByTagName('script')[0];
        r.parentNode.insertBefore(t, r);
      }
    })('https://s.pinimg.com/ct/core.js');
    /* eslint-enable */

    if (!uniqueTagId) {
      console.warn('Please insert unique Tag id for initializing');
    } else {
      pintrk('load', uniqueTagId); // eslint-disable-line no-undef

      this.initialized = true;
      this.debug = options.debug;
    }
  }

  verifyInit() {
    if (!this.initialized) {
      console.warn(
        'PinterestTag not initialized before using call PinterestTag.init with required params'
      );
    }
    return this.initialized;
  }

  pageView() {
    if (!this.verifyInit()) {
      return;
    }

    pintrk('page'); // eslint-disable-line no-undef

    if (this.debug) {
      this.log("called pintrk('page');");
    }
  }

  track(title, data) {
    if (!this.verifyInit()) {
      return;
    }

    pintrk('track', title, data); // eslint-disable-line no-undef

    if (this.debug) {
      this.log(`called fbq('track', '${title}');`);
      if (data) {
        this.log('with data', data);
      }
    }
  }

  pintrk(...args) {
    if (!this.verifyInit()) {
      return;
    }

    pintrk(...args); // eslint-disable-line no-undef

    if (this.debug) {
      this.log(`called pintrk('${args.slice(0, 2).join("', '")}')`);

      if (args[2]) {
        this.log('with data', args[2]);
      }
    }
  }

  log(...args) {
    console.info('[pinterest-tracking]', ...args);
  }
}

export default new PinterestTag();
