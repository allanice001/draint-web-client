import React, { useEffect, useState } from 'react';

import { Spinner } from 'components/loader/spinner-loader/spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import signInByMail from 'redux/user/actions/signInByMail';
import { useHistory } from 'react-router';

function MailRedirect({ user, signInByMail }) {
  const [token, setToken] = useState('');
  const history = useHistory();
  const { account } = user;

  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    setToken(parsedUrl.searchParams.get('token'));
  }, []);

  useEffect(() => {
    if (token) signInByMail(token, history);
  }, [token, signInByMail, history]);

  return <>{!account.token && <Spinner full />}</>;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      signInByMail,
    },
    dispatch
  );
}

const mapStateToProps = props => ({
  user: props.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(MailRedirect);
