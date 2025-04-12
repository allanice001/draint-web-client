import React, { useEffect, useState } from 'react';
import { any, arrayOf, bool, func, objectOf } from 'prop-types';
import { connect, useDispatch } from 'react-redux';

import BasicModal from 'components/basic-modal/basic-modal';
import StepOne from './components/upload-step-one';
import { createImageFile } from 'services/images/imageService';
import { getMediaForArtworkUpdate } from 'services/artwork-upload-service';
import handleUploadArtworks from 'redux/artwork/thunks/handle-upload-artworks';
import styles from './artwork-edit-modal.module.scss';

function EditArtworkModal({
  isOpen,
  currentImages,
  handleClose,
  isArtworkUploading,
}) {
  const [images, setImages] = useState([]);
  const [initialPrimaryImage, setInitialPrimaryImage] = useState({});
  const dispatch = useDispatch();

  function processDataForRequest() {
    const media = getMediaForArtworkUpdate(
      images,
      currentImages,
      initialPrimaryImage
    );

    const files = media.added.map(({ path }, index) =>
      createImageFile(path, index)
    );
    dispatch(handleUploadArtworks(media, files, handleClose));
  }

  useEffect(() => {
    if (currentImages) {
      setImages(currentImages);
      setInitialPrimaryImage(currentImages[0]);
    }

    return () => {
      setImages([]);
    };
  }, [currentImages]);

  return (
    <BasicModal
      title="Edit artwork"
      isOpen={isOpen}
      handleClose={handleClose}
      footer={
        <div className={styles.upload_modal__footer}>
          <button
            type="button"
            className="secondary-button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="primary-button"
            disabled={!images.length || isArtworkUploading}
            onClick={processDataForRequest}
          >
            Save
          </button>
        </div>
      }
    >
      <div className={styles.upload_modal__content}>
        <StepOne
          images={[...images]}
          onImagesChange={data => setImages(data)}
          className={styles.upload_modal__content__inner}
          additionalStyles={styles}
        />
      </div>
    </BasicModal>
  );
}

EditArtworkModal.propTypes = {
  currentImages: arrayOf(objectOf(any)).isRequired,
  isOpen: bool.isRequired,
  isArtworkUploading: bool.isRequired,
  handleClose: func.isRequired,
};

const mapStateToProps = state => ({
  isArtworkUploading: state.user.loader.artworkLoader,
});

export default connect(mapStateToProps)(EditArtworkModal);
