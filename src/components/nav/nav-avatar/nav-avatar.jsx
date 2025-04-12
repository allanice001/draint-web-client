import { GUEST_USER, LOGIN, LOGOUT } from 'constants/components/main-navbar';
import { LOGOUT_ROOT, SIGN_IN_ROOT } from 'constants/routes/publicModule/auth';
import React, { useRef } from 'react';
import { Link } from 'components/lib';
import { imageSizes } from 'constants/media-query/image-sizes';
import staticUrls from 'constants/images/static-urls';
import styles from './nav-avatar.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';

function NavAvatar({ src, name, className, onLogout, setIsOpened }) {
  const logOutRef = useRef();
  useCollectorTheme(logOutRef);

  return (
    <div className={`${styles.avatar} ${className}`} ref={logOutRef}>
      <div className={styles.avatar__imgage_menu}>
        {/* do not change the alt param of the image on the next line */}
        <img
          alt=""
          height={60}
          srcSet={src || staticUrls.image.defaultArtist}
          sizes={imageSizes.SM}
          width={60}
        />
        <div className={styles.avatar__shadow} />
      </div>

      <div className={styles.avatar__content}>
        <span className={styles.avatar__name}>{name || GUEST_USER}</span>

        {name && (
          <Link
            url={LOGOUT_ROOT}
            className={styles.avatar__link}
            onClick={onLogout}
          >
            {LOGOUT}
          </Link>
        )}

        {!name && (
          <span className="d-flex">
            <Link
              className={styles.avatar__link}
              url={SIGN_IN_ROOT}
              onClick={() => setIsOpened(false)}
            >
              {LOGIN}
            </Link>
          </span>
        )}
      </div>
    </div>
  );
}

export default NavAvatar;
