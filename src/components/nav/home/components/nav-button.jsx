import { any, arrayOf, bool, func, string } from 'prop-types';

import Icons from 'components/icons';
import { Link } from 'react-router-dom';
import React from 'react';
import classnames from 'classnames';
import styles from './sub-menu.module.scss';

function NavButton({
  handleSearch,
  type,
  label,
  isLast,
  search,
  setActiveTab,
  isNoPlus,
  to,
  Icon,
  setIsOpened,
}) {
  const onClick = () => {
    handleSearch({ type, search });
    setIsOpened && setIsOpened(false);
  };
  const buttonClasses = classnames(styles.item, { [styles.last]: isLast });
  const icon = !!Icon && (
    <Icon className={styles.navIcon} width={24} height={24} />
  );

  if (to) {
    return (
      <div className={styles.item__wrapper}>
        <Link
          to={to}
          className={buttonClasses}
          onClick={() => setIsOpened(false)}
        >
          {icon}
          {label}
        </Link>

        {isLast && !isNoPlus && (
          <button
            type="button"
            className={styles.extend}
            onClick={setActiveTab}
          >
            <Icons.PlusSmall />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.item__wrapper}>
      <button type="button" onClick={onClick} className={buttonClasses}>
        {icon}
        {label}
      </button>

      {isLast && !isNoPlus && (
        <button type="button" className={styles.extend} onClick={setActiveTab}>
          <Icons.PlusSmall />
        </button>
      )}
    </div>
  );
}

NavButton.defaultProps = {
  handleSearch: () => {},
  type: '',
  search: [],
};

NavButton.propTypes = {
  handleSearch: func.isRequired,
  type: string.isRequired,
  label: string.isRequired,
  isLast: bool.isRequired,
  search: arrayOf(any).isRequired,
  setActiveTab: func,
  isNoPlus: bool.isRequired,
  to: string,
};

export default NavButton;
