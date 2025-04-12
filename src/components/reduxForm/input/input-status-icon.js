import Icons from 'components/icons';
import React from 'react';
import { bool } from 'prop-types';
import classnames from 'classnames';
import styles from './input-status-icon.module.scss';

function IconsHandler({ isShow = false, error = false }) {
  const classNames = classnames(styles.check_icon, styles.error);
  if (isShow && !error)
    return <Icons.CheckCircleGreen className={styles.check_icon} />;
  if (isShow && error) return <Icons.CircleCross className={classNames} />;
  return null;
}

IconsHandler.defaultProps = {
  isLoading: false,
  isShow: false,
  error: false,
};

IconsHandler.propTypes = {
  isLoading: bool,
  isShow: bool,
  error: bool,
};

export default IconsHandler;
