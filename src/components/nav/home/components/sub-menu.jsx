import React, { useRef } from 'react';
import { object, string } from 'prop-types';
import classnames from 'classnames';
import styles from './sub-menu.module.scss';
import { useCollectorTheme } from 'hooks/use-theme';

function SubMenu({ className, children }) {
  const wrapperClasses = classnames(styles.submenu__wrapper, className);

  const subRef = useRef();
  useCollectorTheme(subRef);

  return (
    <div className={wrapperClasses} ref={subRef}>
      <div className={styles.content}>
        <div className={`container ${styles.submenu}`}>{children}</div>
      </div>
    </div>
  );
}

SubMenu.propTypes = {
  className: string.isRequired,
  children: object.isRequired,
};

export default SubMenu;
