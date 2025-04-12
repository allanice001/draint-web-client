import InComingOrders from '../collector-orders/in-coming-orders';
import OutComingOrders from '../collector-orders/out-coming-orders';
import React from 'react';
import { Spinner } from 'components/lib';
import styles from './collector-sales.module.scss';
import { useSelector } from 'react-redux';

function CollectorShippingDashboard() {
  const inComing = useSelector(
    store => store.dashboard.orders.collectorOrders.inComing
  );
  const outComing = useSelector(
    store => store.dashboard.orders.collectorOrders.outComing
  );
  const user = useSelector(store => store.user.account);

  if (user.loading) return <Spinner full />;

  return (
    <>
      <div className={styles.wrapper}>
        {outComing?.data ? <InComingOrders orders={inComing} /> : null}
      </div>

      <div className={styles.wrapper}>
        {outComing?.data ? <OutComingOrders orders={outComing} /> : null}
      </div>
    </>
  );
}

export default CollectorShippingDashboard;
