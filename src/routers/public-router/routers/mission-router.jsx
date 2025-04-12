import Helmet from 'components/helmet';
import { MISSION_ROOT } from 'constants/routes/publicModule/mission';
import MissionStatementPage from 'views/website/mission/mission-statement-page';
import React from 'react';
import { Route } from 'react-router-dom';

export default function MissionRouter() {
  return (
    <Route
      exact
      path={MISSION_ROOT}
      render={() => (
        <>
          <Helmet title="Our mission - Statement | DRAINT™" />
          <MissionStatementPage />
        </>
      )}
    />
  );
}
