import {
  ARTIST,
  COLLECTOR,
  SIGN_IN_ROOT,
  SIGN_UP_ROOT,
} from 'constants/routes/publicModule/auth';
import {
  ARTIST_DESCRIPTION,
  BUTTON_NAME,
  COLLECTOR_DESCRIPTION,
  I_AM_ARTIST,
  I_AM_COLLECTOR,
} from 'constants/components/auth/sign-up';
import React from 'react';
import cx from 'classnames';
import setArtistFlag from 'redux/user/account/actions/setArtistFlag';
import staticUrls from 'constants/images/static-urls';
import styles from './signup-select-component.module.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

export function CollectorArtistSelector({ selector, completeSignUp }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleArtistSignUp() {
    dispatch(setArtistFlag(true));

    if (selector) {
      return completeSignUp(true);
    }

    history.push(SIGN_UP_ROOT + ARTIST);
  }

  function handleCollectorSignUp() {
    dispatch(setArtistFlag(false));

    if (selector) {
      return completeSignUp(false);
    }

    history.push(SIGN_UP_ROOT + COLLECTOR);
  }

  return (
    <div
      className={cx(styles.auth_form_switcher, {
        [styles._selector_form]: selector,
      })}
    >
      <div className={styles.switcher_block}>
        <div className={styles.switcher_item} onClick={handleCollectorSignUp}>
          <div className={styles.img_wrapper}>
            <img src={staticUrls.image.collector} alt="collector" />
          </div>
          <div>
            <div className={styles.switcher_header}>{I_AM_COLLECTOR}</div>
            <div className={styles.switcher_description}>
              {COLLECTOR_DESCRIPTION}
            </div>
          </div>
        </div>
        <div className={styles.switcher_item} onClick={handleArtistSignUp}>
          <div className={styles.img_wrapper}>
            <img src={staticUrls.image.artist} alt="artist" />
          </div>
          <div>
            <div className={styles.switcher_header}>{I_AM_ARTIST}</div>
            <div className={styles.switcher_description}>
              {ARTIST_DESCRIPTION}
            </div>
          </div>
        </div>
      </div>
      {!selector && (
        <div className={styles.footer_item}>
          <p>Already registered?</p>
          <button
            type="button"
            className={cx('secondary-button', styles.footer_btn)}
            onClick={() => history.push(SIGN_IN_ROOT)}
          >
            {BUTTON_NAME}
          </button>
        </div>
      )}
    </div>
  );
}
