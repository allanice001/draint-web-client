import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InstagramUploader from 'components/uploader/instagramUploader';
import { Skeleton } from '@material-ui/lab';
import { Spinner } from 'components/lib';
import { getArtistAccount } from 'redux/artist/actions/artistProfileActions';
import styles from './socialMedia.module.scss';

export const SocialMedia = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.account);
  const { username, loading } = user;

  useEffect(() => {
    dispatch(getArtistAccount(username));
  });

  if (loading) return <Spinner full />;

  return (
    <div className="container">
      <div className={styles.contentWrapper}>
        <div className={styles.instagramFeed}>
          <h1 className={styles.instagramFeedTitle}>
            Want your picture to be here?
          </h1>
          <p className={styles.instagramFeedSubtitle}>
            Send us a request and provide a link to your Instagram profile.
          </p>
          <div className={styles.instagramFeedPlaceholder}>
            <Skeleton variant="rect" width="100%" height="100%" />
          </div>
        </div>
        <div className={styles.instagramUploader}>
          <InstagramUploader />
        </div>
      </div>
    </div>
  );
};
