import * as Button from 'components/shared/button';
import DeleteIcon from 'components/icons/delete';
import EditIcon from 'components/icons/editPencilIcon';
import React from 'react';
import cx from 'classnames';
import styles from './artwork-gallery.module.scss';

export function EditButtonGroup({ editSeries, deleteSeries }) {
  const buttonClass = cx(styles.actionIcon);
  const iconClass = cx(styles.icon);

  return (
    <>
      <Button.Primary
        xs
        className={buttonClass}
        icon={<EditIcon className={iconClass} />}
        onClick={editSeries}
      />

      <Button.Primary
        xs
        className={buttonClass}
        icon={<DeleteIcon className={iconClass} />}
        onClick={deleteSeries}
      />
    </>
  );
}
