import { FAIR_PRICING, GROW_WITH_US } from 'constants/components/pricing';
import React, { useRef } from 'react';
import { PlansFeatures } from './layouts/plans-features';
import PlansList from './layouts/plans-list';
import image from './artist2.svg';
import styles from './plans.module.scss';
import { usePricing } from 'hooks/use-pricing';

export function PlansDesktop({ signUpFinishCallback }) {
  const planRef = useRef();
  const { findSubscriptionIndex, plansList } = usePricing();

  return (
    <div className={styles.desktop}>
      <div className={styles.header}>
        <div className={styles.header__card}>
          <div className={`${styles.lead} ${styles.lead__desktop}`}>
            <p>
              {FAIR_PRICING}
              <br />
              {GROW_WITH_US}
            </p>

            <img className={styles.image} src={image} alt="preview" />
          </div>
        </div>

        {plansList.map((plan, position, list) => (
          <PlansList
            ref={planRef}
            key={plan.name}
            plan={plan}
            position={position}
            activePosition={findSubscriptionIndex(list)}
            signUpFinishCallback={signUpFinishCallback}
          />
        ))}
      </div>

      <PlansFeatures planRef={planRef} />
    </div>
  );
}
