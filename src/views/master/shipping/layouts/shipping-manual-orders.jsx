import React, { useEffect, useState } from 'react';
import ShippingMap, { Key } from 'components/shipping-map/shipping-map';
import { useDispatch, useSelector } from 'react-redux';
import CollectorArtwork from 'components/collector/collector-artwork/collector-artwork';
import { Order } from 'models/order';
import PaginationControlled from 'components/pagination/paginationNumbers';
import ShippingOrdersNav from 'components/nav/shipping/shipping-orders-nav';
import ShippingPrice from 'components/shipping-price/shipping-price';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { getManualShippingOrders } from 'redux/master/actions/shippingRequestsActions';
import styles from 'components/order/orders.module.scss';
import ShippingManualFormWrapper from './shipping-manual-form-wrapper';
import { COMPLETED, PENDING } from 'constants/components/orders/constatns';
import OrderNotification, {
  ArtworkDeliveredNotification,
  ArtworkSentNotification,
  OrderHasBeenPayoutNotification,
} from 'components/order/order-notification/order-notification';

function ShippingManualOrders() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(pageValue) {
    setCurrentPage(pageValue);
  }

  useEffect(() => {
    dispatch(getManualShippingOrders(currentPage));
  }, [currentPage, dispatch]);

  const { shipmentManualOrders, total, loading } = useSelector(
    store => store.master.shippingRequests
  );

  if (loading) {
    return (
      <>
        <ShippingOrdersNav />
        <Spinner full />
      </>
    );
  }

  function getNotificationBySteps(order) {
    const payoutStatus = order.orderPayout && order.orderPayout.status;

    if (payoutStatus === COMPLETED) {
      return (
        <OrderHasBeenPayoutNotification price={order.orderPayout.amount} />
      );
    }

    if (payoutStatus === PENDING) {
      return <ArtworkDeliveredNotification masterOrder />;
    }

    return <ArtworkSentNotification order={order} />;
  }

  return (
    <div className={styles.wrapper}>
      <ShippingOrdersNav />

      <PaginationControlled
        style={['dark']}
        totalPages={total}
        page={currentPage}
        handler={handlePageChange}
      />

      {!!shipmentManualOrders.length && (
        <div className={styles.container}>
          {shipmentManualOrders.map(Order.create).map(order => {
            const stepsData = {
              [Key.Confirmed]: order.verification,
              [Key.Paid]: order.paidFormatDate,
              [Key.Certificate]: order.certificatedFormatDate,
              [Key.Wrapped]: order.wrappedFormatDate,
              [Key.Pickup]: order.pickupScheduledFormatDate,
              [Key.CourierArrival]: order.arrivalInfo,
              [Key.Delivered]: order.deliveredFormatDate,
            };

            return (
              <div key={order.id}>
                <CollectorArtwork artwork={order.artwork} key={order.id}>
                  <ShippingPrice
                    price={order.price}
                    shipping={order.shipping_cost}
                  />
                  {order.shipment && (
                    <ShippingManualFormWrapper
                      order={order}
                      currentPage={currentPage}
                    />
                  )}
                </CollectorArtwork>
                <ShippingMap data={stepsData} />

                {order.trackerNumber && order.courierArrivalFormatDate && (
                  <div className={styles.notification}>
                    <OrderNotification>
                      {getNotificationBySteps(order)}
                    </OrderNotification>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ShippingManualOrders;
