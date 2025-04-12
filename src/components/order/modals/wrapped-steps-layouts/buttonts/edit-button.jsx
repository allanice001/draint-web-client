import PropTypes, { string } from 'prop-types';

import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import classNames from 'classnames';
import styles from '../../wrapped-steps.module.scss';

function EditButton({ onClick }) {
  const deleteButton = classNames(`${styles.button__delete}`);

  return (
    <button type="button" className={deleteButton} onClick={onClick}>
      <EditIcon
        className={styles.delete_icon}
        classes={{
          root: styles.delete_icon_root,
        }}
      />
    </button>
  );
}

EditButton.propTypes = {
  buttonStyle: string,
  onClick: PropTypes.func,
};

export { EditButton };
