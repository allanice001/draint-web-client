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
  confirmOrderPayment,
  fetchOffers,
  fetchOrders,
  getPackageInfo,
  setOfferPagination,
  verifyOffer,
  verifyOrder,
} from 'redux/dashboard/actions/ordersActions';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import CollectorArtwork from 'components/collector/collector-artwork/collector-artwork';
import InComingItem from 'components/collector/collector-offers/components/offerItems/in-coming-item';
import { Offer } from 'models/offer';
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
import { Spinner } from 'components/lib';
import TrackPackageModal from 'components/order/modals/track-package-modal';
import WrappedStepModal from 'components/order/modals/order-modal-wrapped-steps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './orders.module.scss';
import {
  COLLECTOR,
  COMPLETED,
  DECLINED,
  OFFERS,
  ORDERS,
  VERIFIED,
} from 'constants/components/orders/constatns';

const Analytic = AnalyticHelper.create();

function Orders({ account, actions, orders, offers, signature }) {
  ReactGA.pageview(window.location.pathname);
  ReactPixel.pageView();
  PinterestTag.pageView();

  const [isSignatureOpen, setSignatureOpen] = useState(false);
  const [isCertificateOpen, setCertificateOpen] = useState(false);
  const [isPickupDateOpen, setPickupDateOpen] = useState(false);
  const [isPackingInstructionOpen, setPackingInstructionOpen] = useState(false);
  const [isWrappedStepsOpen, setWrappedStepsOpen] = useState(false);
  const [isOpenCheckPackage, setIsOpenCheckPackage] = useState(false);
  const [currentOrder, setCurrentOrder] = useState();

  const [orderPagination, setOrderPagination] = useState({
    page: 1,
    limit: 2,
  });

  const [offerPagination, setOfferPagination] = useState({
    page: 1,
    limit: 2,
  });

  const { page: ordersPage, limit: ordersLimit } = orderPagination;
  const { page: offersPage, limit: offersLimit } = offerPagination;

  useEffect(() => {
    actions.setOfferPagination(offerPagination);
  }, [actions, offerPagination]);

  useEffect(() => {
    if (account.profile_id) {
      actions.fetchOrders(ordersPage, ordersLimit);
    }
  }, [account.profile_id, ordersPage, ordersLimit, actions]);

  useEffect(() => {
    if (account.profile_id) {
      actions.fetchOffers(offersPage, offersLimit);
    }
  }, [account.profile_id, offersPage, offersLimit, actions]);

  function getNotificationBySteps(stepsData, order) {
    const payoutStatus = order.orderPayout && order.orderPayout.status;

    if (payoutStatus === COMPLETED) {
      return (
        <OrderHasBeenPayoutNotification price={order.orderPayout.amount} />
      );
    }

    if (stepsData[Key.Delivered]) {
      return <ArtworkDeliveredNotification />;
    }

    if (stepsData[Key.CourierArrival]) {
      return (
        <ArtworkSentNotification
          order={order}
          setOpen={() => {
            actions.fetchOrders(ordersPage, ordersLimit);
            actions.getPackageInfo(order, setIsOpenCheckPackage);
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
            actions.checkOrderVerification(
              {
                orderId: order.id,
              },
              ordersPage,
              ordersLimit,
              setPickupDateOpen
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
            actions.checkOrderVerification(
              {
                orderId: order.id,
              },
              ordersPage,
              ordersLimit,
              setPackingInstructionOpen
            );
          }}
          onArtworkWrapped={() => {
            actions.checkOrderVerification(
              {
                orderId: order.id,
              },
              ordersPage,
              ordersLimit,
              setWrappedStepsOpen
            );
            setCurrentOrder(order);
          }}
          order={order}
        />
      );
    }

    if (stepsData[Key.Paid]) {
      return (
        <CertificateNotification
          signature={signature}
          onCreateSignature={() => {
            actions.checkOrderVerification(
              {
                orderId: order.id,
              },
              ordersPage,
              ordersLimit,
              setSignatureOpen
            );
            setCurrentOrder(order);
          }}
          onCreateCertificate={() => {
            actions.checkOrderVerification(
              {
                orderId: order.id,
              },
              ordersPage,
              ordersLimit,
              setCertificateOpen
            );
            setCurrentOrder(order);
          }}
        />
      );
    }

    if (order.verification) {
      return (
        <SellerConfirmedNotification
          confirmOrderPayment={() => {
            actions.confirmOrderPayment(
              {
                orderId: order.id,
              },
              ordersPage,
              ordersLimit
            );
          }}
        />
      );
    }

    if (!order.verification) {
      const shipmentId = order.shipment ? order.shipment.id : null;

      return (
        <ConfirmOrderNotification
          onVerify={() => {
            actions.verifyOrder(
              {
                orderId: order.id,
                accountId: account.id,
                orderStatus: VERIFIED,
                type: COLLECTOR,
              },
              ordersPage,
              ordersLimit
            );
            Analytic.createEvent('OrderWasVerifiedByArtist', {
              value: order.price,
            });
          }}
          onDecline={() => {
            actions.verifyOrder(
              {
                orderId: order.id,
                orderStatus: DECLINED,
                type: COLLECTOR,
              },
              ordersPage,
              ordersLimit
            );
            Analytic.createEvent('OrderWasDeclinedByArtist', {
              value: order.price,
            });
          }}
          shipmentId={shipmentId}
        />
      );
    }
  }

  if (account.loading) return <Spinner full />;

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <h3 className={`group-title ${styles.title}`}>Orders</h3>

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
          />
        )}

        {isPickupDateOpen && (
          <OrderModalPickupDate
            order={currentOrder}
            isOpen={isPickupDateOpen}
            setOpen={() => setPickupDateOpen(!isPickupDateOpen)}
            orderPagination={orderPagination}
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
          />
        )}

        {isOpenCheckPackage && (
          <TrackPackageModal
            isOpen={isOpenCheckPackage}
            setClose={() => setIsOpenCheckPackage(!isOpenCheckPackage)}
          />
        )}

        <div>
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
                <CollectorArtwork artwork={order.artwork} key={order.id}>
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
        </div>

        <Pagination
          page={orderPagination.page}
          maxCount={orders.total}
          pages={orders.totalPages}
          setPage={page => setOrderPagination({ ...orderPagination, page })}
          setCount={limit => setOrderPagination({ page: 1, limit })}
          count={orders.data.length}
          type={ORDERS}
        />
      </div>

      <div className="container">
        <h3 className={`group-title ${styles.title} ${styles.offers__title}`}>
          Offers
        </h3>

        {offers.data.map(Offer.create).map(offer => (
          <div className={styles.order} key={offer.id}>
            <CollectorArtwork artwork={offer.artwork} key={offer.id} />

            <InComingItem
              changeOfferStatus={params => {
                const analyticEvents = {
                  verified: 'OrderWasVerifiedByArtist',
                  declined: 'OrderWasDeclinedByArtist',
                };
                actions.verifyOffer(params, offersPage, offersLimit);
                Analytic.createEvent(analyticEvents[params.status], {
                  value: params.price,
                });
              }}
              offer={offer}
              page={offerPagination.page}
              pageCount={offerPagination.limit}
            />
          </div>
        ))}

        <Pagination
          page={offerPagination.page}
          maxCount={offers.total}
          pages={offers.totalPages}
          setPage={page => setOfferPagination({ ...offerPagination, page })}
          setCount={limit => setOfferPagination({ page: 1, limit })}
          count={offers.data.length}
          type={OFFERS}
        />
      </div>
    </section>
  );
}

function mapStateToProps(store) {
  const {
    dashboard: { orders, settings },
    user: { account },
  } = store;

  const { artistOrders, newOffers, loading } = orders;
  const { signature } = settings;

  return {
    orders: artistOrders,
    offers: newOffers,
    loading,
    signature,
    account,
    lastNumber: orders.lastNubmer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        verifyOrder,
        fetchOrders,
        fetchOffers,
        verifyOffer,
        setOfferPagination,
        confirmOrderPayment,
        checkOrderVerification,
        getPackageInfo,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
