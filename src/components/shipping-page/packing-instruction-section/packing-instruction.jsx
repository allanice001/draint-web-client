import { PACKAGING_TITLE } from 'constants/shipping-page/shipping-page';
import React from 'react';
import styles from './packing-instruction.module.scss';
import { wrappedSteps } from 'constants/shipping-page/wrapped-steps';

const PackagingInstructions = () => {
  return (
    <section className={styles.root}>
      <h2>{PACKAGING_TITLE}</h2>
      <div className={styles.card_container}>
        {wrappedSteps.map((wrapped, key) => (
          <div key={key}>
            <div className={styles.card}>
              <div className={styles.step}>{wrapped.step}</div>
              <div className={styles.card_img}>
                <img
                  src={wrapped.gifUrl}
                  alt={wrapped.title}
                  className={styles.card_img_wrapped}
                />
              </div>
              <h3 className={styles.title}>{wrapped.title}</h3>
              <div>
                <p className={styles.desc}>{wrapped.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PackagingInstructions;
