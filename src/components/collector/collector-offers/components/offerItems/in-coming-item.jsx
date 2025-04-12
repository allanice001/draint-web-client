import { DECLINED, VERIFIED } from 'constants/statuses';
import React, { useEffect, useState } from 'react';
import {
  setAuctionModal,
  setCurrentOffer,
} from 'redux/dashboard/actions/ordersActions';
import { useDispatch, useSelector } from 'react-redux';

import Icons from 'components/icons';
import VerificationStatus from '../verificationStatus/verification';
import styles from './inComingItem.module.scss';
import { useHistory } from 'react-router';

function InComingItem({ offer, page, pageCount, changeOfferStatus }) {
  const dispatch = useDispatch();
  const currentOffer = useSelector(
    store => store.dashboard.orders?.currentOffer
  );
  const user = useSelector(store => store.user.account);
  const { is_artist: isArtist } = user;
  const [offerData, setOfferData] = useState(offer);
  const history = useHistory();

  function toOrders() {
    return history.push('/collector-dashboard/orders');
  }

  function purchasedOffer() {
    if (isArtist) {
      return <VerificationStatus verification={'Purchased'} />;
    }

    return (
      <div className={styles.message}>
        <div className={styles.buttons}>
          <button onClick={toOrders} type="button" className={styles.button}>
            Purchased
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (currentOffer) {
      if (offerData.id === currentOffer.id) {
        setOfferData(currentOffer);
      }
    }
  }, [offerData, currentOffer]);

  function handleCounterOffer(offerData) {
    offerData.page = page;
    offerData.pageCount = pageCount;
    dispatch(setAuctionModal());
    dispatch(setCurrentOffer(offerData));
  }

  function setCurrentOfferStatus(offerData, status) {
    offerData.page = page;
    offerData.pageCount = pageCount;
    offerData.verification = status;
    dispatch(setCurrentOffer(offerData));
  }

  return (
    <div className={styles.status}>
      <div className={styles.content}>
        <div className={styles.icon_wrapper}>
          <Icons.ArrowCircle className={`${styles.icon} ${styles.incoming}`} />
        </div>
        <div className={styles.info}>
          <span>
            {offerData.from_account.fullName || 'Anonymous user'} offered
            <span className={styles.price}>&nbsp;{offerData.price} €</span>,
            original price {offerData.artwork.price} €
          </span>
        </div>
      </div>

      {!offerData.verification ? (
        <div className={styles.buttons_wrapper}>
          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.accept}`}
              onClick={() => {
                setCurrentOfferStatus(offerData, VERIFIED);
                changeOfferStatus({
                  id: offerData.id,
                  price: offerData.price,
                  status: VERIFIED,
                  offerData,
                });
              }}
              type="button"
            >
              Accept
            </button>

            <button
              className={`${styles.button} ${styles.decline}`}
              onClick={() => {
                setCurrentOfferStatus(offerData, DECLINED);
                changeOfferStatus({
                  id: offerData.id,
                  price: offerData.price,
                  status: DECLINED,
                });
              }}
              type="button"
            >
              Decline
            </button>
          </div>

          <button
            className={`secondary-button ${styles.stretch}`}
            disabled={
              offerData.sellerOfferPrice && offerData.isSellerOfferedLast
            }
            onClick={() => handleCounterOffer(offerData)}
            type="button"
          >
            Your offer
          </button>
        </div>
      ) : offerData.verification === VERIFIED && offerData.isCheckout ? (
        purchasedOffer()
      ) : (
        <VerificationStatus verification={offerData.verification} />
      )}
    </div>
  );
}

export default InComingItem;
