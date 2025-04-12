import React, { useEffect, useState } from 'react';

import { Spinner } from 'components/lib';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import payPalSubscription from 'redux/pricing/thunks/payPalSubscriptionProcess';
import { useHistory } from 'react-router';

function PayPalSuccess({ payPalSubscription }) {
  const history = useHistory();
  const [subscriptionId, setSubscriptionId] = useState(undefined);

  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    setSubscriptionId(parsedUrl.searchParams.get('subscription_id'));
  }, []);

  useEffect(() => {
    if (subscriptionId) payPalSubscription(subscriptionId, history);
  }, [subscriptionId, payPalSubscription, history]);

  return <Spinner full />;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      payPalSubscription,
    },
    dispatch
  );
}

const mapStateToProps = props => ({
  fetching: props.user.query.fetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(PayPalSuccess);
