import OrderNotification, {
  ArtworkDeliveredNotification,
  ArtworkSentNotification,
  ArtworkWaitingSentNotification,
  CertificateNotification,
  ConfirmOrderNotification,
  OrderHasBeenPayoutNotification,
  PickupScheduledNotification,
  SellerConfirmedNotification,
  WrappedInstructionNotification,
} from 'components/order/order-notification/order-notification';
import React, { useEffect, useState } from 'react';
import ShippingMap, { Key } from 'components/shipping-map/shipping-map';
import {
  checkOrderVerification,
  checkResaleOrderVerification,
  confirmResaleOrderPayment,
  handleInComingOrdersOrders,
  verifyResaleOrder,
} from 'redux/dashboard/actions/ordersActions';
import {
  COLLECTOR,
  COMPLETED,
  DECLINED,
  ORDERS,
  VERIFIED,
} from 'constants/components/orders/constatns';
import { useDispatch, useSelector } from 'react-redux';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import CollectorArtwork from 'components/collector/collector-artwork/collector-artwork';
import { Order } from 'models/order';
import OrderModalCertificate from 'components/order/modals/order-modal-certificate';
import OrderModalPackingInstruction from 'components/order/modals/order-modal-packing-instruction';
import OrderModalPickupDate from 'components/order/modals/order-modal-pickup-date';
import OrderModalSignature from 'components/order/modals/order-modal-signature';
import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import ShippingPrice from 'components/shipping-price/shipping-price';
import TrackPackageModal from 'components/order/modals/track-package-modal';
import WrappedStepModal from 'components/order/modals/order-modal-wrapped-steps';
import { getPackageInfo } from 'redux/dashboard/actions/ordersActions';
import styles from 'components/order/orders.module.scss';

const Analytic = AnalyticHelper.create();

