import PayoutsHistory from './payouts-history-section';
import PayoutsSection from './payouts-section';
import React from 'react';
import styles from './payouts.module.scss';

function Payouts({
  payoutsHistory,
  payoutHistoryPreview,
  payouts,
  payoutsSoFar,
}) {
  return (
    <div className={`container ${styles.wrapper}`}>
      <PayoutsSection payouts={payouts} payoutsSoFar={payoutsSoFar} />

      <PayoutsHistory
        payoutsHistory={payoutsHistory}
        payoutHistoryPreview={payoutHistoryPreview}
      />
    </div>
  );
}

export default Payouts;
