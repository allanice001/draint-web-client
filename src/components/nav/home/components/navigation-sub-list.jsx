import React, { useRef } from 'react';
import { bool, func, number } from 'prop-types';
import { navButtons, navMap } from 'constants/components/navbar/nav.helper';
import Icons from 'components/icons';
import { Link } from 'react-router-dom';
import { ProfileDropDown } from './profile-drop-down';
import { SIGN_UP_COLLECTOR } from 'constants/singin-up';
import SubMenu from './sub-menu';
import cx from 'classnames';
import { getTablet } from 'services/getTablet';
import styles from 'components/nav/home/main-navbar.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';

function SubNavigationList({
  isLogged,
  isArtist,
  isActivated,
  isLoading,
  cartCounter,
  logout,
  setFeedback,
}) {
  const linksRef = useRef();
  useCollectorTheme(linksRef);

  const isTablet = getTablet();

  if (isLoading) return null;

  const { profileButton, signInButton, signUpButton } = navButtons;

  const list = isLogged
    ? [
        profileButton(isArtist, isActivated, isTablet),
        navMap.cart(!cartCounter),
        navMap.support,
      ]
    : [
        signInButton,
        cartCounter
          ? { ...signUpButton, url: SIGN_UP_COLLECTOR }
          : signUpButton,
        navMap.cart(!cartCounter),
      ];

  return (
    <ul className={cx(styles.navigation, styles.subnavigation)} ref={linksRef}>
      {list.map(
        (
          { label, url, Icon, key, button, primary, subMenu, dropdownMenu },
          i
        ) => {
          const buttonClasses = cx({
            [styles.button]: button,
            'primary-button': primary,
            'secondary-button': !Icon && !primary,
          });

          return (
            <li
              key={i}
              className={cx(styles.list__item, {
                [styles.carticon]: key === 'cart',
              })}
            >
              {label === 'Support' ? (
                <button
                  type="button"
                  className={buttonClasses}
                  onClick={() => setFeedback()}
                >
                  {!!Icon && <Icon className={styles.icon} />}
                  {!Icon && label}
                </button>
              ) : !!dropdownMenu ? (
                <ProfileDropDown isArtist={isArtist} dropdown={dropdownMenu} />
              ) : (
                <Link to={url} className={buttonClasses}>
                  {!!Icon && <Icon className={styles.icon} />}
                  {!Icon && label}
                </Link>
              )}

              {!!subMenu && (
                <SubMenu className={styles.submenu}>
                  {subMenu({ logout, isArtist })}
                </SubMenu>
              )}

              {!!subMenu && (
                <button type="button" className={styles.extend}>
                  <Icons.PlusSmall />
                </button>
              )}

              {cartCounter > 0 && key === 'cart' && (
                <div className={styles.icon__counter}>{cartCounter}</div>
              )}
            </li>
          );
        }
      )}
    </ul>
  );
}

SubNavigationList.defaultProps = {
  isLoading: false,
};

SubNavigationList.propTypes = {
  isLogged: bool.isRequired,
  isLoading: bool.isRequired,
  cartCounter: number.isRequired,
  logout: func.isRequired,
  setFeedback: func.isRequired,
};

export default SubNavigationList;
