import React, { useState } from 'react';
import PlansListResponsive from './layouts/plans-list-responsive';
import classnames from 'classnames/bind';
import styles from './plans.module.scss';
import { usePricing } from 'hooks/use-pricing';

export function PlansMobile({ signUpFinishCallback }) {
  const {
    user,
    pricing,
    handleSubscriptionModal,
    findSubscriptionIndex,
    plansList,
    features,
    isSignUp,
  } = usePricing(signUpFinishCallback);

  const { is_artist: isArtist, planId } = user;
  const { load, selectedPlanError, selectedPlan } = pricing;

  const [expanded, setExpanded] = useState(false);

  function getIsSelected(checkedPlanId) {
    if (selectedPlan) return checkedPlanId === selectedPlan.id;

    if (isSignUp) return false;

    return checkedPlanId === planId;
  }

  function handleOpenPanel(panel, isExpanded) {
    return event => {
      event.stopPropagation();
      setExpanded(isExpanded ? panel : false);
    };
  }

  return (
    <div className={styles.mobile}>
      {!isSignUp && (
        <div className={classnames('font-title-2', styles.lead)}>
          <p>
            Fair Pricing.
            <br />
            Grow with Us.
          </p>
        </div>
      )}

      {plansList.map((plan, position) => (
        <PlansListResponsive
          key={plan.name}
          position={position}
          isSignUp={isSignUp}
          expanded={expanded}
          features={features}
          handleOpenPanel={handleOpenPanel}
          handleOpenSubscribeModal={() => handleSubscriptionModal(plan)}
          isArtist={isArtist}
          isError={selectedPlanError}
          isSelected={getIsSelected(plan.id)}
          load={load}
          plan={plan}
          subscribedPlan={planId}
          user={user}
          list={plansList}
          activePosition={findSubscriptionIndex(plansList)}
          signUpFinishCallback={signUpFinishCallback}
        />
      ))}
    </div>
  );
}
