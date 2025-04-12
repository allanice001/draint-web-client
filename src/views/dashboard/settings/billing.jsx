import './billing.scss';

import React, { useEffect } from 'react';

import Pricing from 'views/website/pricing/pricing';
import { pageScroll } from 'services/pageScroller';

function Billing() {
  useEffect(() => {
    pageScroll();
  }, []);

  return (
    <div className="billing-container">
      <Pricing />
    </div>
  );
}

export default Billing;
