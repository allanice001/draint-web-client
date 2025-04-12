import * as Button from 'components/shared/button';
import {
  OPTIONS,
  PRIVATE_OPTIONS,
} from 'constants/components/artwork-gallery/constants';
import Dropdown from 'components/dropdown/dropdown';
import React from 'react';
import styles from './artwork-gallery.module.scss';

export function GalleryButtons({
  isMaster,
  isOwner,
  canEdit,
  setSeriesIsOpen,
  setFilterBy,
  handleAddPainting,
}) {
  const getDropdownOptions = canEdit => {
    if (canEdit) {
      return [...OPTIONS, ...PRIVATE_OPTIONS];
    }

    return OPTIONS;
  };

  return (
    <div className={styles.header}>
      {!isMaster && (
        <Button.Primary
          sm
          className={styles.action}
          type={Button.Type.Default}
          onClick={() => setSeriesIsOpen(true)}
        >
          Collections
        </Button.Primary>
      )}

      <div className={styles.filter}>
        <span className={styles.label}>Show as</span>

        <Dropdown
          onChange={setFilterBy}
          options={getDropdownOptions(canEdit)}
          rounded
        />
      </div>

      {isOwner && (
        <Button.Primary
          sm
          className={styles.action}
          type={Button.Type.Default}
          onClick={handleAddPainting}
        >
          New painting
        </Button.Primary>
      )}
    </div>
  );
}
