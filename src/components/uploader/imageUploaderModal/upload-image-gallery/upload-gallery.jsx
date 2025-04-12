import React, { useCallback, useRef, useState } from 'react';
import { RealCropSaver, getRotatedImage } from 'services/images/cropService';

import ControlButtons from './control-buttons';
import Cropper from 'components/image/crop/ReactCropper';
import DragDropGallery from './uploadGalleryDnD';
import DragNDropArea from './drag-n-drop';
import { Spinner } from 'components/lib';
import { bindActionCreators } from 'redux';
import checkImage from 'redux/artwork/thunks/check-image';
import { connect } from 'react-redux';
import { createImage } from 'services/images/imageService';
import cx from 'classnames';
import { initialCropState } from 'constants/images/images';
import propTypes from 'prop-types';
import { readFiles } from 'services/fileServices';
import { setArtworkUploading } from 'redux/user/loader/actions/setLoading';
import styles from './uploadGallery.module.scss';
import { useDropzone } from 'react-dropzone';
import { useEffect } from 'react';

const changeHistoryIndex = (history, image, activeImage) => {
  return history.map((value, index) => (index === activeImage ? image : value));
};

const UploadGallery = function({
  images = [],
  onChange,
  single,
  loading,
  setArtworkUploading,
  additionalStyles,
  checkImage,
  isMaster,
}) {
  const [data, setData] = useState(images);
  const [cropFlag, setCropFlag] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [crop, setCrop] = useState(initialCropState);
  const cropImageReference = useRef();
  const [imageHistory, setImageHistory] = useState([]);

  useEffect(() => {
    onChange(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, images]);

  const onDrop = useCallback(
    async acceptedFiles => {
      const checkedFiles = checkImage(acceptedFiles);
      const left = 8 - data.length;
      const readedFiles = await readFiles(
        checkedFiles?.slice(0, left > 0 ? left : 0)
      );
      const res = readedFiles.map(value => ({ id: null, imgPath: value }));
      const newData = [...data, ...res];

      setData(newData);
    },
    [checkImage, data]
  );
  const imageDeleteHandler = index => {
    const newData = [...data.slice(0, index), ...data.slice(index + 1)];
    setActiveImage(0);
    setData(newData);
  };

  const updateImageHandler = useCallback(
    (image, position) => {
      const newData = data.map((element, index) => {
        if (index === position) {
          return image;
        }
        return element;
      });

      setData(newData);
    },
    [data]
  );

  const handleSaveCrop = async () => {
    try {
      const image = images[activeImage];
      setArtworkUploading(true);
      imageHistorySave({ ...image }, activeImage);
      const imageCanvas = await createImage(images[activeImage].imgPath);
      cropImageReference.current.src = imageCanvas.src;
      image.imgPath = await RealCropSaver(cropImageReference.current, crop);
      updateImageHandler(image, activeImage);
    } finally {
      handleCrop();
      setArtworkUploading(false);
    }
  };

  const imageHistorySave = (image, imageIndex) => {
    const history = imageHistory;
    history[imageIndex] = image;
    setImageHistory(history);
  };

  const historyRollback = () => {
    const image = imageHistory[activeImage];
    const history = changeHistoryIndex(imageHistory, null, activeImage);
    updateImageHandler(image, activeImage);
    setImageHistory(history);
  };

  const handleRotate = async angle => {
    try {
      setArtworkUploading(true);
      const image = images[activeImage];
      const imageCanvas = await createImage(images[activeImage].imgPath);
      image.imgPath = await getRotatedImage(imageCanvas, angle);
      updateImageHandler(image, activeImage);
    } finally {
      setArtworkUploading(false);
    }
  };

  const handleCrop = () => {
    setCropFlag(!cropFlag);
    setCrop(initialCropState);
    cropImageReference.current = null;
  };

  const handleCropComplete = async () => {
    if (cropImageReference.current && crop.width && crop.height) {
      await handleSaveCrop();
    }
  };

  const disableHistoryRollbackButton = () =>
    loading || !imageHistory[activeImage];

  const imagesPreview = images.length > 0 ? images : new Array(8).fill(null);

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop });

  return (
    <div className={styles.wrapper}>
      <DragNDropArea
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        toHideArea={images.length > 0}
      />

      {!!images.length && (
        <div
          className={cx(styles.image__wrapper, additionalStyles?.upload_image)}
        >
          {loading && (
            <div className={styles.spinner}>
              <Spinner full={styles.spinner} />
            </div>
          )}

          {!cropFlag ? (
            <img
              alt=""
              className={styles.image}
              src={imagesPreview.length && imagesPreview[activeImage]?.imgPath}
            />
          ) : (
            <Cropper
              className={styles.cropper}
              crop={crop}
              handleCompleteChange={handleCropComplete}
              image={
                imagesPreview.length && imagesPreview[activeImage]?.imgPath
              }
              onCropChange={newCrop => setCrop(newCrop)}
              onImageLoaded={image => {
                cropImageReference.current = image;
              }}
            />
          )}

          <ControlButtons
            className={styles.image__tools}
            cropFlag={cropFlag}
            disableHistoryRollbackButton={disableHistoryRollbackButton}
            handleCrop={handleCrop}
            handleRotate={handleRotate}
            handleSaveCrop={handleSaveCrop}
            historyRollback={historyRollback}
            loading={loading}
          />
        </div>
      )}

      {!single && (
        <DragDropGallery
          additionalStyles={additionalStyles}
          onDrag={setData}
          imageDeleteHandler={imageDeleteHandler}
          images={images}
          onChange={onChange}
          open={open}
          isDisabled={!images.length}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />
      )}
    </div>
  );
};

UploadGallery.propTypes = {
  images: propTypes.array,
  onChange: propTypes.func,
  single: propTypes.bool,
  loading: propTypes.bool,
  setArtworkUploading: propTypes.func,
  additionalStyles: propTypes.object,
  checkImage: propTypes.func,
};

const mapStateToProperties = state => ({
  loading: state.user.loader.artworkLoader,
  isMaster: state.user.account.permission === 'master',
});

const mapDispatchToProperties = dispatch =>
  bindActionCreators({ setArtworkUploading, checkImage }, dispatch);

export default connect(
  mapStateToProperties,
  mapDispatchToProperties
)(UploadGallery);
