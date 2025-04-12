import { any, arrayOf, func, number, objectOf } from 'prop-types';
import React from 'react';
import StepIcon from './signup-stepper-icon';
import styles from './signup-stepper.module.scss';

const SignUpStepper = ({ steps, activeStep, onClick }) => {
  const handleNextStep = index => () => {
    if (index === steps.length - 1) onClick();
  };

  return (
    <>
      <div className={styles.stepper__wrapper}>
        <div className={styles.stepper}>
          {steps.map((step, index) => (
            <StepIcon
              key={index}
              activeStep={activeStep}
              icon={step.icon}
              label={step.label}
              onClick={handleNextStep(index)}
              step={index}
              stepsTotal={steps.length - 1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

SignUpStepper.propTypes = {
  activeStep: number.isRequired,
  onClick: func.isRequired,
  steps: arrayOf(objectOf(any)).isRequired,
};

export default SignUpStepper;
