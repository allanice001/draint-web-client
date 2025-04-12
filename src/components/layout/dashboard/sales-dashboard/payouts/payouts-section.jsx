import React, { useState } from 'react';
import PayoutModal from '../payouts-modal/payout-modal';
import RequestPayoutButton from '../payout-buttons/request-payout-button';
import styles from './payouts.module.scss';

function PayoutsSection({ payouts, payoutsSoFar }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PayoutModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        amount={payouts}
      />
      <section className={styles.section}>
        <h3 className={`group-title ${styles.title}`}>Payouts</h3>

        <div className={styles.content}>
          <div className={styles.row}>
            <p>
              <b className={`${styles.cost}`}>{ payouts.toFixed(2) } &euro;</b>
              <p>Total amount available</p>
            </p>

            <RequestPayoutButton
              name="Request payouts"
              setIsOpen={() => setIsOpen(true)}
              disabled={!Boolean(payouts)}
            />
          </div>

          <div className={styles.row}>
            <p>
              <b className={`${styles.cost} ${styles.disabled}`}>{ payoutsSoFar.toFixed(2) } &euro;</b>
              <p>Total funds available after 14 days since delivery</p>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default PayoutsSection;
