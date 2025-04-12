import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../wrapped-steps.module.scss';

function ArrowIcon({ isExpanded }) {
  const expandedArrow = classNames(`${styles.arrow}`, {
    [`${styles.arrow__expanded}`]: isExpanded,
  });

  return (
    <ExpandMoreIcon
      classes={{
        root: expandedArrow,
      }}
    />
  );
}

ArrowIcon.prototype = {
  isExpanded: PropTypes.bool.isRequired,
};

export { ArrowIcon };
