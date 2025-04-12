import React from 'react';
import { SUBSCRIPTIONS } from 'constants/singin-up';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import { TEST } from 'constants/components/pricing';
import {
  ACCOUNT,
  COLLECTORS,
  CREATE_BTN,
  FOOTER_TITLE,
  SIGN_AS,
} from 'constants/components/checkout-login-modal/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import getUserDataAtSingIn from 'redux/user/account/actions/getUserDataAtSingIn';
import BasicModal from 'components/basic-modal/basic-modal';
import SignInForm from 'components/reduxForm/signIn/signIn-form';
import cx from 'classnames';
import styles from './checkout-login-modal.module.scss';

const CheckoutLogInModal = ({
  handleClose,
  open,
  handleProceedWithoutAccount,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(store => store);
  const { fetching } = state.user.query;

  const handleSignInSubmit = async values => {
    const userData = await dispatch(getUserDataAtSingIn(values));
    const { account } = userData;

    if (account.is_artist) {
      return history.push(
        account.planName === TEST ? SUBSCRIPTIONS : PROFILE_GALLERY
      );
    }
  };

  function title() {
    return (
      <span>
        {SIGN_AS} <span className={styles.blue}>{COLLECTORS}</span>
        {ACCOUNT}
      </span>
    );
  }

  return (
    <BasicModal
      isOpen={open}
      handleClose={handleClose}
      title={title()}
      maxWidth="xs"
      footerClassName={styles.footer_wrapper}
      titleCenter={styles.title_wrapper}
      footer={
        <div className={styles.footer_content}>
          <span className={styles.footer_title}>{FOOTER_TITLE}</span>
          <button
            className={cx('primary-button', styles.create_btn)}
            onClick={handleProceedWithoutAccount}
            disabled={fetching}
          >
            {CREATE_BTN}
          </button>
        </div>
      }
    >
      <div className={styles.content_wrapper}>
        <SignInForm onSubmit={handleSignInSubmit} fetching={fetching} />
      </div>
    </BasicModal>
  );
};

export default CheckoutLogInModal;
