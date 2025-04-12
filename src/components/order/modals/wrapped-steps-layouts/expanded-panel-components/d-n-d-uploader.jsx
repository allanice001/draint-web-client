import { DECLINED } from 'constants/global';
import { DeleteButton } from '../buttonts/delete-button';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { formatBytes } from 'services/fileServices';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from '../../wrapped-steps.module.scss';

function DNDUploader({
  photo,
  status,
  getRootProps,
  getInputProps,
  handleDeletePhoto,
  uploaded,
  step,
}) {
  const dropZoneWrapper = classNames(`${styles.dropzone}`, {
    [`${styles.dropzone__disabled}`]: Boolean(photo),
  });

  function getUrl() {
    if (typeof photo === 'string') {
      return photo;
    } else if (photo.length && photo[0]) {
      return photo[0].imgPath;
    }
  }

  function getInfo() {
    if (typeof photo === 'string') {
      return (
        <div className={styles.info_wrapper}>
          <span className={styles.info_name}>{step.name}</span>
          <span className={styles.info_size}>{formatBytes(step.size)}</span>
        </div>
      );
    } else if (photo.length && photo[0]) {
      return (
        <div className={styles.info_wrapper}>
          <span className={styles.info_name}>{photo[0].name}</span>
          <span className={styles.info_size}>{formatBytes(photo[0].size)}</span>
        </div>
      );
    }
  }

  return (
    <div className={`${dropZoneWrapper}`} {...getRootProps()}>
      {Boolean(photo) ? (
        <div className={styles.image_zone}>
          <div className={styles.image_wrapper}>
            <img
              alt=""
              className={styles.image}
              srcSet={getUrl()}
              sizes={imageSizes.ADAPTIVE}
            />
            {getInfo()}
          </div>
          {(uploaded || status === DECLINED) && (
            <div className={styles.delete_button}>
              <DeleteButton onClick={() => handleDeletePhoto()} />
            </div>
          )}
        </div>
      ) : (
        <div className={styles.desktop}>
          <input
            accept="image/jpeg,image/png"
            type="file"
            {...getInputProps({ accept: 'image/jpeg,image/png' })}
          />
          <span
            className={styles.dropzone__label_botom}
          >{`Drag photo here`}</span>
          <br />
          <span
            className={styles.requirements}
          >{`Supported file types: JPEG, PNG. File size up to 5mb`}</span>
        </div>
      )}
    </div>
  );
}

DNDUploader.propTypes = {
  photo: PropTypes.any,
  getRootProps: PropTypes.func,
  getInputProps: PropTypes.func,
  handleDeletePhoto: PropTypes.func,
};

export { DNDUploader };
