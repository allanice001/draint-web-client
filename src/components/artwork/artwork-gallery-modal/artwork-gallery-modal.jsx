import React, { useCallback, useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { array, bool, func, number } from 'prop-types';
import { ArtworkService } from 'services/artwork-service.js';
import Dialog from '@material-ui/core/Dialog';
import Icons from 'components/icons/index.js';
import cx from 'classnames';
import styles from './artwork-gallery-modal.module.scss';

const artworkService = new ArtworkService();

const ZoomButtons = function(properties) {
  const { zoomIn, zoomOut, resetTransform } = properties;

  return (
    <div className={styles.buttons}>
      <button
        className={cx(styles.buttons__btn, styles['p-4'])}
        onClick={zoomIn}
        type="button"
        title="Zoom plus"
      >
        <Icons.ZoomPlus />
      </button>
      <button
        className={cx(styles.buttons__btn, styles['p-4'])}
        onClick={zoomOut}
        type="button"
        title="Zoom minus"
      >
        <Icons.ZoomMinus />
      </button>
      <button
        className={styles.buttons__btn}
        onClick={resetTransform}
        type="button"
        title="Reset"
      >
        <Icons.ZoomReset width="50" />
      </button>
    </div>
  );
};

const ImagesSidebar = function(properties) {
  const { gallery, setModalImg, modalImg, setDefaultState } = properties;

  const onClickHandler = useCallback(
    key => {
      setModalImg(key);
      setDefaultState();
    },
    [setModalImg, setDefaultState]
  );

  return (
    <div className={styles.images_sidebar}>
      {gallery.map((element, index) => (
        <button
          key={index}
          className={cx(styles.images_sidebar__item, {
            [styles.active]: index === modalImg,
          })}
          onClick={() => onClickHandler(index)}
          type="button"
        >
          <img
            src={artworkService.filterArtworkSrc(element)}
            className={styles.content}
            alt=""
          />
        </button>
      ))}
    </div>
  );
};

const ArtworkGalleryModal = function({
  handleClose,
  open,
  gallery = [],
  currentImage,
}) {
  const [imageIndex, setImageIndex] = useState(currentImage);

  useEffect(() => {
    setImageIndex(currentImage);
  }, [currentImage]);

  function onClose() {
    handleClose();
    setImageIndex(currentImage);
  }

  return (
    <Dialog
      classes={{
        root: styles.dialog,
        paper: styles.paper,
        container: styles.backdrop,
      }}
      onClose={onClose}
      open={open}
    >
      <button className={styles.close} onClick={onClose} type="button">
        <Icons.Cancel />
      </button>

      <div className={styles.gallery}>
        <TransformWrapper defaultScale={1} options={{ centerContent: true }}>
          {({ zoomIn, zoomOut, resetTransform, setDefaultState }) => (
            <>
              <TransformComponent>
                <div className={styles.image__wrapper}>
                  <img
                    alt="Uploaded artwork"
                    className={styles.image__content}
                    src={artworkService.filterArtworkSrc(gallery[imageIndex])}
                    title="Uploaded artwork"
                  />
                </div>
              </TransformComponent>
              }
              <ZoomButtons
                resetTransform={resetTransform}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
              />
              <ImagesSidebar
                gallery={gallery}
                modalImg={imageIndex}
                setDefaultState={setDefaultState}
                setModalImg={setImageIndex}
              />
            </>
          )}
        </TransformWrapper>
      </div>
    </Dialog>
  );
};

ArtworkGalleryModal.propTypes = {
  handleClose: func.isRequired,
  open: bool.isRequired,
  gallery: array,
  currentImage: number.isRequired,
};

export default ArtworkGalleryModal;
