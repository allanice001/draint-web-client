import {
  ARTWORKS,
  MASTER,
  RECOVER,
  SHOPPING_CART,
  SIGN_IN,
} from 'constants/singin-up';
import React, { useEffect, useState } from 'react';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import FooterComponent from 'components/materialForm/auth/components/sign-in-footer';
import Helmet from 'components/helmet';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import PropTypes from 'prop-types';
import SignInForm from 'components/reduxForm/signIn/signIn-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import getUserDataAtSingIn from 'redux/user/account/actions/getUserDataAtSingIn';
import { pageScroll } from 'services/pageScroller';
import setInitialState from 'redux/general/actions/setInitialState';
import { setSubscriptionModal } from 'redux/global/notiifcation/actions/actions';
import setUserSignUpToken from 'redux/user/account/actions/setUserSignUpToken';
import styles from './auth.module.scss';
import switchToCollectorAddToSubscriptions from 'redux/user/account/thunks/switch-to-collector-add-to-subscriptions';
import { withRouter } from 'react-router-dom';

const Analytic = AnalyticHelper.create();

function SignIn({ actions, history, query }) {
  const [parsedEmail, setParsedEmail] = useState('');

  const artwork =
    localStorage.getItem('artwork') &&
    JSON.parse(localStorage.getItem('artwork'));
  const { setInitialState } = actions;

  useEffect(() => {
    Analytic.createEvent('PageView', { url: SIGN_IN });
    setInitialState();
    pageScroll();
  }, [setInitialState]);

  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    const email = parsedUrl.searchParams.get('email');

    if (email) {
      setParsedEmail(email);
    }
  }, [setParsedEmail, parsedEmail]);

  const handleRedirectAfterSignIn = user => {
    if (!user.is_artist && user.new_permission === 'owner') {
      Analytic.createEvent('SignIn', { user_role: 'collector' });
    }

    if (user.is_artist && user.new_permission === 'owner') {
      Analytic.createEvent('SignIn', { user_role: 'artist' });
    }

    if (user.deleted_at) {
      history.push(RECOVER);

      return;
    }

    if (user.new_permission !== 'owner') {
      Analytic.createEvent('MasterSignIn');
      history.push(MASTER);

      return;
    }

    if (user.permission === 'master') {
      Analytic.createEvent('MasterSignIn');
      history.push(MASTER);

      return;
    }

    if (artwork) {
      return history.push(
        getArtworkUrl(artwork.id, artwork.title, artwork.username)
      );
    }

    if (!user.is_artist && user.cartCounter > 0) {
      history.push(SHOPPING_CART);

      return;
    }

    if (user.is_artist) {
      actions.setSubscriptionModal(true);
      return history.push(PROFILE_GALLERY);
    }

    history.push(ARTWORKS);
  };

  const handleRedirect = userData => {
    if (!userData) {
      return;
    }

    const { account } = userData;

    return handleRedirectAfterSignIn(account);
  };

  const handleSignInSubmit = async values => {
    const userData = await actions.getUserDataAtSingIn(values);

    if (parsedEmail && userData) {
      return await actions.switchToCollectorAddToSubscriptions(
        userData.account,
        userData.account.email,
        history
      );
    }

    return handleRedirect(userData);
  };

  return (
    <div className="container">
      <div className={styles.auth_wrapper}>
        <Helmet title="Sing In | Draint" />
        <SignInForm
          initialValues={{
            email: parsedEmail,
          }}
          onSubmit={handleSignInSubmit}
          footer={<FooterComponent />}
          fetching={query.fetching}
        />
      </div>
    </div>
  );
}

SignIn.propTypes = {
  actions: PropTypes.object,
  history: PropTypes.object,
};

function mapStateToProperties(state) {
  return {
    query: state.user.query,
  };
}

function mapDispatchToProperties(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setUserSignUpToken,
        getUserDataAtSingIn,
        setInitialState,
        setSubscriptionModal,
        switchToCollectorAddToSubscriptions,
      },
      dispatch
    ),
  };
}

export default withRouter(
  connect(mapStateToProperties, mapDispatchToProperties)(SignIn)
);
