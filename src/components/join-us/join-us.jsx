import {
  ARTIST_BUTTON,
  ARTIST_TITLE,
} from 'constants/components/join-us/collector- features';
import { ARTIST_SIGN_UP } from 'constants/links';
import JoinUsButton from './join-us-button';
import React from 'react';
import classNames from 'classnames';
import staticUrls from 'constants/images/static-urls';
import styles from './join-us.module.scss';
import { useJoinUs } from 'hooks/use-join-us';

function JoinUs() {
  const { email, isArtist } = useJoinUs();

  return (
    <section>
      <div className={`${styles.container} container`}>
        <h3 className="group-title">{ARTIST_TITLE}</h3>
        {!Boolean(isArtist) && (
          <JoinUsButton
            name={ARTIST_BUTTON}
            url={ARTIST_SIGN_UP}
            logout={Boolean(email)}
          />
        )}
        <div
          className={classNames(styles.preview__wrapper, {
            [styles.preview__artist]: !isArtist,
          })}
        >
          <div className={styles.blur} />
          <img
            alt="Preview"
            className={styles.preview}
            src={staticUrls.svg.atelier}
          />
        </div>
      </div>
    </section>
  );
}

export { JoinUs };
