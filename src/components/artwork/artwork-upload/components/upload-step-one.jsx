import React, { useState } from 'react';
import { MAX_WIDTH } from 'constants/components/artwork-upload';
import { ModalWindow } from 'components/layout/modal/modal';
import PropTypes from 'prop-types';
import UploadGallery from 'components/uploader/imageUploaderModal/upload-image-gallery/upload-gallery';
import styles from '../artwork-upload.module.scss';

const UploadStepOne = function({
  onImagesChange,
  images,
  className = '',
  additionalStyles,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <UploadGallery
        additionalStyles={additionalStyles}
        images={images}
        onChange={onImagesChange}
      />
      <ModalWindow
        isOpen={open}
        setOpen={() => setOpen(!open)}
        maxWidth={MAX_WIDTH}
      />
      <div
        className={`${styles.instructions} ${additionalStyles?.instructions}`}
      >
        <h3 className={`group-title ${styles.title}`}>
          Image Uploading Guide:
        </h3>
        <h4 className={styles.title}>
          For us to verify your upload, please follow this guide:
        </h4>

        <ul className={styles.list}>
          <li className={styles.list__item}>
            Each painting has its own uploading process. Do not upload images
            that show different paintings. Please start a new upload process for
            every painting.
          </li>
          <li className={styles.list__item}>
            You can upload up to 8 images showing one particular painting. You
            can show the painting in different positions, in an animated room,
            or you show up in person next to it. Be creative to stand out.
          </li>
          <li className={styles.list__item}>
            Right now, Draint allows for presenting original, handcrafted
            paintings only. Do not show sculptures, installations, murals,
            photography, or digital art. We are not able to approve it at this
            point.
          </li>
          <li className={styles.list__item}>
            Please make sure your work does not follow any political or
            religious motives.
          </li>
          <li className={styles.list__item}>
            Please do not show a violation, hate-speech, or false information.
          </li>
          <li className={styles.list__item}>
            Don't show replica that violates intellectual property rights.
          </li>
        </ul>

        <button
          className={`secondary-button ${styles.button}`}
          onClick={() => setOpen(!open)}
          type="button"
        >
          Show good example
        </button>
      </div>
    </div>
  );
};

UploadStepOne.propTypes = {
  onImagesChange: PropTypes.func,
  images: PropTypes.array,
  className: PropTypes.string,
  additionalStyles: PropTypes.object,
};

export default UploadStepOne;
