import Icons from 'components/icons';
import React from 'react';
import convertIsoCountry from 'services/convert-iso-country';
import { getPointStars } from 'services/global';
import styles from './review-card.module.scss';

const MasterReviewCard = ({ review, index, handleDelete, handleEdit, isAnalyst }) => {
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
      {!isAnalyst && (
      <div className={styles.card__buttons}>
        <button
          type="button"
          className={styles.button}
          onClick={() => handleEdit({
            id: review.id,
            name: review.name,
            points: review.points,
            message: review.message,
            country: review.country
          })
        }
        >
          <Icons.Edit className={styles.icon}/>
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => handleDelete(review.id)}
        >
          <Icons.Trash className={styles.icon}/>
        </button>
      </div>
      )}
    </div>
  );
};

export default MasterReviewCard;
