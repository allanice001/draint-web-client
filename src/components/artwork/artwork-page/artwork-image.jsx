import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ARTWORK_GALLERY_LIMIT } from 'constants/components/artwork-page';
import ArtworkPageGallery from 'components/artwork/artwork-page-gallery/artwork-page-gallery';
import ArtworkTitle from 'components/artwork/artwork-title/artwork-title';
import { ButtonRounded } from 'components/button-rounded/button-rounded';
import EditArtworkModal from 'components/artwork/artwork-upload/artwork-edit-modal';
import Header from 'components/artwork/artwork-page/header';
import Icons from 'components/icons';
import { QRcodeGenerator } from 'components/qrCode/qr-code';
import { Skeleton } from '@material-ui/lab';
import { addToWatchlist } from 'redux/dashboard/actions/watchlistActions';
import { checkArtworkIsInWatchlist } from 'helpers/checkArtworkIsInWatchlist';
import { imageSizes } from 'constants/media-query/image-sizes';
import staticUrls from 'constants/images/static-urls';
import styles from './artwork-page.module.scss';
import { useArtworkPage } from 'hooks/use-artwork-page';
import { Image } from 'components/lib';

const ADD_TO_WATCHLIST = 'Add to Watchlist';
const IS_ADDED_TO_WATCHLIST = 'Added to watchlist';

function ArtworkImage({ currentImg, setCurrent }) {
  const {
    getShipmentRates,
    getOwnerName,
    isOwner,
    setGalleryModal,
    isArtistOwner,
    isSold,
    isArtworkArtist,
    isArtworkOwner,
    gallerySteps,
    currentArtwork,
    loading,
    isOwnerCanEditArtwork,
    artworkId,
    artworkName,
    artworkPrice,
    lowesRate,
    canEditRoles,
    editMode,
    galleryImages,
    ratesFetching,
    ratesRequested,
    artworkOwnerAddress,
  } = useArtworkPage();

  const [openEditArtworkModal, setOpenEditArtworkModal] = useState(false);
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const dispatch = useDispatch();
  const { watchlistFull } = useSelector(state => state.dashboard.watchlist);

  useEffect(() => {
    setIsAddedToWatchlist(
      checkArtworkIsInWatchlist(watchlistFull, currentArtwork.id)
    );
  }, [watchlistFull, currentArtwork.id]);

  const handleEditModalOpen = () => {
    setOpenEditArtworkModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditArtworkModal(false);
  };

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Skeleton height="100%" variant="rect" width="100%" />
      </div>
    );
  }

  if (!artworkId) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.image__wrapper}>
          <Image
            alt=""
            className={styles.image}
            srcSet={staticUrls.image.defaultArtist}
            sizes={imageSizes.ADAPTIVE}
          />
        </div>
      </div>
    );
  }

  const addArtworkToWatchlist = () =>
    dispatch(
      addToWatchlist(
        {
          id: artworkId,
          title: currentArtwork.title,
          username: currentArtwork.authorInfo.username,
        },
        setIsAddedToWatchlist
      )
    );

  return (
    <div className={styles.wrapper}>
      {!isArtworkArtist && !isArtworkOwner && !canEditRoles && (
        <Header currentArtwork={currentArtwork} name={getOwnerName} />
      )}

      {(canEditRoles || isOwner()) && (
        <ArtworkTitle
          country={artworkOwnerAddress.country}
          editMode={editMode}
          getRates={getShipmentRates}
          isArtistOwner={isArtistOwner}
          isOwner={isOwner}
          loading={loading}
          name={getOwnerName}
          price={artworkPrice}
          rate={lowesRate}
          rateFetching={ratesFetching}
          ratesRequested={ratesRequested}
          title={artworkName}
        />
      )}

      <div className={styles.image__wrapper}>
        <Image
          alt=""
          className={styles.image}
          srcSet={
            galleryImages[currentImg]?.small_image ||
            galleryImages[currentImg].imgPath
          }
          sizes={imageSizes.ADAPTIVE}
        />

        <button
          className={styles.zoom}
          onClick={() => setGalleryModal(true)}
          type="button"
        >
          <Icons.Zoom />
        </button>
      </div>
      <ArtworkPageGallery
        className={styles.gallery}
        currentImg={currentImg}
        gallery={galleryImages}
        galleryLimit={ARTWORK_GALLERY_LIMIT}
        handleClick={index => {
          if (
            index === ARTWORK_GALLERY_LIMIT - 1 &&
            galleryImages.length > ARTWORK_GALLERY_LIMIT
          )
            setGalleryModal(true);
          setCurrent(index);
        }}
        loading={loading}
        title={artworkName}
      />
      {(isArtistOwner() || canEditRoles) && (
        <>
          <button
            className={`primary-button ${styles.upload__btn}`}
            onClick={handleEditModalOpen}
            type="button"
            disabled={!isOwnerCanEditArtwork || isSold}
          >
            Change/Add images
          </button>
          <EditArtworkModal
            currentImages={Object.values(gallerySteps).map(val => ({
              ...val,
            }))}
            handleClose={handleEditModalClose}
            isOpen={openEditArtworkModal}
          />
        </>
      )}
      <div
        className={`${styles.wrapperQRAndAddToWatchlist} ${isArtworkOwner &&
          styles.qrCodeCenter}`}
      >
        <QRcodeGenerator className={styles.qrcode} title={artworkName} />
        {!!!isArtworkOwner && (
          <div className={styles.addToWatchlist__wrapper}>
            <ButtonRounded
              disabled={isAddedToWatchlist}
              onClick={() => {
                addArtworkToWatchlist();
              }}
              icon={<Icons.HeartRed />}
              text={
                isAddedToWatchlist ? IS_ADDED_TO_WATCHLIST : ADD_TO_WATCHLIST
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtworkImage;
