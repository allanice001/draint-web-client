import React, { useCallback, useEffect, useState } from 'react';
import { arrayOf, elementType, func, shape, string } from 'prop-types';

import Icons from '../../icons';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './mobile-profile-navigation.module.scss';
import { updateClassList } from '../../../helpers/utils';
import { useLocation } from 'react-router';

const List = props => {
  const { nav, isOpen, activeLink } = props;
  const location = useLocation();

  return (
    <ul className={cx(styles.nav, { [styles.show]: isOpen })}>
      {nav.map((link, index) => {
        const { to, Icon, label, onClick, children } = link;

        return (
          <li key={index}>
            <Link
              to={to}
              className={cx(styles.item, {
                [styles.active]: activeLink === link,
              })}
              onClick={onClick ? onClick : () => {}}
            >
              <Icon className={styles.icon} width="18" height="18" /> {label}
            </Link>

            {children && (
              <ul className={cx(styles.nav, styles.inner)}>
                {children &&
                  children.map((link, index) => {
                    const { to, Icon, label, onClick } = link;

                    return (
                      <li key={index}>
                        <Link
                          to={to}
                          className={cx(styles.item, {
                            [styles.active]: to === location.pathname,
                          })}
                          onClick={onClick ? onClick : () => {}}
                        >
                          <Icon
                            className={styles.icon}
                            width="18"
                            height="18"
                          />{' '}
                          {label}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const CurrentLink = props => {
  const { Icon, label, onClick } = props;

  return (
    <span
      className={cx(styles.item, styles.active, styles.preview)}
      onClick={onClick}
    >
      <Icon className={cx(styles.icon)} width="18" height="18" />
      {label}
      <Icons.ArrowList className={cx(styles.arrow)} />
    </span>
  );
};

function MobileProfileNavigation(props) {
  const { nav } = props;
  const [activeLink, setActiveLink] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    const findActiveLink = (nav, pathname) =>
      nav.find(
        link =>
          link.to === pathname ||
          (link.children && findActiveLink(link.children, pathname))
      );
    const link = findActiveLink(nav, pathname);

    setActiveLink(link);
  }, [location, nav]);

  useEffect(() => {
    const action = isMenuOpen ? 'add' : 'remove';

    updateClassList(action, {
      el: document.body,
      className: 'disable-scroll',
    });
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onResize = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      updateClassList('remove', {
        el: document.body,
        className: 'disable-scroll',
      });
    };
  }, []);

  const onClick = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  return (
    <>
      <div className={cx(styles.wrapper)}>
        <div className={cx('container')}>
          {!!activeLink && (
            <CurrentLink
              label={activeLink.label}
              Icon={activeLink.Icon}
              onClick={onClick}
            />
          )}

          <List nav={nav} isOpen={isMenuOpen} activeLink={activeLink} />
        </div>
      </div>
      <div
        className={cx(styles.backdrop, { [styles.show]: isMenuOpen })}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  );
}

MobileProfileNavigation.propTypes = {
  nav: arrayOf(
    shape({
      to: string.isRequired,
      label: string.isRequired,
      Icon: elementType.isRequired,
      onClick: func,
    })
  ),
};

export default MobileProfileNavigation;
