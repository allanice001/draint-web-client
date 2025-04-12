import { MONTH, PER_MONTH, PER_YEAR, YEAR } from 'constants/components/pricing';
import React, { forwardRef } from 'react';
import Icon from 'components/icons/';
import { SubscribeButtons } from './subscribe-buttons';
import classnames from 'classnames';
import { cssClassWithModifier } from 'helpers/utils';
import styles from './plansList.module.scss';
import { usePricing } from 'hooks/use-pricing';

export const PeriodFlag = ({
  period,
  className,
  label,
  isSignUp,
  labelData,
  mobile,
}) => {
  const classNames = classnames(styles.flag, className, {
    [cssClassWithModifier(styles, 'flag', 'monthly')]: period === MONTH,
    [cssClassWithModifier(styles, 'flag', 'trial_monthly')]:
      mobile || (isSignUp && labelData?.period && period === MONTH),
    [cssClassWithModifier(styles, 'flag', 'year')]: period === YEAR,
  });
  const textClassNames = classnames('font-caption', styles.flagText);

  return (
    <span className={classNames}>
      <Icon.Flag />
      <span className={textClassNames}>{label}</span>
    </span>
  );
};

const PriceInfo = ({ plan, isSignUp }) => {
  const { getMonthlyLabelPlanData } = usePricing();
  const labelData = getMonthlyLabelPlanData(plan);
  const titleClassNames = classnames('font-title', styles.title);
  const costClassNames = classnames('font-content-2', styles.cost, {
    [cssClassWithModifier(styles, 'cost', 'month')]: plan.period === MONTH,
    [cssClassWithModifier(styles, 'cost', 'year')]: plan.period === YEAR,
  });
  const periodClassNames = classnames('font-content', styles.period);
  const feeClassNames = classnames('font-content-2', styles.fee);

  if (isSignUp && plan.period === MONTH) {
    return (
      <>
        <h4 className={titleClassNames}>
          <PeriodFlag
            period={plan.period}
            label={labelData.label}
            isSignUp={isSignUp}
            labelData={labelData}
          />
          <span className={periodClassNames}>{labelData.period}</span>
          {plan.label}
        </h4>
        <span className={costClassNames}>
          <span>
            {plan.currency}
            {plan.price}
            <sup>{plan.extra}</sup>
          </span>
          <span className={periodClassNames}>
            /{plan.period === YEAR ? PER_YEAR : PER_MONTH}
            {plan.sale && <span className={styles.crossed}>{plan.sale}</span>}
          </span>
        </span>

        <span className={feeClassNames}>
          <span>{plan.fees}% fees</span>
          <span>on sales</span>
        </span>
      </>
    );
  }

  return (
    <>
      <h4 className={titleClassNames}>
        <PeriodFlag period={plan.period} label={plan.periodLabel} />
        {plan.label}
      </h4>
      <span className={costClassNames}>
        <span>
          {plan.currency}
          {plan.price}
          <sup>{plan.extra}</sup>
        </span>
        <span className={periodClassNames}>
          /{plan.period === YEAR ? PER_YEAR : PER_MONTH}
          {plan.sale && <span className={styles.crossed}>{plan.sale}</span>}
        </span>
      </span>

      <span className={feeClassNames}>
        <span>{plan.fees}% fees</span>
        <span>on sales</span>
      </span>
    </>
  );
};

const PlanFeature = ({ features, plan }) => {
  const { handleOpenInfoModal } = usePricing();

  return (
    <ul className={styles.features}>
      {features
        .filter((el, i) => plan.features[i])
        .map((el, key) => (
          <li onClick={() => handleOpenInfoModal(el)} key={key}>
            <Icon.Check width="13" fill="currentColor" />
            {el}
          </li>
        ))}
    </ul>
  );
};

export default forwardRef(function PlansList(
  { plan, position, activePosition, signUpFinishCallback },
  ref
) {
  const {
    user,
    pricing,
    handleSubscriptionModal,
    features,
    isSignUp,
    handleMonthlyTrial,
  } = usePricing(signUpFinishCallback);

  const { is_artist: isArtist, planId: activePlanId, id: isUser } = user;
  const { load } = pricing;

  const planClassNames = classnames(styles.plan, {
    [styles.active]: plan.id === activePlanId && isArtist,
  });

  return (
    <div
      className={planClassNames}
      ref={plan.id === activePlanId && isArtist ? ref : null}
    >
      <PriceInfo plan={plan} isSignUp={isSignUp} />

      <PlanFeature features={features} plan={plan} />

      <SubscribeButtons
        position={position}
        handleOpenSubscribeModal={() => handleSubscriptionModal(plan)}
        plan={plan}
        activePosition={activePosition}
        isArtist={isArtist}
        load={load}
        isSignUp={isSignUp}
        isUser={isUser}
        pricing={pricing}
        handleMonthlyTrial={handleMonthlyTrial}
      />
    </div>
  );
});
