import { func, number, string } from 'prop-types';

import React from 'react';
import classnames from 'classnames';
import styles from './signup-stepper.module.scss';

const StepIcon = ({
  icon: Icon,
  label,
  activeStep,
  step,
  stepsTotal,
  onClick,
}) => {
  const isFinish = step === stepsTotal && activeStep === stepsTotal - 1;
  const active = step <= activeStep;
  const last = step === stepsTotal;
  const iconClass = classnames(
    styles.step__icon,
    active && styles.active,
    isFinish && styles.finish
  );
  const labelClass = classnames(styles.step__label, active && styles.active);
  const dotsClass = classnames(styles.step__dots, active && styles.active);

  return (
    <>
      <div className={styles.step} onClick={onClick}>
        <div className={iconClass}>
          <Icon fill={(active || isFinish) && '#fff'} />
        </div>
        <div className={labelClass}>{label}</div>
      </div>
      {!last && (
        <>
          <div className={dotsClass}>
            <div />
            <div />
            <div />
          </div>
        </>
      )}
    </>
  );
};

StepIcon.propTypes = {
  activeStep: number.isRequired,
  icon: func.isRequired,
  label: string.isRequired,
  onClick: func.isRequired,
  step: number.isRequired,
  stepsTotal: number.isRequired,
};

export default StepIcon;
