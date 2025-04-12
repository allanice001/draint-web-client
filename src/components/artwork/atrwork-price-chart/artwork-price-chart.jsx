import Chart from './chart';
import React from 'react';
import classNames from 'classnames';
import styles from './artwork-price-chart.module.scss';
import { useSelector } from 'react-redux';

const ArtworkPriceChart = () => {
  const artwork = useSelector(
    store => store.artwork.artworkData.currentArtwork
  );
  const { priceInfo, price: artworkPrice, for_sale: forSale } = artwork;
  const { totalPrice, fixedCosts, fee: artworkFee } = priceInfo;

  const saleStatus = classNames(styles.circle, {
    [styles.circle__active]: forSale,
    [styles.circle__disable]: !forSale,
  });

  function getStatusStyle(status) {
    return classNames(
      styles.circle,
      styles.circle__big,
      styles[`circle__${status}`]
    );
  }

  const price = priceInfo ? totalPrice : artworkPrice;
  const amount = price ? parseFloat(Number(price).toFixed(2)) : 0;
  const commissions = priceInfo ? fixedCosts : 0;
  const fee = priceInfo ? artworkFee.toFixed(2) : 0;
  const payout = (price - commissions - fee).toFixed(2);
  const feePercent = Math.round(fee / (price / 100));
  const commissionsPercent = Math.round(commissions / (price / 100));

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <Chart fee={feePercent} commissions={commissionsPercent} />
        <div className={styles.price}>
          <label>Price</label>
          <span>&euro;&nbsp;{amount}</span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.status}>
          <label>Status</label>
          <span className={saleStatus}>Artwork for sale</span>
        </div>

        <div className={styles.row}>
          <span className={getStatusStyle('payout')}>Your Payout -</span>
          <b>&euro; {payout}</b>
        </div>

        <div className={styles.row}>
          <span className={getStatusStyle('fee')}>Draint Commission Fee -</span>
          <b>&euro; {fee}</b>
        </div>

        <div className={styles.row}>
          <span className={getStatusStyle('commissions')}>
            Money Processing Fees -
          </span>
          <b>&euro; {commissions}</b>
        </div>
      </div>
    </div>
  );
};

export default ArtworkPriceChart;
