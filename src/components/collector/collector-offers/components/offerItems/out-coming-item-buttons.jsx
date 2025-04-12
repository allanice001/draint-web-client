import { ACCEPT, UPDATE_OFFER } from 'constants/components/offers';
import React from 'react';
import { changeOfferPrice } from 'redux/dashboard/actions/ordersActions';
import styles from './outComingItem.module.scss';
import { useDispatch } from 'react-redux';

const OutComingItemButtons = ({
  offer,
  handleOffer,
  setCurrentOfferStatus,
  children,
}) => {
  const dispatch = useDispatch();

  function handleAccept() {
    setCurrentOfferStatus(offer);
    dispatch(
      changeOfferPrice({
        offerId: offer.id,
        price: offer.sellerOfferPrice,
      })
    );
  }

  if (offer.sellerOfferPrice && offer.isSellerOfferedLast) {
    return (
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.accept}`}
          onClick={handleAccept}
          type="button"
        >
          {ACCEPT}
        </button>

        <button
          className={`secondary-button ${styles.offer_button}`}
          onClick={() => handleOffer(offer)}
          type="button"
        >
          {UPDATE_OFFER}
        </button>
      </div>
    );
  }

  return children;
};

export default OutComingItemButtons;
