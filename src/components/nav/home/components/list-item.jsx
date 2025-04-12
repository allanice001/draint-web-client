import { bool, func, string } from 'prop-types';

import Icons from 'components/icons';
import { Link } from 'react-router-dom';
import React from 'react';
import SubMenu from './sub-menu';
import classnames from 'classnames';
import styles from '../main-navbar.module.scss';

function ListItem({
  url,
  active,
  label,
  subMenu,
  isArtist,
  handleSearch,
  openSubMenu,
  isSubMenuOpened,
  onBack,
  setIsOpened,
}) {
  const linkClasses = classnames(styles.link, { [styles.active]: active });
  const subMenuClasses = classnames(styles.submenu, {
    [styles.opened]: isSubMenuOpened,
  });

  return (
    <>
      <Link to={url} className={linkClasses} onClick={() => setIsOpened(false)}>
        {label}
      </Link>

      {!!subMenu && (
        <SubMenu className={subMenuClasses}>
          {subMenu({ handleSearch, isArtist, onBack, setIsOpened })}
        </SubMenu>
      )}

      {!!subMenu && (
        <button type="button" className={styles.extend} onClick={openSubMenu}>
          <Icons.PlusSmall />
        </button>
      )}
    </>
  );
}

ListItem.propTypes = {
  url: string.isRequired,
  active: bool.isRequired,
  label: string.isRequired,
  subMenu: func,
  handleSearch: func.isRequired,
  openSubMenu: func.isRequired,
  isSubMenuOpened: bool.isRequired,
  onBack: func.isRequired,
};

export default ListItem;
