import * as Button from 'components/shared/button';

import EditIcon from 'components/icons/editPencilIcon';
import React from 'react';
import cx from 'classnames';
import styles from './form-button.module.scss';

export const FormButton = props => {
  const { onEdit, isEdit, className, form, disabled } = props;

  if (isEdit) {
    return (
      <Button.Primary
        type={Button.Type.Submit}
        className={cx(styles.button, className)}
        xs
        form={form}
        disabled={disabled}
      >
        Save
      </Button.Primary>
    );
  }

  return (
    <Button.Secondary
      className={cx(styles.button, className)}
      xs
      icon={<EditIcon className={styles.icon} />}
      onClick={onEdit}
    >
      Edit
    </Button.Secondary>
  );
};
