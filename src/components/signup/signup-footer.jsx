import { bool, func } from 'prop-types';
import React from 'react';
import classnames from 'classnames/bind';
import styles from './signup-footer.module.scss';
const classNames = classnames.bind(styles);

const SignUpFooter = ({ isLastStep, onClick, onDisabled }) => {
  const buttonClass = classNames('primary-button', styles.button, {
    finish: isLastStep,
  });

  return (
    <div className={styles.button__wrapper}>
      <button
        className={buttonClass}
        disabled={onDisabled()}
        onClick={onClick}
        type="button"
      >
        {isLastStep ? 'SignUp' : 'Next'}
      </button>
    </div>
  );
};

SignUpFooter.propTypes = {
  isArtist: bool.isRequired,
  isLastStep: bool.isRequired,
  onClick: func.isRequired,
  onDisabled: func.isRequired,
};

export default SignUpFooter;
