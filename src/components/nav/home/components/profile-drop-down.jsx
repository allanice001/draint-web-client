import React, { useRef } from 'react';
import ArrowIcon from 'components/icons/dropdown-arrow';
import BasicDropDown from 'components/shared/basic-dropdown/basic-dropdown';
import { COLLECTOR_DASHBOARD_ARTWORKS } from 'constants/routes/collector-profile';
import { Image } from 'components/lib';
import { Link } from 'react-router-dom';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import { getTablet } from 'services/getTablet';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from 'components/nav/home/main-navbar.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';
import { useSelector } from 'react-redux';

export function ProfileDropDown({ dropdown, isArtist }) {
  const isTablet = getTablet();

  const avatar = useSelector(state => {
    const { avatar, theme } = state.user.account;
    return avatar || theme;
  });

  const handleClick = e => isTablet && e.preventDefault();

  const avatarPreview = avatar ? (
    <Image
      className={styles.img}
      srcSet={avatar}
      sizes={imageSizes.SM}
      width={36}
      height={36}
      alt={''}
    />
  ) : (
    <span className={styles.img} />
  );

  const buttonBGRef = useRef();
  useCollectorTheme(buttonBGRef);

  return (
    <BasicDropDown content={dropdown} useClick={isTablet}>
      <Link
        onClick={handleClick}
        ref={buttonBGRef}
        className={styles.profileDropdown}
        to={isArtist ? PROFILE_GALLERY : COLLECTOR_DASHBOARD_ARTWORKS}
      >
        {avatarPreview}
        <span>My Profile</span>
        <ArrowIcon />
      </Link>
    </BasicDropDown>
  );
}
