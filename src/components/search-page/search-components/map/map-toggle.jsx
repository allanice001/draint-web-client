import Icons from '../../../icons';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from './map-toggle.module.scss';

const MapToggle = function({ open, onToggle }) {
  const buttonClasses = classnames(styles.map__button, { [styles.open]: open });

  return (
    <div className={styles.mapToggle}>
      <button className={buttonClasses} onClick={onToggle} type="button">
        <Icons.Map className={classnames(styles.icon, styles.map__icon)} />
        Show map
        <Icons.DropdownArrow className={`${styles.icon} ${styles.arrow}`} />
      </button>
    </div>
  );
};

MapToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default MapToggle;
