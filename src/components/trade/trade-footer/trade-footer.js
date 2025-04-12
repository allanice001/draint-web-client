import { COLLECTOR_SIGN_UP } from '../../../constants/links';
import JoinUsButton from '../../join-us/join-us-button';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './trade-footer.module.scss';

export const TradeFooter = ({ isArtist }) => {
  return (
    <div className={styles.container}>
      <h3 className="group-title">Buy to Sell at a Profit</h3>
      <p className="group-subtitle">
        Paintings on Draint are meant to earn you a profit because we believe in
        artists that establish a brand
      </p>
      <div className={styles.wrapper}>
        <img srcSet={staticUrls.svg.earnMoney} alt="Join as Collector" />
        <p className={styles.text}>
          Over time, artists build reputation, expertise, defined styles,
          uniqueness and recognition. <br />
          Alongside the value of past and recent paintings will grow. Buy art
          from promising artists in their early days. Track their pricing and
          re-sell your acquisition at a profit. <br />
          Paintings are unique, one offs and worth trading. <br />
          We offer you the most transparent market to start now.
          <br />
          <br />
          Every artwork re-sold by you will benefit the artist as well. A
          percentage amount of your selling price will be transferred to the
          artist.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        {isArtist && (
          <JoinUsButton name={'Join as Collector'} url={COLLECTOR_SIGN_UP} />
        )}
      </div>
    </div>
  );
};
