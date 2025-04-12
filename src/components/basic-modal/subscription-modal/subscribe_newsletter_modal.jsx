import * as Button from 'components/shared/button';
import {
  SUBSCRIBE_FORM,
  SUBSCRIBE_MODAL,
} from 'constants/components/subscribed-artist';
import { getFormSyncErrors, getFormValues } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import BasicModal from 'components/basic-modal/basic-modal';
import PersonalSubscribeForm from 'components/reduxForm/newsletter-subscribe/newsletter-subscribe-form';
import React from 'react';
import { createSubscriptions } from 'redux/artist/actions/artistProfileActions';
import { required } from 'components/reduxForm/validators';
import { reset } from 'redux-form';
import styles from './subscribe_newsletter_modal.module.scss';

function SubscribeNewsletterModal({
  isOpen,
  setOpenModal,
  artistName,
  artistId,
}) {
  const state = useSelector(store => store);
  const dispatch = useDispatch();
  const user = state?.user.account;
  const form = getFormValues(SUBSCRIBE_FORM.formName)(state);
  const formSyncErrors = getFormSyncErrors(SUBSCRIBE_FORM.formName)(state);
  const isDisabled = !!Object.keys(formSyncErrors).length;

  const handleClick = () => {
    setOpenModal(!isOpen);
    dispatch(reset(SUBSCRIBE_FORM.formName));
    dispatch(createSubscriptions(artistId, user.profile_id, form.email));
  };

  return (
    <BasicModal
      isOpen={isOpen}
      handleClose={() => setOpenModal(!isOpen)}
      maxWidth="sm"
      className={styles.content}
      footerClassName={styles.footer}
      title={SUBSCRIBE_MODAL.title}
      footer={
        <Button.Primary
          className={styles.button}
          onClick={handleClick}
          disabled={isDisabled}
        >
          {SUBSCRIBE_MODAL.buttonName}
        </Button.Primary>
      }
    >
      <div>
        <span>{`${SUBSCRIBE_MODAL.content} ${artistName}.`}</span>
        <div className={styles.email_wrapper}>
          <PersonalSubscribeForm
            validate={required}
            initialValues={{
              email: user.email,
            }}
          />
        </div>
      </div>
    </BasicModal>
  );
}

export default SubscribeNewsletterModal;
