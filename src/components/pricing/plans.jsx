import React, { useEffect, useMemo } from 'react';
import PinterestTag from 'external-lib/pinterestTag';
import { PlansDesktop } from './plans-desktop';
import { PlansFooter } from './layouts/plans-footer';
import PlansInfoModal from 'components/basic-modal/plans-info-modal';
import { PlansMobile } from './plans-mobile';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import SubscriptionCancelModal from './subscription-cancel-modal';
import SubscriptionModal from 'components/basic-modal/subscription-modal';
import { pageScroll } from 'services/pageScroller';
import styles from './plans.module.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { usePricing } from 'hooks/use-pricing';

function Plans({ signUpFinishCallback }) {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    pageScroll();
  }, []);

  useMemo(() => {
    ReactGA.pageview(window.location.pathname);
    ReactPixel.pageView();
    PinterestTag.pageView();
  }, []);

  const { isSignUp, user, checkStripeSession } = usePricing(
    signUpFinishCallback
  );

  const { id: accountId } = user;

  useMemo(() => {
    if (accountId) {
      dispatch(checkStripeSession(accountId, history));
    }
  }, [accountId, dispatch, checkStripeSession, history]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SubscriptionModal isSignUp={isSignUp} />

        <PlansInfoModal />

        <SubscriptionCancelModal />

        <PlansDesktop signUpFinishCallback={signUpFinishCallback} />

        <PlansMobile signUpFinishCallback={signUpFinishCallback} />

        <PlansFooter />
      </div>
    </div>
  );
}

export default Plans;
