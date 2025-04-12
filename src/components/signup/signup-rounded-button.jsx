import Icons from 'components/icons';
import React from 'react';
import styles from './signup-rounded-button.module.scss';
import { withRouter } from 'react-router';

const SignUpRoundedButton = ({ history }) => (
  <button
    className={styles.button}
    type="button"
    onClick={() => history.push('/signup')}
  >
    <Icons.ProfileInfo className={styles.icon} />
  </button>
);

export default withRouter(SignUpRoundedButton);
