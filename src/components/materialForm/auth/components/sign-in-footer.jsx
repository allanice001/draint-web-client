import { Link } from 'react-router-dom';
import React from 'react';
import { string } from 'prop-types';
import styles from '../auth.module.scss';

const FooterComponent = function({ parameter = '' }) {
  return (
    <div className={styles.footer}>
      <span>
        <Link alt="forgot password" to="/forgotpassword">
          Forgot your password?
        </Link>
      </span>
      <span>
        Don&apos;t have an account?
        <Link
          className={styles.middle_link}
          to={`/signup${parameter.length ? `?${parameter}` : ''}`}
        >
          Sign Up
        </Link>
      </span>
    </div>
  );
};

FooterComponent.propTypes = {
  parameter: string,
};

export default FooterComponent;
