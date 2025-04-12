import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlockInfo } from 'components/basic-modal/welcome-modal-layouts/block-info';
import DefaultModal from './basic-modal';
import { HandleSignUpSubscriptionAnalyticEvents } from 'redux/pricing/thunks/send-analytics-event';
import { Preview } from 'components/basic-modal/welcome-modal-layouts/preview';
import PricingModal from 'views/website/pricing/pricing-modal/pricing-modal';
import { Reasons } from 'components/reasons/reasons';
import { isEqual } from 'lodash';
import moment from 'moment';
import { setWelcomeModal } from 'redux/global/notiifcation/actions/actions';
import styles from './welcome-modal.module.scss';
import { useSubscriptionModal } from 'hooks/use-subscription-modal';

const selectorPropertiesToState = state => ({
  welcomeModal: state.notification.welcomeModal,
  user: state.user.account,
});

const WelcomeModal = function() {
  const dispatch = useDispatch();
  const { welcomeModal, user } = useSelector(
    selectorPropertiesToState,
    isEqual
  );
  const flag = useSubscriptionModal(user);
  const [isPricingOpen, setIsPricingIsOpen] = useState(false);

  const {
    saw_after_sign_up: sawAfterSignUp,
    saw_after_sign_in: sawAfterSignIn,
    planName,
    planId,
    is_artist: isArtist,
    created_at: createdAt,
  } = user;

  // Sign Up subscription handler.
  useEffect(() => {
    // calculating the day difference to filter old users
    const DayDif = moment().diff(new Date(createdAt).getTime(), 'days');
    if (
      sawAfterSignUp === null &&
      sawAfterSignIn === null &&
      isArtist &&
      DayDif < 2 &&
      welcomeModal
    ) {
      HandleSignUpSubscriptionAnalyticEvents(planName, planId, user.id);
    }
  }, [
    isArtist,
    user,
    welcomeModal,
    createdAt,
    planId,
    sawAfterSignUp,
    sawAfterSignIn,
    planName,
  ]);

  useEffect(() => {
    if (sawAfterSignUp && sawAfterSignIn) {
      setIsPricingIsOpen(flag);
    }

    if (!!!sawAfterSignIn && sawAfterSignUp) {
      setIsPricingIsOpen(flag);
    }
  }, [flag, sawAfterSignUp, sawAfterSignIn, planName]);

  function openWelcomeModal() {
    if (!!!sawAfterSignIn && sawAfterSignUp) {
      setIsPricingIsOpen(flag);
    }

    return dispatch(setWelcomeModal());
  }

  return (
    <>
      <PricingModal isOpen={isPricingOpen} handleClose={setIsPricingIsOpen} />
      <DefaultModal
        className={styles.wrapper}
        handleClose={openWelcomeModal}
        isOpen={welcomeModal}
        title="Welcome to Draint!"
      >
        <div className={styles.wrapper}>
          <Preview />
          <BlockInfo />
          <Reasons
            subtitle="See what makes us best choice for your artwork presentation and sale."
            title="Our mission & vision"
          />
        </div>
      </DefaultModal>
    </>
  );
};

export default WelcomeModal;
