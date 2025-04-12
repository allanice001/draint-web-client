import ControlButtons from 'components/uploader/imageUploaderModal/upload-image-gallery/control-buttons';
import Icons from 'components/icons';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { imageSizes } from 'constants/media-query/image-sizes';
import styles from './artist.module.scss';

const UploadPreview = ({
  className,
  uploadImage,
  handleRotate,
  src,
  checkImage,
}) => {
  const onChangeImage = event => {
    const [imageFile] = event.target.files;
    const [file] = checkImage([imageFile], true);
    file && uploadImage(file);
    event.target.value = '';
  };

  const classNames = classnames(styles.preview, className);

  return (
    <div className={classNames}>
      <label className={styles.preview__button}>
        <span className={styles.avatar__text}>
          Upload an Image showing you in person, together with your artwork. Be
          creative to stand out.
        </span>
        {src ? (
          <img
            alt="Artwork thumbnail"
            className={styles.image__thumbnail}
            srcSet={src}
            sizes={imageSizes.MD}
            title="Artwork thumbnail"
          />
        ) : (
          <Icons.Upload className={styles.preview__icon} />
        )}
        <span className={styles.thumbnail_text}>
          {src
            ? 'A profile image is the first impression of your page. Make sure to use a high quality image that shows you in person together with your art'
            : 'It is necessary to pass verification'}
        </span>

        <input
          accept="image/jpeg,image/png"
          data-testid="profile-image-upload"
          onChange={onChangeImage}
          type="file"
        />
      </label>

      {src && (
        <ControlButtons
          className={styles.control_buttons}
          handleRotate={handleRotate}
        />
      )}
    </div>
  );
};

UploadPreview.defaultProps = {
  className: '',
  src: undefined,
};

UploadPreview.propTypes = {
  checkImage: PropTypes.func,
  className: PropTypes.string,
  handleRotate: PropTypes.func,
  src: PropTypes.string,
  uploadImage: PropTypes.func.isRequired,
};

export default UploadPreview;
