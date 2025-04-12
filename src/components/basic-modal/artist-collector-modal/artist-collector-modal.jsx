import * as Button from 'components/shared/button';
import { useDispatch, useSelector } from 'react-redux';
import BasicModal from 'components/basic-modal/basic-modal';
import { LET_SWITCH_TO_COLLECTOR } from 'constants/messages';
import React from 'react';
import { SWITCH_ARTIST_COLLECTOR_CONTENT } from 'constants/components/modals';
import { setSelectedArtworkId } from 'redux/dashboard/actions/watchlistActions';
import { setSwitchRoleModal } from 'redux/artwork/actions/artworkActions';
import styles from './artist-collector-modal.module.scss';
import switchToCollectorAddToWatchlist from 'redux/user/account/thunks/switch-to-collector-add-to-watchlist';
import { useHistory } from 'react-router';

function ArtistCollectorModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { switchRoleModal } = useSelector(store => store.artwork.artworkData);
  const {
    account: { loading },
    account,
  } = useSelector(store => store.user);
  const { selectedArtworkId } = useSelector(store => store.dashboard.watchlist);

  function handleClose() {
    dispatch(setSwitchRoleModal(false));
    dispatch(setSelectedArtworkId(''));
  }

  function handleClick() {
    dispatch(setSwitchRoleModal(false));
    dispatch(
      switchToCollectorAddToWatchlist(account, selectedArtworkId, history)
    );
    dispatch(setSelectedArtworkId(''));
  }

  return (
    <BasicModal
      isOpen={switchRoleModal}
      handleClose={handleClose}
      maxWidth="sm"
      footerClassName={styles.footer_wrapper}
      footer={
        <Button.Primary
          className={styles.button}
          onClick={handleClick}
          disabled={loading}
        >
          {SWITCH_ARTIST_COLLECTOR_CONTENT.buttonName}
        </Button.Primary>
      }
    >
      <div className={styles.content_wrapper}>
        <span className={styles.content_text}>{LET_SWITCH_TO_COLLECTOR}</span>
      </div>
    </BasicModal>
  );
}

export default ArtistCollectorModal;
