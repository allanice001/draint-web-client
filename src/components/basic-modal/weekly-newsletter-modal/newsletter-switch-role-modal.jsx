import * as Button from 'components/shared/button';
import { getFormValues, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import BasicModal from 'components/basic-modal/basic-modal';
import { NEWSLETTER_SWITCH_ROLE_MODAL } from 'constants/components/modals';
import React from 'react';
import styles from './newsleter-switch-role-modal.module.scss';
import switchToCollectorAddToSubscriptions from 'redux/user/account/thunks/switch-to-collector-add-to-subscriptions';
import { useHistory } from 'react-router';

const NewsletterSwitchRoleModal = props => {
  const { form, isOpen, handleClose } = props;
  const dispatch = useDispatch();
  const state = useSelector(store => store);
  const value = getFormValues(form)(state);
  const account = state.user.account;
  const history = useHistory();

  const handleClick = () => {
    dispatch(
      switchToCollectorAddToSubscriptions(account, value.email, history)
    );
    reset(form);
  };

  return (
    <BasicModal
      isOpen={isOpen}
      handleClose={handleClose}
      maxWidth="sm"
      footerClassName={styles.footer_wrapper}
      footer={
        <Button.Primary
          className={styles.button}
          disabled={false}
          onClick={handleClick}
        >
          {NEWSLETTER_SWITCH_ROLE_MODAL.buttonName}
        </Button.Primary>
      }
    >
      <div className={styles.content_wrapper}>
        <span className={styles.content_text}>
          {NEWSLETTER_SWITCH_ROLE_MODAL.content}
        </span>
      </div>
    </BasicModal>
  );
};

export default NewsletterSwitchRoleModal;
