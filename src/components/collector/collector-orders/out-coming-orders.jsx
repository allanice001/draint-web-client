import OrderNotification, {
  ArtworkSentNotification,
} from 'components/order/order-notification/order-notification';
import React, { useEffect, useState } from 'react';
import ShippingMap, { Key } from 'components/shipping-map/shipping-map';
import { useDispatch, useSelector } from 'react-redux';

import CollectorArtwork from 'components/collector/collector-artwork/collector-artwork';
import { Order } from 'models/order';
import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import ShippingPrice from 'components/shipping-price/shipping-price';
import TrackPackageModal from 'components/order/modals/track-package-modal';
import { getPackageInfo } from 'redux/dashboard/actions/ordersActions';
import { handleOutComingOrdersOrders } from 'redux/dashboard/actions/ordersActions';
import styles from 'components/order/orders.module.scss';

function OutComingOrders({ orders }) {
  const dispatch = useDispatch();
  const [isOpenCheckPackage, setIsOpenCheckPackage] = useState(false);
  const [currentOrder, setCurrentOrder] = useState();
  const account = useSelector(store => store.user.account);

  const [orderPagination, setOrderPagination] = useState({
    page: 1,
    limit: 2,
  });

  const { page: ordersPage, limit: ordersLimit } = orderPagination;

  function setPage(page) {
    setOrderPagination({ ...orderPagination, page });
  }

  function setLimit(limit) {
    setOrderPagination({ page: 1, limit });
  }

  useEffect(() => {
    if (account.profile_id) {
      dispatch(handleOutComingOrdersOrders(ordersPage, ordersLimit));
    }
  }, [dispatch, account.profile_id, ordersPage, ordersLimit]);

  function getNotificationBySteps(stepsData, order) {
    if (stepsData[Key.CourierArrival] && !stepsData[Key.Delivered]) {
      return (
        <ArtworkSentNotification
          order={order}
          title="Check in UPS"
          setOpen={() => {
            dispatch(
              handleOutComingOrdersOrders(
                orderPagination.page,
                orderPagination.limit
              )
            );
            dispatch(getPackageInfo(order, setIsOpenCheckPackage));
            setCurrentOrder(order);
          }}
        />
      );
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <h3 className={`group-title ${styles.title}`}>Outcoming orders</h3>

        <TrackPackageModal
          isOpen={isOpenCheckPackage}
          setClose={() => setIsOpenCheckPackage(!isOpenCheckPackage)}
          order={currentOrder}
        />

        {orders.data.map(Order.create).map(order => {
          const stepsData = {
            [Key.Confirmed]: order.orderVerification,
            [Key.Paid]: order.paidFormatDate,
            [Key.Certificate]: order.certificatedFormatDate,
            [Key.Wrapped]: order.wrappedFormatDate,
            [Key.Pickup]: order.pickupScheduledFormatDate,
            [Key.CourierArrival]: order.arrivalInfo,
            [Key.Delivered]: order.deliveredFormatDate,
          };

          return (
            <div className={styles.order} key={order.id}>
              <CollectorArtwork artwork={order.artwork} inComing key={order.id}>
                <ShippingPrice
                  price={order.price}
                  shipping={order.shipping_cost}
                />
              </CollectorArtwork>
              <ShippingMap data={stepsData} />

              {order.trackerNumber && order.courierArrivalFormatDate && (
                <OrderNotification>
                  {getNotificationBySteps(stepsData, order)}
                </OrderNotification>
              )}
            </div>
          );
        })}

        <div className={styles.pagination}>
          <Pagination
            page={orderPagination.page}
            maxCount={orders.total}
            pages={orders.totalPages}
            setPage={page => setPage(page)}
            setCount={limit => setLimit(limit)}
            count={orders.length}
            type="orders"
          />
        </div>
      </div>
    </div>
  );
}

export default OutComingOrders;
