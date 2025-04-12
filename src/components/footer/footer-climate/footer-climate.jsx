import Icons from 'components/icons';
import React from 'react';
import styles from '../footer.module.scss';

export function FooterClimate() {
  return (
    <div className={styles.climate_wrapper}>
      <div className={styles.climate}>
        <Icons.StripeClimate param={72} />
      </div>
      <span className={styles.climate_info}>
        Draint will contribute <strong>1% of your Payment</strong> to remove CO
        <sub>2</sub> from the Atmosphere.
      </span>
    </div>
  );
}
