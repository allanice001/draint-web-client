import {
  FeedbackEmojiMark,
  FeedbackFooter,
  FeedbackForm,
  getTypeByPath,
} from 'components/feedback/feedback-page';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DefaultModal from './basic-modal';
import { createFeedback } from 'redux/master/actions/feedbackActions';
import { setFeedbackModal } from 'redux/global/notiifcation/actions/actions';
import styles from './welcome-modal.module.scss';
import { useHistory } from 'react-router';

const FeedbackModal = () => {
  const [mark, setMark] = useState(null);
  const [text, setText] = useState(null);
  const dispatch = useDispatch();
  const feedbackModal = useSelector(state => state.notification.feedbackModal);
  const history = useHistory();
  const account_id = useSelector(store => store.user.account.id);

  const openFeedbackModal = () => {
    dispatch(setFeedbackModal());
    setText(null);
    setMark(null);
  };

  const handleCreateFeedback = () => {
    const { pathname } = history.location;
    dispatch(
      createFeedback({
        type: getTypeByPath(pathname),
        message: text,
        account_id,
        mark,
      })
    );
    openFeedbackModal();
  };
  return (
    <DefaultModal
      isOpen={feedbackModal}
      title="Your Feedback helps us to improve."
      handleClose={openFeedbackModal}
      className={styles.wrapper}
      customWidth={styles.maxWidth}
      footer={
        <FeedbackFooter
          onSubmit={handleCreateFeedback}
          disabled={!mark || !text}
        />
      }
    >
      <div className={styles.wrapper}>
        <div>
          <FeedbackEmojiMark current={mark} setMark={setMark} />
          <FeedbackForm text={text} setText={setText} />
        </div>
      </div>
    </DefaultModal>
  );
};

export default FeedbackModal;
