import { Container } from 'reactstrap';
import { PACKAGING } from 'constants/shipping-page/shipping-page';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './package-section.module.scss';

const PackageSection = () => {
  return (
    <Container>
      <div className={styles.root}>
        <div className={styles.title_container}>
          <h2 className={styles.title}>{PACKAGING.title}</h2>
          <p className={styles.subtitle}>{PACKAGING.subtitle}</p>
        </div>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={staticUrls.image.delivery} alt="packaging" />
          </div>
          <div className={styles.text_content}>
            <p>
              As the seller, whether you’ve sold a small or big artwork on
              canvas, we have detailed packaging guidelines below to follow. We
              do understand that paintings are very personal belongings and we
              guarantee to have well-thought packaging to secure a save journey.
            </p>
            <p>
              In the unfortunate event that a painting gets damaged during
              shipment, any deviation of our guidelines will result in returning
              the artwork to the seller without any financial compensation as we
              need to pay back the full purchasing price to the collector as
              well. Follow the below listed packaging guide.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PackageSection;
