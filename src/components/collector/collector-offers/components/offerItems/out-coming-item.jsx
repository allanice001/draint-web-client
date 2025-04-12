import {
  CART_URL,
  CHECKOUT,
  CHECKOUT_PURCHASE_MESSAGE,
  ORIGINAL_PRICE,
  PURCHASED,
  SELLER_OFFERED,
  WAITING_FOR_SELLER,
  YOUR_OFFER,
  YOU_HAVE_OFFERED,
} from 'constants/components/offers';
import {
  DECLINED,
  VERIFIED,
  WAS_ACCEPTED,
  WAS_DECLINED,
} from 'constants/statuses';
import React, { useMemo, useRef, useState } from 'react';
import {
  setAuctionModal,
  setCurrentOffer,
} from 'redux/dashboard/actions/ordersActions';
import { useDispatch, useSelector } from 'react-redux';
import Icons from 'components/icons';
import OutComingItemButtons from './out-coming-item-buttons';
import styles from './outComingItem.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';
import { useHistory } from 'react-router';

function OutComingItem({ offer, page, pageCount }) {
  const outComingRef = useRef();
  useCollectorTheme(outComingRef);

  const history = useHistory();

  function toCheckout() {
    history.push(CART_URL);
  }

  const dispatch = useDispatch();
  const currentOffer = useSelector(
    store => store.dashboard.orders?.currentOffer
  );
  const [offerData, setOfferData] = useState(offer);

  useMemo(() => {
    if (currentOffer) {
      if (offerData.id === currentOffer.id) {
        setOfferData(currentOffer);
      }
    }
  }, [offerData, currentOffer]);

  function handleOffer(offer) {
    offer.page = page;
    offer.pageCount = pageCount;
    dispatch(setAuctionModal());
    dispatch(setCurrentOffer(offer));
  }

  function setCurrentOfferStatus(offer, status) {
    offer.page = page;
    offer.pageCount = pageCount;
    offer.verification = status;
    dispatch(setCurrentOffer(offer));
  }

  return (
    <div className={styles.status} ref={outComingRef}>
      <>
        {offer.verification && (
          <>
            <div className={styles.content}>
              <div className={styles.circle}>
                <Icons.Check className={`${styles.icon} ${styles.accepted}`} />
              </div>
              <span>{YOUR_OFFER}</span>
              <span className={styles.price}>&nbsp;{offer.price} €&nbsp;</span>
              {offer.verification === DECLINED ? (
                <span>{WAS_DECLINED}</span>
              ) : (
                <span>{WAS_ACCEPTED}</span>
              )}
            </div>
            {offer.verification === VERIFIED && !offer.isCheckout ? (
              <div className={styles.message}>
                <div className={styles.message__text}>
                  {CHECKOUT_PURCHASE_MESSAGE}
                </div>
                <div className={styles.buttons}>
                  <button
                    onClick={toCheckout}
                    type="button"
                    className={styles.button}
                  >
                    {CHECKOUT}
                  </button>
                </div>
              </div>
            ) : offer.verification === DECLINED ? (
              <div
                className={`${styles.button__verification} ${styles.button__verification__canceled}`}
              >
                {offer.verification}
              </div>
            ) : offer.verification === VERIFIED && offer.isCheckout ? (
              <div
                className={`${styles.button__verification} ${styles.button__verification__accepted}`}
              >
                {PURCHASED}
              </div>
            ) : (
              <div
                className={`${styles.button__verification} ${styles.button__verification__accepted}`}
              >
                {offer.verification}
              </div>
            )}
          </>
        )}

        {!offer.verification && (
          <>
            <div className={styles.content}>
              <Icons.ArrowCircle
                className={`${styles.icon} ${styles.outcoming}`}
              />
              <span>{YOU_HAVE_OFFERED}</span>
              <span className={styles.price}>&nbsp;{offer.price}&nbsp;€</span>,
              {offer.sellerOfferPrice
                ? ` ${SELLER_OFFERED} ${offer.sellerOfferPrice}`
                : ` ${ORIGINAL_PRICE} ${offer.artwork.price}`}
              &nbsp;€
            </div>

            <OutComingItemButtons
              offer={offerData}
              page={page}
              pageCount={pageCount}
              handleOffer={handleOffer}
              setCurrentOfferStatus={setCurrentOfferStatus}
            >
              <div className={styles.message}>{WAITING_FOR_SELLER}</div>
            </OutComingItemButtons>
          </>
        )}
      </>
    </div>
  );
}

export default OutComingItem;
