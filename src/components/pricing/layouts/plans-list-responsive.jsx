import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import { MONTH, PER_MONTH, YEAR } from 'constants/components/pricing';
import Icon from 'components/icons';
import { PeriodFlag } from './plans-list';
import PlansList from './plans-list';
import React from 'react';
import classnames from 'classnames/bind';
import styles from './plansListResponsive.module.scss';

const classNames = classnames.bind(styles);

function PriceInfoExpanded({ isSignUp, plan }) {
  if (isSignUp && plan.period === MONTH) {
    return (
      <div className={styles.left}>
        <h3 className={classNames('font-title-1', styles.title)}>
          {plan.label}

          <PeriodFlag
            className={styles.flag}
            period={plan.period}
            label={plan.trialLabel}
            isSignUp={isSignUp}
            mobile
          />
        </h3>
        <span className={classnames('font-content')}>{plan.trialPeriod}</span>

        <div className={styles.price}>
          <b>
            {plan.currency}
            {plan.price} /{plan.period === YEAR ? YEAR : PER_MONTH}
          </b>
          {!plan.sale && <span> - {plan.fees}% sale fees</span>}
          {plan.sale && (
            <span>
              <b className={styles.crossed}>{plan.sale}</b>
              <br /> {plan.fees}% sale fees
            </span>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.left}>
      <h3 className={classNames('font-title-1', styles.title)}>
        {plan.label}

        {plan.period === YEAR && (
          <PeriodFlag
            className={styles.flag}
            period={plan.period}
            label={plan.periodLabel}
          />
        )}
      </h3>

      <div className={styles.price}>
        <b>
          {plan.currency}
          {plan.price} /{plan.period === YEAR ? YEAR : PER_MONTH}
        </b>
        {!plan.sale && <span> - {plan.fees}% sale fees</span>}
        {plan.sale && (
          <span>
            <b className={styles.crossed}>{plan.sale}</b>
            <br /> {plan.fees}% sale fees
          </span>
        )}
      </div>
    </div>
  );
}

export default function PlansListResponsive({
  plan,
  subscribedPlan,
  handleOpenSubscribeModal,
  handleOpenModal,
  expanded,
  isSelected,
  isError,
  handleOpenPanel,
  user,
  load,
  isArtist,
  features,
  position,
  isSignUp,
  activePosition,
  signUpFinishCallback,
}) {
  const isExpanded = expanded === plan.name;

  return (
    <Accordion
      classes={{
        root: classNames('panel', {
          panel_selected: isSelected && isArtist,
          panel_error: isError,
        }),
        expanded: styles['panel--expanded'],
      }}
      expanded={isExpanded}
    >
      <AccordionSummary
        classes={{
          root: styles.header,
          content: styles['header-content'],
          expanded: styles['header--expanded'],
        }}
      >
        <PriceInfoExpanded isSignUp={isSignUp} plan={plan} />

        <button
          className={styles.button}
          type="button"
          onClick={handleOpenPanel(plan.name, !isExpanded)}
        >
          <Icon.ArrowDown
            width="22"
            className={classNames('dropdown_icon', { rotated: isExpanded })}
          />
        </button>
      </AccordionSummary>

      <AccordionDetails
        classes={{
          root: styles.content,
        }}
      >
        <PlansList
          isSignUp={isSignUp}
          load={load}
          plan={plan}
          features={features}
          user={user}
          key={plan.name}
          subscribedPlan={subscribedPlan}
          handleOpenSubscribeModal={handleOpenSubscribeModal}
          handleOpenModal={handleOpenModal}
          isArtist={isArtist}
          position={position}
          activePosition={activePosition}
          signUpFinishCallback={signUpFinishCallback}
        />
      </AccordionDetails>
    </Accordion>
  );
}
