import React, { useMemo } from 'react';
import { BlockInfo } from 'components/basic-modal/welcome-modal-layouts/block-info';
import { Preview } from 'components/basic-modal/welcome-modal-layouts/preview';

import { Reasons } from 'components/reasons/reasons';
import { pageScroll } from 'services/pageScroller';

function MissionStatementPage() {
  useMemo(() => {
    pageScroll();
  }, []);

  return (
    <div className="container">
      <Preview />
      <BlockInfo />
      <Reasons
        title="Our mission & vision"
        subtitle="See what makes us best choice for your artwork presentation and sale."
      />
    </div>
  );
}

export default MissionStatementPage;
