import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icons from 'components/icons';
import { Spinner } from 'components/lib';
import Textarea from 'components/reduxForm/textarea/textarea';
import { createFeedback } from 'redux/master/actions/feedbackActions';
import staticUrls from 'constants/images/static-urls';
import styles from './feedback-page.module.scss';
import { useHistory } from 'react-router';

export const getTypeByPath = pathname => {
  const array = pathname.split('/');
  if (pathname === '/') return 'on_home_page';
  if (array.includes('artist')) return 'on_artist_page';
  if (array.includes('artwork')) return 'on_artworks_page';
  if (array.includes('feedback')) return 'on_feedback_page';
  if (array.includes('dashboard')) return `on_dashboard_${array.pop()}_page`;
  return `on_${array.pop()}_page`;
};

export const FeedbackEmojiMark = ({ current, setMark }) => {
  const emojis = [
    { Icon: props => <Icons.Emoji1 {...props} />, mark: 1 },
    { Icon: props => <Icons.Emoji2 {...props} />, mark: 2 },
    { Icon: props => <Icons.Emoji3 {...props} />, mark: 3 },
    { Icon: props => <Icons.Emoji4 {...props} />, mark: 4 },
    { Icon: props => <Icons.Emoji5 {...props} />, mark: 5 },
  ];
  return (
    <div className={styles.emoji_wrapper}>
      <h2 className={styles.emoji_title}>Describe your experience on Draint</h2>
      <div className={styles.emoji_list}>
        {emojis.map(({ Icon, mark }) => (
          <div onClick={() => setMark(mark)}>
            <Icon className={styles.emoji} active={current === mark} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const FeedbackForm = ({ text, setText }) => (
  <div className={styles.form}>
    <h2 className={styles.title}>Your ideas for improvements</h2>
    <Textarea
      value={text}
      placeholder="Place for your feedback..."
      maxLength={1000}
      rows={4}
      onChange={e => setText(e.target.value)}
    />
  </div>
);

export const FeedbackFooter = ({ onSubmit, disabled }) => (
  <div className={styles.footer}>
    <button
      type="button"
      className="primary-button"
      onClick={onSubmit}
      disabled={disabled}
    >
      Send feedback
    </button>
  </div>
);

const FeedbackPage = () => {
  const [mark, setMark] = useState(null);
  const [text, setText] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(store => store.user.account);
  const { id: account_id, loading } = user;

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
    setMark('');
    setText('');
  };

  if (loading) return <Spinner full />;

  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.header}>
          <div className={styles.title}>Your Feedback helps us to improve.</div>
          <div className={styles.subtitle}>
            Tell us more about your experience on Draint.
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.body__col}>
            <FeedbackEmojiMark current={mark} setMark={setMark} />
            <FeedbackForm text={text} setText={setText} />
          </div>
          <div className={`${styles.body__col} ${styles.image}`}>
            <img
              alt="Your Feedback helps us to improve"
              src={staticUrls.image.rating}
              title="Your Feedback helps us to improve"
            />
          </div>
        </div>
        <div className={styles.footer__wrapper}>
          <FeedbackFooter
            onSubmit={handleCreateFeedback}
            disabled={!mark || !text}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
