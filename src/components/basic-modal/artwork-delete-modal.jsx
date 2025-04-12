import { bool, func, string } from 'prop-types';

import DefaultModal from './basic-modal';
import React from 'react';
import { deleteArtwork } from 'redux/artwork/actions/artworkActions';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import staticUrls from 'constants/images/static-urls';
import styles from './artwork-delete-modal.module.scss';
import useAdminRole from 'hooks/use-admin-role';
import useArtworkDeleteModal from 'hooks/use-artwork-delete-modal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const ArtworkDeleteModal = function({ isOpen, setOpen, artworkId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isMEARole } = useAdminRole();
  const {
    isOwner,
    deletedByAccount,
    ownerUserName,
    MODAL_CONTENT,
    Analytic,
  } = useArtworkDeleteModal();

  function redirectTo() {
    if (isMEARole && isOwner) {
      return history.push('/dashboard');
    }

    return history.push(getArtistGalleryURL(ownerUserName));
  }

  function onSubmit() {
    Analytic.createEvent('ArtworkDeleted');
    dispatch(deleteArtwork({ artworkId, deletedByAccount }, redirectTo));
  }

  return (
    <DefaultModal
      className={styles.wrapper}
      footer={
        <div className={styles.footer}>
          <button
            className={`primary-button ${styles.button}`}
            onClick={setOpen}
            type="button"
          >
            {MODAL_CONTENT.back_btn}
          </button>
          <button
            className={`secondary-button ${styles.button}`}
            onClick={onSubmit}
            type="button"
          >
            {MODAL_CONTENT.confirm_btn}
          </button>
        </div>
      }
      footerClassName={styles.footer__wrapper}
      handleClose={setOpen}
      isOpen={isOpen}
      title={MODAL_CONTENT.title}
    >
      <div className={styles.wrapper}>
        <div className={styles.preview}>
          <div>
            <h1>{MODAL_CONTENT.header}</h1>
            <p>{MODAL_CONTENT.text}</p>
          </div>
          <img
            alt="Artwork delete background"
            src={staticUrls.image.buildingProfile}
            title="Artwork delete background"
          />
        </div>
      </div>
    </DefaultModal>
  );
};

ArtworkDeleteModal.propTypes = {
  isOpen: bool.isRequired,
  setOpen: func.isRequired,
  artworkId: string.isRequired,
};

export default ArtworkDeleteModal;
