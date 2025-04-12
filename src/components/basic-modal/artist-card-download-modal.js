import React, { useEffect, useState } from 'react';

import ArtistLongCardDownload from 'components/artist/artist-long-card/artist-long-card-download';
import DefaultModal from './basic-modal';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { getArtistImageObjects } from 'redux/master/actions/currentArtistActions';
import styles from './welcome-modal.module.scss';
import { useDispatch } from 'react-redux';

const ArtistCardDownloadModal = ({ open, handleClose, id }) => {
  const [loading, setLoading] = useState(false);
  const [artistCardData, setArtistCardData] = useState({});
  const dispatch = useDispatch();
  const callback = data => {
    setArtistCardData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (open && id) {
      setLoading(true);
      dispatch(getArtistImageObjects(id, callback));
    }
  }, [open, id, dispatch]);

  return (
    <DefaultModal
      isOpen={open}
      maxWidth="xs"
      title="Here is your artist card"
      handleClose={handleClose}
      className={styles.wrapper}
    >
      <div className={styles.wrapper}>
        {loading && <Spinner full />}
        {!loading && <ArtistLongCardDownload artist={artistCardData} />}
      </div>
    </DefaultModal>
  );
};

export default ArtistCardDownloadModal;