function InComingOrders({ orders }) {
  ReactGA.pageview(window.location.pathname);
  ReactPixel.pageView();
  PinterestTag.pageView();

  const dispatch = useDispatch();
  const [isOpenCheckPackage, setIsOpenCheckPackage] = useState(false);
  const [isSignatureOpen, setSignatureOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState();
  const [isCertificateOpen, setCertificateOpen] = useState(false);
  const [isPackingInstructionOpen, setPackingInstructionOpen] = useState(false);
  const [isWrappedStepsOpen, setWrappedStepsOpen] = useState(false);
  const [isPickupDateOpen, setPickupDateOpen] = useState(false);
  const account = useSelector(store => store.user.account);
  const signature = useSelector(store => store.dashboard.settings.signature);

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
      dispatch(handleInComingOrdersOrders(ordersPage, ordersLimit));
    }
  }, [dispatch, account.profile_id, ordersPage, ordersLimit]);

  function getNotificationBySteps(stepsData, order) {
    const payoutStatus = order.orderPayout && order.orderPayout.status;

    if (payoutStatus === COMPLETED) {
      return (
        <OrderHasBeenPayoutNotification price={order.orderPayout.amount} />
      );
    }

    if (stepsData[Key.Delivered]) {
      return <ArtworkDeliveredNotification resale />;
    }

    if (stepsData[Key.CourierArrival]) {
      return (
        <ArtworkSentNotification
          order={order}
          setOpen={() => {
            dispatch(
              handleInComingOrdersOrders(
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

    if (stepsData[Key.Pickup]) {
      return <ArtworkWaitingSentNotification />;
    }

    if (stepsData[Key.Wrapped]) {
      return (
        <PickupScheduledNotification
          onPickupScheduled={() => {
            dispatch(
              checkResaleOrderVerification(
                {
                  orderId: order.id,
                },
                ordersPage,
                ordersLimit,
                setPickupDateOpen
              )
            );
            setCurrentOrder(order);
          }}
        />
      );
    }

    if (stepsData[Key.Certificate]) {
      return (
        <WrappedInstructionNotification
          onInstructionOpen={() => {
            dispatch(
              checkResaleOrderVerification(
                {
                  orderId: order.id,
                },
                ordersPage,
                ordersLimit,
                setPackingInstructionOpen
              )
            );
          }}
          onArtworkWrapped={() => {
            dispatch(
              checkResaleOrderVerification(
                {
                  orderId: order.id,
                },
                ordersPage,
                ordersLimit,
                setWrappedStepsOpen
              )
            );
            setCurrentOrder(order);
          }}
          order={order}
        />
      );
    }

    if (stepsData[Key.Paid]) {
      const isArtworkArtist = order.artwork.artist.id === account.profile_id;

      return (
        <CertificateNotification
          signature={isArtworkArtist ? signature : null}
          onCreateSignature={() => {
            dispatch(
              checkOrderVerification(
                {
                  orderId: order.id,
                },
                ordersPage,
                ordersLimit,
                setSignatureOpen
              )
            );
            setCurrentOrder(order);
          }}
          onCreateCertificate={() => {
            dispatch(
              checkResaleOrderVerification(
                {
                  orderId: order.id,
                },
                ordersPage,
                ordersLimit,
                setCertificateOpen
              )
            );
            setCurrentOrder(order);
          }}
        />
      );
    }

    if (!order.verification) {
      const shipmentId = order.shipment ? order.shipment.id : null;
      return (
        <ConfirmOrderNotification
          onVerify={() => {
            dispatch(
              verifyResaleOrder(
                {
                  orderId: order.id,
                  accountId: account.id,
                  orderStatus: VERIFIED,
                  type: COLLECTOR,
                },
                ordersPage,
                ordersLimit
              )
            );
            Analytic.createEvent('OrderWasVerifiedByArtist', {
              value: order.price,
            });
          }}
          onDecline={() => {
            dispatch(
              verifyResaleOrder(
                {
                  orderId: order.id,
                  orderStatus: DECLINED,
                  type: COLLECTOR,
                },
                ordersPage,
                ordersLimit
              )
            );
            Analytic.createEvent('OrderWasDeclinedByArtist', {
              value: order.price,
            });
          }}
          shipmentId={shipmentId}
        />
      );
    }

    if (order.verification) {
      return (
        <SellerConfirmedNotification
          confirmOrderPayment={() => {
            dispatch(
              confirmResaleOrderPayment(
                {
                  orderId: order.id,
                },
                ordersPage,
                ordersLimit
              )
            );
          }}
        />
      );
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <h3 className={`group-title ${styles.title}`}>Incoming orders</h3>
        {isSignatureOpen && (
          <OrderModalSignature
            isOpen={isSignatureOpen}
            setOpen={() => setSignatureOpen(!isSignatureOpen)}
          />
        )}

        {isCertificateOpen && (
          <OrderModalCertificate
            order={currentOrder}
            isOpen={isCertificateOpen}
            setOpen={() => setCertificateOpen(!isCertificateOpen)}
            signature={signature}
            orderPagination={orderPagination}
            resale
          />
        )}

        {isPackingInstructionOpen && (
          <OrderModalPackingInstruction
            isOpen={isPackingInstructionOpen}
            setOpen={() => setPackingInstructionOpen(!isPackingInstructionOpen)}
          />
        )}

        {isWrappedStepsOpen && (
          <WrappedStepModal
            order={currentOrder}
            isOpen={isWrappedStepsOpen}
            setOpen={() => setWrappedStepsOpen(!isWrappedStepsOpen)}
            orderPagination={orderPagination}
            resale
          />
        )}

        {isPickupDateOpen && (
          <OrderModalPickupDate
            order={currentOrder}
            isOpen={isPickupDateOpen}
            setOpen={() => setPickupDateOpen(!isPickupDateOpen)}
            orderPagination={orderPagination}
            resale
          />
        )}

        {isOpenCheckPackage && (
          <TrackPackageModal
            isOpen={isOpenCheckPackage}
            setClose={() => setIsOpenCheckPackage(!isOpenCheckPackage)}
            order={currentOrder}
          />
        )}

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
              {order.verification !== DECLINED && (
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
            type={ORDERS}
          />
        </div>
      </div>
    </div>
  );
}

export default InComingOrders;
