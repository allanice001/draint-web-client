import React from 'react';
import convertIsoCountry from 'services/convert-iso-country';
import { getPointStars } from 'services/global';
import styles from './reviews-card.module.scss';

const ReviewCard = ({ review, index }) => {
  return (
    <div className={styles.card} key={index}>
      <div className={styles.card_content}>
        <h1>{review.name}</h1>

        <div className={styles.card_points}>
          {getPointStars(review.points)}
          <span>{review.points}.0</span>
        </div>

        <div className={styles.card_message}>
          <p>{review.message}</p>
        </div>

        <div className={styles.card_county}>
          <p>{convertIsoCountry(review.country, true)}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
