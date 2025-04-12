import ImageDropZone from 'components/shared/image-dropzone/image-dropzone';
import React from 'react';
import cx from 'classnames';
import styles from './image.module.scss';

export const Image = props => {
  const { className, isAtelier } = props;
  const { onChange, value } = props.input;

  return (
    <div className={cx(styles.root, className)}>
      <ImageDropZone
        canEdit
        onChange={onChange}
        src={value}
        isAtelier={isAtelier}
      />
    </div>
  );
};
