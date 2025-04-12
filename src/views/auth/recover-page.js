import {
  COLLECTOR_ARTWORKS_DASHBOARD,
  SUBSCRIPTIONS_DASHBOARD,
} from 'constants/routes/userModule/dashboard';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import deleteUserData from 'redux/user/account/actions/deleteUserData';
import { recoverAccount } from 'redux/dashboard/actions/settingsActions';
import staticUrls from 'constants/images/static-urls';
import styles from './recover-page.module.scss';

const RecoverPage = () => {
  const dispatch = useDispatch();
  const { id, deleted_at, is_artist, profile_id } = useSelector(
    store => store.user.account
  );
  const [deadline, setDeadline] = useState(null);

  const handleLogout = () => {
    deleteUserData();
  };

  const handleRecoverAccount = () => {
    const url = is_artist
      ? SUBSCRIPTIONS_DASHBOARD
      : COLLECTOR_ARTWORKS_DASHBOARD;
    const callBack = () => window.location.replace(url);
    dispatch(
      recoverAccount({ account_id: id, profileId: profile_id }, callBack)
    );
  };

  const isBeforeDeadline = useCallback(() => {
    const today = Date.now();
    const deadline = Date.parse(new Date(deleted_at));
    return !(today > deadline);
  }, [deleted_at]);

  useEffect(() => {
    const canRecover = isBeforeDeadline();
    if (canRecover && deleted_at) {
      const date = new Date(deleted_at).toLocaleDateString();
      setDeadline(date);
    }
  }, [deleted_at, isBeforeDeadline]);

  const title = 'Welcome back!';
  const subtitle = 'Unfortunately, your account has been deleted.';
  const deadlineMessage = deadline
    ? `However, you can restore it before ${deadline}.`
    : '';

  return (
    <section className="container">
      <div className={styles.wrapper}>
        <div>
          <img
            alt={title}
            src={staticUrls.image.buildingProfile}
            title={title}
          />
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.subtitle}>{subtitle}</div>
          <div className={styles.subtitle}>{deadlineMessage}</div>
          <div className={styles.footer}>
            <button
              type="button"
              onClick={handleLogout}
              className={`secondary-button ${styles.button}`}
            >
              Logout
            </button>
            {deadline ? (
              <button
                type="button"
                onClick={handleRecoverAccount}
                className={`primary-button ${styles.button}`}
              >
                Recover account
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecoverPage;
