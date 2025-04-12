import { DRAG_FILE_HERE, SUPPORTED_FILES } from 'constants/blog/blog';
import DropzoneIcon from 'components/icons/dropzone';
import React from 'react';
import cx from 'classnames';
import styles from './blog-dnd.module.scss';

export function PreviewMessage({ image }) {
  return (
    <div
      className={cx(styles.preview_message, {
        [styles.preview_message_visible]: !!!image.length,
      })}
    >
      <DropzoneIcon />
      <p
        className={cx(styles.preview_text, {
          [styles.preview_text_file]: !!!image.length,
        })}
      >
        {DRAG_FILE_HERE}
      </p>
      <p
        className={cx(styles.preview_text, {
          [styles.preview_text_supported]: !!!image.length,
        })}
      >
        {SUPPORTED_FILES}
      </p>
    </div>
  );
}
