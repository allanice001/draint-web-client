import { Container } from 'reactstrap';
import React from 'react';
import { TRACKING_TITLE } from 'constants/shipping-page/shipping-page';
import staticUrls from 'constants/images/static-urls';
import styles from './track-section.module.scss';

const TrackSection = () => {
  return (
    <Container>
      <div className={styles.content}>
        <div className={styles.macbook}>
          <img src={staticUrls.screen.macbook} alt="laptop" />
        </div>
        <div className={styles.text_content}>
          <h2>{TRACKING_TITLE}</h2>
          <p>
            Artists and collectors are aware of the current shipping status any
            time as seen in the image. <br />
            After the artwork gets sold, the seller is asked to follow our
            packaging guide to ensure secured shipping. As soon as confirmed by
            Draint, a pickup date is scheduled. <br />
            After successfully handing the painting to the courier, both the
            seller and the collector can track the painting to its destination.
            <br />
            There are three day to day delivery attempts directly to the address
            of the collector, before the painting returns to its origin.
            Paintings are not stored at a pickup station.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default TrackSection;
