import * as Button from 'components/shared/button';
import {
  CONTENT,
  LOG_IN_COLLECTOR,
  SIGN_IN_COLLECTOR,
  TITLE,
} from 'constants/components/unlogged-modal';
import { SIGN_IN, SIGN_UP_COLLECTOR } from 'constants/singin-up';
import { useDispatch, useSelector } from 'react-redux';
import DefaultModal from 'components/basic-modal/basic-modal';
import React from 'react';
import { setArtworkPageUnloggedModal } from 'redux/artwork/actions/artworkActions';
import styles from './artwork-page-unlogged-modal.module.scss';
import { useHistory } from 'react-router';

function ArtworkPageUnloggedModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const artworkPageUnloggedModal = useSelector(
    state => state.artwork.artworkData.artworkPageUnloggedModal
  );

  function closeModal() {
    dispatch(setArtworkPageUnloggedModal(null));
  }

  function getOnClick(isSignIn) {
    localStorage.setItem('artwork', JSON.stringify(artworkPageUnloggedModal));
    history.push(isSignIn ? SIGN_IN : SIGN_UP_COLLECTOR);
    closeModal();
  }

  return (
    <DefaultModal
      titleCenter={styles.title}
      title={TITLE}
      isOpen={artworkPageUnloggedModal}
      handleClose={closeModal}
      maxWidth="sm"
      footerClassName={styles.modal_footer}
      footer={
        <div className={styles.wrapper}>
          <Button.Primary
            className={styles.button}
            onClick={() => getOnClick(true)}
          >
            {LOG_IN_COLLECTOR}
          </Button.Primary>

          <Button.Secondary
            className={styles.button}
            onClick={() => getOnClick(false)}
          >
            {SIGN_IN_COLLECTOR}
          </Button.Secondary>
        </div>
      }
    >
      <div className={styles.content_wrapper}>
        <span className={styles.content_text}>{CONTENT}</span>
      </div>
    </DefaultModal>
  );
}

export default ArtworkPageUnloggedModal;
