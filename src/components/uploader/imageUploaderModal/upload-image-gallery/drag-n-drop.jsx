import React from 'react';
import dropzoneSvg from './image/dropzone.svg';
import styles from './uploadGallery.module.scss';

const DrugNDropArea = function({ getRootProps, getInputProps, toHideArea }) {
  return (
    <div
      className={`${styles.dropzone} ${toHideArea ? styles.hide : ''}`}
      {...getRootProps()}
    >
      <img
        alt="Dropzone icon"
        className={styles.dropzone__image}
        src={dropzoneSvg}
        title="Dropzone"
      />

      <p className={styles.desktop}>
        <b className={styles.dropzone__label}>Drag and drop up to 8 files</b>{' '}
        <br />
        or
        <span className={styles.browse}>
          browse
          <input
            accept="image/jpeg,image/png"
            type="file"
            {...getInputProps({
              accept: 'image/jpeg,image/png',
            })}
          />
        </span>
        to choose a file
      </p>

      <b className={`${styles.mobile} ${styles.dropzone__label}`}>
        Add up to 8 files
      </b>

      <p className={styles.requirements}>
        Supported file types: JPEG, PNG. File size up to 8MB
      </p>
    </div>
  );
};

export default DrugNDropArea;
