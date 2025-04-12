import { Container } from 'reactstrap';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './shipping-failure.module.scss';

const ShippingFailure = () => {
  return (
    <Container>
      <div className={styles.root}>
        <h2 className={styles.title}>Shipping failure or damage</h2>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={staticUrls.image.deliveryman} alt="packaging" />
          </div>
          <div className={styles.text_content}>
            <p>
              Paintings only can be shipped based on our guide provided above.
              This means by uploading images to proof you followed our packaging
              guide you automatically qualify to ship with Draint.
            </p>
            <p>
              If the images you provide are fake, we will get to know this via
              the buyer. In case of any damage the buyer will send us images of
              the packaging received alongside the painting as well. We are then
              able to compare the pre- and after-shipping status of the
              packaging.
            </p>
            <p>
              Damaged or lost paintings cause additional costs. Draint as an
              entity is not accountable for any damage that occurs or a painting
              that gets lost. Of course, we will do our best to support you in
              finding a solution. However, original paintings have no
              replacement value other than the purchase price. We, therefore,
              will refund the full purchase price to the buyer with no doubt.
            </p>
            <p>
              In case of a damaged painting we then will guide the buyer through
              the same packaging steps including its image documentation to ship
              the damaged painting back to you.
            </p>
            <p>
              In case of a lost painting, we will refund the full amount to the
              buyer and hold the сourier responsible for compensating for your
              financial loss. Such a case will always be a unique scenario that
              requires a unique solution.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ShippingFailure;
