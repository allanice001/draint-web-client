import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './imageUploader.module.scss';

export default function imageUploader({ input, disabled, selectedFile }) {
  const src = selectedFile ? URL.createObjectURL(selectedFile) : '';
  const onChange = e => {
    const { onChange } = input;
    onChange(e.target.files[0]);
  };

  const sliceFileName = fileName => {
    let sliced = fileName.slice(0, 30);
    if (sliced.length < fileName.length) {
      sliced += '';
    }
    return sliced;
  };

  return (
    <>
      <div>
        <div className={styles.upload_btn}>
          <input
            accept="image/*"
            disabled={disabled}
            id="social_media"
            onChange={onChange}
            style={{ display: 'none' }}
            type="file"
          />
          <label htmlFor="social_media">
            <span
              className={`primary-button ${styles.upload_btn}`}
              disabled={disabled}
            >
              <PhotoCameraIcon
                className="label-icon"
                fontSize="inherit"
                style={{ marginRight: '5px' }}
              />
              {!selectedFile ? ' Upload' : sliceFileName(selectedFile.name)}
            </span>
          </label>
        </div>
      </div>
      <div className={styles.form_item}>
        {selectedFile ? (
          <img
            alt="Preview"
            className="preview"
            src={src}
            title={selectedFile.name}
          />
        ) : (
          <img
            alt="Preview"
            className="empty-preview"
            src={staticUrls.image.noImage}
            title="Empty preview"
          />
        )}
      </div>
    </>
  );
}
