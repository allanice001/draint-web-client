import { COLLECTOR_SIGN_UP } from '../../../constants/links';
import JoinUsButton from '../../join-us/join-us-button';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './collector-lead.module.scss';

function CollectorLead({ is_artist }) {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.lead__wrapper}>
          <div className={styles.slide}>
            <img
              src={staticUrls.image.growPortfolio}
              alt="Buy Artworks & Resell them at a Profit!"
              className={styles.image}
              title="Buy Artworks & Resell them at a Profit!"
            />
            <h4 className={styles.image__title}>
              Buy Artworks & Resell them at a Profit!
            </h4>
            <p className={styles.image__description}>
              Whenever an Artwork gets sold the artist behind will profit as
              well. Invest in Artists and their unique work.
            </p>
          </div>
          <div className={styles.lead__content}>
            <h4 className={styles.lead__title}>Grow your Portfolio!</h4>
            <p>
              Price-Setting, Secure Payments & Insured Shipping. We take care of
              it all, so you can invest in Art successfully.
            </p>
            {(is_artist || is_artist === undefined) && (
              <JoinUsButton
                name={'Become a Collector'}
                url={COLLECTOR_SIGN_UP}
                link={styles.lead__link}
              />
            )}
          </div>

          <div className={styles.shadow} />
        </div>
      </div>
    </section>
  );
}

export default CollectorLead;
