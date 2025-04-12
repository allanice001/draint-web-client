import React, { useEffect, useState } from 'react';

import { Spinner } from 'components/lib';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import handleSofortPlanSubscription from 'redux/pricing/thunks/handle-sofort-plan-subscription';
import { useHistory } from 'react-router';

function SofortRedirect({ handleSofortPlanSubscription }) {
  const history = useHistory();
  const [setupIntentId, setSetupIntentId] = useState(undefined);

  useEffect(() => {
    const url = new URL(window.location);
    setSetupIntentId(url.searchParams.get('setup_intent'));
  }, []);

  useEffect(() => {
    if (setupIntentId) handleSofortPlanSubscription(setupIntentId, history);
  }, [setupIntentId, history, handleSofortPlanSubscription]);

  return <Spinner full />;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      handleSofortPlanSubscription,
    },
    dispatch
  );
}

const mapStateToProps = props => ({
  fetching: props.user.query.fetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(SofortRedirect);
