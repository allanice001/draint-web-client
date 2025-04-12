import { Field, getFormValues, reduxForm, submit } from 'redux-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { DELETE_MODAL } from 'constants/components/modals';
import { FEEDBACK_DELETE_FORM } from 'constants/components/forms';
import DefaultModal from './basic-modal';
import Radio from 'components/reduxForm/radio/radio';
import { Reasons } from 'components/reasons/reasons';
import Textarea from 'components/reduxForm/textarea/textarea';
import { WARNING } from 'constants/components/message-statuses';
import { deleteUserAccount } from 'redux/dashboard/actions/settingsActions';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getFeedbackOptions } from 'redux/master/actions/feedbackActions';
import { required } from 'components/reduxForm/validators';
import staticUrls from 'constants/images/static-urls';
import styles from './delete-modal.module.scss';

const Preview = () => (
  <div className={styles.preview}>
    <div>
      <h1>{DELETE_MODAL.title}</h1>
      <p>{DELETE_MODAL.titleText}</p>
    </div>
    <img
      alt="You are about to delete your Draint profile"
      src={staticUrls.image.buildingProfile}
      title="You are about to delete your Draint profile"
    />
  </div>
);

const FirstStep = () => (
  <>
    <Preview />
    <Reasons
      title={DELETE_MODAL.reasonsTitle}
      subtitle={DELETE_MODAL.reasonsText}
    />
  </>
);

const SecondStep = reduxForm({ form: FEEDBACK_DELETE_FORM })(
  ({ options, handleSubmit, valid, setValidCheck, feedbackRequire }) => {
    const state = useSelector(store => store);
    const formValue = getFormValues(FEEDBACK_DELETE_FORM)(state);
    const isDisabled = formValue?.currentOption !== DELETE_MODAL.otherOption;

    useEffect(() => {
      setValidCheck(valid);
    }, [setValidCheck, valid]);

    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.title}>What is your reason for leaving?</div>
        <Field
          name="currentOption"
          component={Radio}
          validate={required}
          list={options.map(({ text }) => ({
            value: text,
            label: text,
          }))}
        />
        <Field
          name="feedback"
          component={Textarea}
          validate={feedbackRequire ? required : null}
          label="Please explain further"
          maxLength={1000}
          rows={2}
          disabled={isDisabled}
        />
      </form>
    );
  }
);

const AccountDeleteModal = ({
  isOpen,
  setOpen,
  isHavePaidOrders,
  isHaveVerifiedOrders,
}) => {
  const Analytic = AnalyticHelper.create();
  const dispatch = useDispatch();
  const { id, profile_id, is_artist: isArtist, subscription } = useSelector(
    store => store.user.account
  );
  const { options } = useSelector(store => store.master.feedback);
  const current = useSelector(
    store => store.form?.feedbackDeleteForm?.values?.currentOption
  );
  const [validCheck, setValidCheck] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    dispatch(getFeedbackOptions());
  }, [dispatch]);

  const onSubmit = ({ currentOption, feedback }) => {
    const values = {
      account_id: id,
      profile_id,
      feedback: `${currentOption}${feedback ? `: "${feedback}"` : ''}`,
    };
    Analytic.createEvent(
      isArtist ? 'AccountDeleted' : 'CollectorDeleteAccount'
    );
    dispatch(deleteUserAccount(values));
  };

  const onNext = () => {
    if (isHaveVerifiedOrders) {
      return dispatch(
        displayMessage(DELETE_MODAL.verifiedOrderMessage, WARNING)
      );
    }

    if (isHavePaidOrders) {
      return dispatch(displayMessage(DELETE_MODAL.paidOrderMessage, WARNING));
    }

    if (subscription) {
      return dispatch(
        displayMessage(DELETE_MODAL.activeSubscriptionMessage, WARNING)
      );
    }

    if (step !== 1) return setStep(step + 1);

    dispatch(submit('feedbackDeleteForm'));
  };

  const onBack = () => (step === 1 ? setStep(0) : setOpen());

  return (
    <DefaultModal
      isOpen={isOpen}
      title={
        step !== 1 ? DELETE_MODAL.titleStepZero : DELETE_MODAL.titleStepOne
      }
      handleClose={() => {
        setOpen();
        onBack();
      }}
      className={styles.wrapper}
      footerClassName={styles.footer__wrapper}
      footer={
        <div className={styles.footer}>
          <button
            type="button"
            onClick={onBack}
            className={`primary-button ${styles.button}`}
          >
            {step !== 1 ? DELETE_MODAL.keepProfileButton : DELETE_MODAL.back}
          </button>
          <button
            type="button"
            onClick={onNext}
            className={`secondary-button ${styles.button} ${styles.button__right}`}
            disabled={step === 1 && !validCheck}
          >
            {step !== 1
              ? DELETE_MODAL.deleteAnywayButton
              : DELETE_MODAL.completeDeletionButton}
          </button>
        </div>
      }
    >
      <div className={styles.wrapper}>
        {step === 0 && <FirstStep />}
        {step === 1 && (
          <SecondStep
            options={options}
            onSubmit={onSubmit}
            setValidCheck={setValidCheck}
            feedbackRequire={current === DELETE_MODAL.otherOption}
          />
        )}
      </div>
    </DefaultModal>
  );
};

export default AccountDeleteModal;
