import BasicModal from 'components/basic-modal/basic-modal';
import Pricing from 'views/website/pricing/pricing';
import React from 'react';
import { setSubscriptionModal } from 'redux/global/notiifcation/actions/actions';
import styles from './pricing-modal.module.scss';
import { useDispatch } from 'react-redux';

function PricingModal({ isOpen, handleClose, title }) {
  const dispatch = useDispatch();

  return (
    <BasicModal
      isOpen={isOpen}
      handleClose={() => {
        dispatch(setSubscriptionModal(false));
        handleClose(false);
      }}
      fullScreen
      title={title}
      titleCenter={styles.titleCenter}
    >
      <Pricing onlyPrice />
    </BasicModal>
  );
}

export default PricingModal;
