import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import DefaultModal from 'components/basic-modal/basic-modal';
import React from 'react';
import { isEqual } from 'lodash';
import { setSubscriptionCancelModal } from 'redux/pricing/actions/pricingActions';
import staticUrls from 'constants/images/static-urls';
import styles from 'components/basic-modal/artwork-delete-modal.module.scss';

const getState = ({ user, pricing }) => ({
  cancelSubscriptionDate: user.account.cancelSubscriptionDate,
  subscriptionCancelModal: pricing.subscriptionCancelModal,
  subscriptionCancelModalText: pricing.subscriptionCancelModalText,
});

function SubscriptionCancelModal() {
  const {
    cancelSubscriptionDate,
    subscriptionCancelModal,
    subscriptionCancelModalText,
  } = useSelector(getState, isEqual);

  const dispatch = useDispatch();
  const openSubscriptionCancelModal = () =>
    dispatch(setSubscriptionCancelModal());

  const date = moment(cancelSubscriptionDate).format('DD MMM YYYY');
  const constants = {
    title: `About your plan`,
    header: `You can't change subscription now`,
    text:
      subscriptionCancelModalText ||
      `You can change your subscription plan after ${date}`,
    btn: 'Got it',
  };

  return (
    <DefaultModal
      className={styles.wrapper}
      footer={
        <div className={styles.footer}>
          <button
            className={`primary-button ${styles.button}`}
            onClick={openSubscriptionCancelModal}
            type="button"
          >
            {constants.btn}
          </button>
        </div>
      }
      footerClassName={styles.footer__wrapper}
      handleClose={openSubscriptionCancelModal}
      isOpen={subscriptionCancelModal}
      title={constants.title}
    >
      <div className={styles.wrapper}>
        <div className={styles.preview}>
          <div>
            <h1>{constants.header}</h1>
            <p>{constants.text}</p>
          </div>
          <img
            alt={constants.title}
            src={staticUrls.image.rating}
            title={constants.title}
          />
        </div>
      </div>
    </DefaultModal>
  );
}

export default SubscriptionCancelModal;
