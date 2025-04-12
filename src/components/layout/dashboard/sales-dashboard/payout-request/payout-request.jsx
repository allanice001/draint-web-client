import { useDispatch, useSelector } from 'react-redux';

import PayoutForm from './payout-form';
import React from 'react';
import { sendManualPayout } from 'redux/dashboard/actions/salesActions';
import styles from './payout-request.module.scss';

function PayoutRequest({ amount, currentOrder, setIsOpen }) {
  const dispatch = useDispatch();
  const payoutFrom = useSelector(store => store.form.payoutForm);
  const systemsData = useSelector(
    store => store.dashboard.sales.payoutsOrders.paymentSystems
  );

  const paymentSystems = systemsData.map(systems => {
    return {
      label: systems.payment_system,
      value: systems.payment_system,
    };
  });

  function setInitialValues() {
    if (payoutFrom) {
      const [selectedSystem] = systemsData.filter(
        system => system.payment_system === payoutFrom.values.method
      );

      return {
        method: selectedSystem.payment_system,
        email: selectedSystem.payment_account,
        accountId: selectedSystem.account_id,
        payoutAccountId: selectedSystem.id,
      };
    }

    return {
      method: systemsData[0].payment_system,
      email: systemsData[0].payment_account,
      accountId: systemsData[0].account_id,
      payoutAccountId: systemsData[0].id,
    };
  }

  function senPayoutRequest() {
    const payoutRequest = {
      amount: Number(amount),
      paymentSystem: payoutFrom.values.method,
      paymentEmail: payoutFrom.values.email,
      accountId: payoutFrom.values.accountId,
      orderId: currentOrder && currentOrder.id,
      payoutAccountId: payoutFrom.values.payoutAccountId,
    };

    dispatch(sendManualPayout(payoutRequest, setIsOpen));
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.header}>
        <b className={styles.label}>Available funds</b>
        <b className={styles.amount}>{amount} €</b>
      </p>
      <PayoutForm
        initialValues={setInitialValues()}
        senPayoutRequest={senPayoutRequest}
        paymentSystems={paymentSystems}
        payoutFrom={payoutFrom}
      />
    </div>
  );
}

export default PayoutRequest;
