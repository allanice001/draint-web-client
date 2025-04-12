import React, { useEffect } from 'react';

import Home from '../../home/home';
import { KlarnaOrderUpdate } from 'redux/pricing/thunks/klarnaOrders';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getStringSearchParameter } from 'services/global';
import { useHistory } from 'react-router';

function KlarnaAfterPayment({ KlarnaOrderUpdate }) {
  const history = useHistory();

  useEffect(() => {
    const source = getStringSearchParameter('source');
    const redirect_status = getStringSearchParameter('redirect_status');
    KlarnaOrderUpdate({ source, redirect_status }).then(() =>
      history.push('/')
    );
  }, [KlarnaOrderUpdate, history]);
  return (
    <>
      <Home />
    </>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ KlarnaOrderUpdate }, dispatch);

export default connect(null, mapDispatchToProps)(KlarnaAfterPayment);
