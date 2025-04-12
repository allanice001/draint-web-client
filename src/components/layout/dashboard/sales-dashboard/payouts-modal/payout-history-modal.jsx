import BasicModal from 'components/basic-modal/basic-modal';
import ModalButton from '../payout-buttons/modal-button';
import PayoutsHistoryContent from '../payouts/payout-history-content';
import React from 'react';
import styles from './payout-history-modal.module.scss';

function PayoutHistoryModal({ isOpen, setIsOpen }) {
  return (
    <BasicModal
      title="Payout history"
      isOpen={isOpen}
      footerClassName={styles.footer}
      handleClose={() => setIsOpen(!isOpen)}
      footer={
        <div className={styles.button_wrapper}>
          <ModalButton name="Close" setIsOpen={setIsOpen} />
        </div>
      }
    >
      <PayoutsHistoryContent />
    </BasicModal>
  );
}

export default PayoutHistoryModal;
