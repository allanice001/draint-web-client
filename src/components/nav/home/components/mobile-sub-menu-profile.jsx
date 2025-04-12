import {
  artistDashboardLinks,
  collectorDashboardLinks,
} from 'constants/components/navbar/links';
import { bool, func } from 'prop-types';

import { Link } from 'react-router-dom';
import React from 'react';
import styles from './mobile-sub-menu-profile.module.scss';
import { useSwipeable } from 'react-swipeable';

function MobileProfileSubMenu({ isArtist, open, setOpen }) {
  const links = isArtist ? artistDashboardLinks : collectorDashboardLinks;
  const config = {
    delta: 10,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
  };

  const handlers = useSwipeable({
    onSwipedDown: eventData => {
      setOpen(false);
    },
    onSwipedUp: eventData => {},
    ...config,
  });
  return (
    <div>
      <div {...handlers}>
        <div
          className={`${styles.backdrop} ${open && styles.open}`}
          onClick={setOpen}
        />
        <div className={`${styles.wrapper} ${open && styles.open}`}>
          {links.map(({ to, label, Icon }, key) => (
            <Link key={key} to={to} className={styles.link} onClick={setOpen}>
              <Icon className={styles.icon} /> {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

MobileProfileSubMenu.propTypes = {
  isArtist: bool.isRequired,
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default MobileProfileSubMenu;
