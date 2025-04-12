import React, { useState } from 'react';

import PayoutHistoryModal from '../payouts-modal/payout-history-modal';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import moment from 'moment';
import styles from './payouts.module.scss';
import { useDispatch } from 'react-redux';

function PayoutsHistory({ payoutsHistory, payoutHistoryPreview }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  function handleModalOpen() {
    if (payoutsHistory.length) {
      return setIsOpen(true);
    }

    return dispatch(
      displayMessage('There is no payout history yet', 'warning')
    );
  }

  return (
    <>
      <section className={styles.section}>
        <h3 className={`group-title ${styles.title}`}>Requested Payouts</h3>

        <div className={styles.table__wrapper}>
          <div className={styles.table}>
            <div className={styles.table__labels_line}>
              <div className={styles.table__labels_header}>
                <span className={styles.table__label}>Date Requested</span>
                <span className={styles.table__label}>Payout</span>
                <span className={styles.table__label}>Status</span>
              </div>
            </div>
            {payoutsHistory && payoutHistoryPreview && (
              <>
                {payoutHistoryPreview.map((el, i) => (
                  <div className={styles.table__labels} key={i}>
                    <span className={styles.table__label}>
                      {moment(el.created_at).format('DD.MM.YYYY')}
                    </span>
                    <span className={styles.table__label}>{el.amount} €</span>
                    <span className={styles.table__label}>{el.status}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          <button
            type="button"
            className={styles.table__link}
            onClick={() => handleModalOpen()}
          >
            Show Payout History
          </button>
        </div>
      </section>

      <PayoutHistoryModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default PayoutsHistory;
