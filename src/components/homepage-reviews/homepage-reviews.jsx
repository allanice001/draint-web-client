import React from 'react';
import { Review } from 'models/home-review';
import ReviewCard from './reviews-card';
import { ReviewSlider } from './reviews-slider';
import staticUrls from 'constants/images/static-urls';
import styles from './homepage-reviews.module.scss';
import { useSelector } from 'react-redux';

const HomepageReviews = () => {
  const { reviews } = useSelector(state => state.home.reviews);

  if (!Object.keys(reviews).length) return null;

  return (
    <section className={styles.root}>
      {!!reviews.length && (
        <div className={styles.content_wrapper}>
          <div
            className={styles.container}
            style={{
              backgroundImage: `url(${staticUrls.screen.reviewBG})`,
              backgroundSize: 'cover',
            }}
          >
            <div className={styles.slider_sections}>
              <ReviewSlider
                list={reviews}
                Model={Review}
                item={(review, i) => (
                  <ReviewCard review={review} index={review ? review.id : i} />
                )}
              />
            </div>
            <div className={styles.picture_container}>
              <div
                className={styles.girl_container}
                style={{
                  backgroundImage: `url(${staticUrls.screen.girl})`,
                  backgroundSize: 'cover',
                }}
              />

              <div
                className={styles.quotes}
                style={{
                  backgroundImage: `url(${staticUrls.screen.quotes})`,
                  backgroundSize: 'contain',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomepageReviews;
