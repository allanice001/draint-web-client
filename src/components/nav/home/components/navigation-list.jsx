import React, { useCallback, useEffect, useRef, useState } from 'react';
import { bool, func } from 'prop-types';
import { ArtistCollectorButtons } from 'components/artist-collector-buttons/artist-collector-buttons';
import { Link } from 'react-router-dom';
import ListItem from './list-item';
import cx from 'classnames';
import { navMap } from 'constants/components/navbar/nav.helper';
import styles from '../main-navbar.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';
import { useLocation } from 'react-router';
import { useMediaQuery } from '@material-ui/core';

function NavigationList({
  isLogged,
  isArtist,
  isActivated,
  handleSearch,
  isDeleted,
  setIsOpened,
}) {
  const list = [navMap.artist, navMap.artwork, navMap.trade, navMap.pricing];
  const [activeSubMenu, setActiveSubMenu] = useState();
  const isDesktop = useMediaQuery('(min-width: 960px)');
  const location = useLocation();

  useEffect(() => {
    setActiveSubMenu(null);
  }, [location.pathname]);

  if (!isArtist) {
    list.push({ ...navMap.cart(), onlyMobile: true });
  }

  if (isArtist) {
    list.unshift(navMap.artistProfile);
  }

  if (!isArtist && isLogged) {
    list.unshift(navMap.collectorProfile);
  }

  if ((!isActivated && isArtist) || isDeleted) {
    list.shift(navMap.artistProfile);
  }

  if (!isArtist && isDeleted) {
    list.shift(navMap.collectorProfile);
  }

  const onMouseOverHandler = useCallback(
    key => {
      if (isDesktop) {
        setActiveSubMenu(key);
      }
    },
    [isDesktop]
  );

  const onMouseLeaveHandler = useCallback(() => {
    if (isDesktop) {
      setActiveSubMenu(null);
    }
  }, [isDesktop]);

  const navTitles = useRef();
  useCollectorTheme(navTitles);

  return (
    <>
      <ul ref={navTitles} className={styles.navigation}>
        <li className={`${styles.list__item} ${styles.onlymobile}`}>
          <Link
            to="/"
            className={styles.link}
            onClick={() => setIsOpened(false)}
          >
            Home
          </Link>
        </li>
        {list.map(({ url, label, key, subMenu, onlyMobile, Icon }) => (
          <li
            key={key}
            className={cx(styles.list__item, {
              [styles.onlymobile]: onlyMobile || false,
            })}
            onMouseOver={() => onMouseOverHandler(key)}
            onMouseLeave={onMouseLeaveHandler}
          >
            <ListItem
              url={url}
              label={label}
              icon={Icon}
              active={false}
              subMenu={subMenu}
              isArtist={isArtist}
              handleSearch={handleSearch}
              isSubMenuOpened={activeSubMenu === key}
              openSubMenu={() => {
                setActiveSubMenu(key);
              }}
              onBack={() => setActiveSubMenu('')}
              setIsOpened={setIsOpened}
            />
          </li>
        ))}
      </ul>
      <div className={styles.artist_collector_wrapper}>
        <ArtistCollectorButtons mobile setIsOpened={setIsOpened} />
      </div>
    </>
  );
}

NavigationList.propTypes = {
  onLogout: func.isRequired,
  isLogged: bool.isRequired,
  handleSearch: func.isRequired,
  onSearch: func.isRequired,
};

export default NavigationList;
