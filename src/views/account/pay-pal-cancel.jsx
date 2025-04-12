import React from 'react';
import { Spinner } from 'components/lib';
import { bindActionCreators } from 'redux';
import { cancelSubscriptionProcess } from 'redux/pricing/actions/pricingActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

function PayPalCancel({
  fetching,
  planPeriod,
  planName,
  cancelSubscriptionProcess,
}) {
  const history = useHistory();

  if (fetching) {
    return <Spinner full />;
  }

  cancelSubscriptionProcess(planPeriod, planName, history);

  return <div />;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      cancelSubscriptionProcess,
    },
    dispatch
  );
}

const mapStateToProps = props => ({
  fetching: props.user.query.fetching,
  planName: props.user.account.planName,
  planPeriod: props.user.account.planPeriod,
});

export default connect(mapStateToProps, mapDispatchToProps)(PayPalCancel);
