import React, { useEffect, useState } from 'react';

import { Spinner } from 'components/lib';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import handleStripeSubscriptionCheckoutSession from 'redux/pricing/thunks/handle-stripe-subscription-checkout-session';
import { useHistory } from 'react-router';

function StripeSuccess({ handleStripeSubscriptionCheckoutSession }) {
  const history = useHistory();
  const [sessionId, setSessionId] = useState(undefined);

  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    setSessionId(parsedUrl.searchParams.get('session_id'));
  }, []);

  useEffect(() => {
    if (sessionId) {
      handleStripeSubscriptionCheckoutSession(sessionId, history);
    }
  }, [sessionId, history, handleStripeSubscriptionCheckoutSession]);

  return <Spinner full />;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      handleStripeSubscriptionCheckoutSession,
    },
    dispatch
  );
}

const mapStateToProps = props => ({
  fetching: props.user.query.fetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(StripeSuccess);
