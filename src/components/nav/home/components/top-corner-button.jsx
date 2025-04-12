import React, { useRef } from 'react';
import { bool, func, number, shape, string } from 'prop-types';
import Icons from 'components/icons';
import { Link } from 'react-router-dom';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import { SHOPPING_CART_ROOT } from 'constants/routes/publicModule/financials';
import { SIGN_UP_ROOT } from 'constants/routes/publicModule/auth';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from '../main-navbar.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';

function TopCornerButton({
  loading,
  user,
  onDownload,
  isActivated,
  isDeleted,
}) {
  const topCornerRef = useRef();
  useCollectorTheme(topCornerRef);

  if (loading) return <div className={styles.cart} />;

  if (!user.token && !user.cartCounter) {
    return (
      <Link className={styles.cart} to={SIGN_UP_ROOT}>
        <Icons.ProfileInfo />
      </Link>
    );
  }

  const isVisible = isActivated && !isDeleted && user?.avatar;

  if (user.token && user.is_artist) {
    return (
      <>
        {isVisible && (
          <button
            type="button"
            className={styles.download}
            onClick={onDownload}
          >
            <Icons.Download width="11" height="11" />
          </button>
        )}
        <Link className={styles.cart} to={PROFILE_GALLERY}>
          {!user.theme ? (
            <Icons.ProfileInfo />
          ) : (
            <img
              alt={user.name}
              srcSet={user.avatar || user.theme}
              sizes={imageSizes.SM}
              title={user.name}
            />
          )}
        </Link>
      </>
    );
  }

  return (
    <Link className={styles.cart} to={SHOPPING_CART_ROOT} ref={topCornerRef}>
      <Icons.Cart />
      {!!user.cartCounter && (
        <div className={`${styles.icon__counter} ${styles.mobile}`}>
          {user.cartCounter}
        </div>
      )}
    </Link>
  );
}

TopCornerButton.defaultProps = {
  loading: false,
  onClick: () => {},
};

TopCornerButton.propTypes = {
  loading: bool.isRequired,
  user: shape({
    token: string,
    theme: string,
    cartCounter: number,
    is_artist: bool,
  }).isRequired,
  onClick: func.isRequired,
};

export default TopCornerButton;
