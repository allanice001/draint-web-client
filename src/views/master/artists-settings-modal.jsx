import React, { useEffect } from 'react';
import {
  getArtistAccountData,
  resetArtistAccountData,
  updateArtistAccountData,
} from 'redux/master/actions/currentArtistActions';
import DefaultModal from 'components/basic-modal/basic-modal';
import { Spinner } from 'components/lib';
import { handleInstagramUsername } from 'helpers/social-media/handle-instagram-username';
import styles from './artists-settings-modal.module.scss';
import { submit } from 'redux-form';
import { useArtistsSettingsModal } from 'hooks/master/use-artists-settings-modal';
import { useDispatch } from 'react-redux';

const MaterArtistSettingsModal = ({
  open,
  setOpen,
  current_id,
  onAccountUpdate,
}) => {
  const {
    getModalTitle,
    getToggleButtonTitle,
    getUpdateButtonTitle,
    toggleTab,
    getForm,
    getSubmitType,
    isDisabled,
    currentArtist,
    isUserTaken,
    isEmailTaken,
  } = useArtistsSettingsModal();

  const dispatch = useDispatch();

  useEffect(() => {
    if (current_id) {
      return dispatch(getArtistAccountData(current_id));
    }

    dispatch(resetArtistAccountData());
  }, [current_id, dispatch]);

  const handleSubmit = (data, type) => {
    const newData = {
      account_id: current_id,
      profile_id: currentArtist.account.profileId,
      instagram: handleInstagramUsername(data.instagram),
      [type]: {
        ...currentArtist[type],
        ...data,
        instagram: handleInstagramUsername(data.instagram),
      },
    };
    const callback = () => {
      onAccountUpdate(current_id, {
        ...currentArtist.account,
        ...currentArtist.location,
        ...data,
        instagram: handleInstagramUsername(data.instagram),
      });
    };
    dispatch(updateArtistAccountData(newData, callback, setOpen));
  };

  return (
    <DefaultModal
      maxWidth="xs"
      isOpen={open}
      title={getModalTitle()}
      handleClose={setOpen}
      footer={
        <div className={styles.footer}>
          <button
            type="button"
            className={`secondary-button ${styles.button}`}
            onClick={toggleTab}
          >
            {getToggleButtonTitle()}
          </button>
          <button
            type="button"
            className={`primary-button ${styles.button}`}
            onClick={() => dispatch(submit(getSubmitType()))}
            disabled={isDisabled() || isUserTaken || isEmailTaken}
          >
            {getUpdateButtonTitle()}
          </button>
        </div>
      }
    >
      {currentArtist.loading ? <Spinner full /> : getForm(handleSubmit)}
    </DefaultModal>
  );
};

export default MaterArtistSettingsModal;
