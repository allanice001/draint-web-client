import React, { useCallback, useEffect, useState } from 'react';

import ControlButtons from 'components/uploader/imageUploaderModal/upload-image-gallery/control-buttons';
import DropZone from 'services/images/dropZone';
import DropzoneIcon from 'components/icons/dropzone';
import { Image } from 'components/image/image';
import cx from 'classnames';
import { imageSizes } from 'constants/media-query/image-sizes';
import staticUrls from 'constants/images/static-urls';
import styles from './image-dropzone.module.scss';

function ImageDropzone(props) {
  const { src, canEdit, onRotate, onChange, isAtelier } = props;
  const [preview, setPreview] = useState(src);
  const onChangeHandler = useCallback(
    src => {
      setPreview(src);
      onChange(src);
    },
    [onChange]
  );

  useEffect(() => {
    setPreview(src);
  }, [src]);

  return (
    <>
      <DropZone
        className={cx(styles.root, {
          [styles.canEdit]: canEdit,
        })}
        canEdit={canEdit}
        onDrop={onChangeHandler}
        accept={['image/png', 'image/jpeg']}
      >
        {preview && (
          <Image
            className={cx(styles.preview)}
            srcSet={preview}
            sizes={imageSizes.ADAPTIVE}
            defaultSrc={staticUrls.image.defaultArtist}
          />
        )}

        {canEdit && (
          <div
            className={cx(styles.dropzone, {
              [styles.hasImage]: !!preview,
            })}
          >
            <DropzoneIcon />

            <p className={cx(styles.title)}>
              Drag your photo here or click to{' '}
              <b className={styles.link}>browse</b>
            </p>
            <p className={cx(styles.description)}>supported files: PNG, JPEG</p>
          </div>
        )}
      </DropZone>
      {canEdit && preview && !isAtelier && (
        <ControlButtons
          className={styles.control_buttons}
          handleRotate={onRotate}
        />
      )}
    </>
  );
}

export default ImageDropzone;
