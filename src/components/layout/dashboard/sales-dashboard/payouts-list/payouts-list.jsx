import React, { useState } from 'react';

import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import PayoutModal from '../payouts-modal/payout-modal';
import { PayoutOrder } from 'models/payout-order';
import PayoutOrderCard from './payout-order';
import RequestPayoutButton from '../payout-buttons/request-payout-button';
import ShippingPrice from 'components/shipping-price/shipping-price';
import styles from './payout-list.module.scss';

function PayoutsList({
  orders,
  pagination,
  handlePage,
  handelPageSize,
  scrollToStart,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});

  function handleOpenPayoutModal(order) {
    setCurrentOrder(order);
    setIsOpen(true);
  }

  return (
    <div className={`container ${styles.wrapper}`}>
      <PayoutModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        currentOrder={currentOrder}
      />
      <section className={styles.section}>
        <h3 className={`group-title ${styles.title}`}>Payouts Orders</h3>

        {orders.map(PayoutOrder.create).map(order => {
          return (
            <div className={styles.order} key={order.id}>
              <PayoutOrderCard artwork={order.artwork} key={order.id}>
                <ShippingPrice
                  price={order.price}
                  shipping={order.fee}
                  vat={order.vat}
                  fixedVAT={order.fixedVAT}
                  plus={false}
                />
              </PayoutOrderCard>
              <div className={styles.request_button}>
                <RequestPayoutButton
                  name="Request payout"
                  setIsOpen={() => handleOpenPayoutModal(order)}
                  disabled={!order.isCanMakePayout}
                />
              </div>
            </div>
          );
        })}

        <div className={styles.pagination}>
          <Pagination
            page={pagination.page}
            maxCount={pagination.maxCount}
            pages={pagination.pages}
            setPage={page => {
              handlePage(page);
            }}
            setCount={limit => {
              handelPageSize(limit);
            }}
            count={orders.length}
            type="orders"
          />
        </div>
      </section>
    </div>
  );
}

export default PayoutsList;
