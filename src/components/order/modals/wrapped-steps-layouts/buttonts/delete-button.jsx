import PropTypes, { string } from 'prop-types';

import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import classNames from 'classnames';
import styles from '../../wrapped-steps.module.scss';

function DeleteButton({ onClick }) {
  const deleteButton = classNames(`${styles.button__delete}`);

  return (
    <button type="button" className={deleteButton} onClick={onClick}>
      <DeleteIcon
        className={styles.delete_icon}
        classes={{
          root: styles.delete_icon_root,
        }}
      />
    </button>
  );
}

DeleteButton.propTypes = {
  buttonStyle: string,
  onClick: PropTypes.func,
};

export { DeleteButton };
