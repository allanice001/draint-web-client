import { LOGIN, SIGN_UP } from 'constants/components/main-navbar';
import { SIGN_IN_ROOT, SIGN_UP_ROOT } from 'constants/routes/publicModule/auth';
import { Link } from 'react-router-dom';
import React from 'react';
import { bool } from 'prop-types';
import classnames from 'classnames';
import styles from './sign-in-block.module.scss';

function SignInBlock({ isLogged, setIsOpened }) {
  const logInClasses = classnames(styles.link, 'secondary-button');
  const SignUpClasses = classnames(styles.link, 'primary-button');

  if (isLogged) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Link
        className={logInClasses}
        to={SIGN_IN_ROOT}
        onClick={() => setIsOpened(false)}
      >
        {LOGIN}
      </Link>

      <Link
        className={SignUpClasses}
        to={SIGN_UP_ROOT}
        onClick={() => setIsOpened(false)}
      >
        {SIGN_UP}
      </Link>
    </div>
  );
}

SignInBlock.propTypes = {
  isLogged: bool.isRequired,
};

export default SignInBlock;
