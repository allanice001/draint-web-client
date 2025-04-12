import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getArtistAccount } from 'redux/artist/actions/artistProfileActions';
import staticUrls from 'constants/images/static-urls';
import styles from './artistInstagramFeed.module.scss';
import { withRouter } from 'react-router';

const InstagramPlaceholder = ({ isOwner = false, onClick, setOpen }) => (
  <div className={styles.placeholder}>
    <img
      alt="Instagram placeholder"
      className={styles.img}
      src={
        isOwner
          ? staticUrls.image.socialMedia
          : staticUrls.image.socialMediaBlack
      }
      title="Instagram placeholder"
    />
    <div className={styles.title}>
      Sorry, the current feature is temporary not available due to Instagram
      rights. Your Draint Team is working on it
    </div>
  </div>
);

function mapStateToProps(store) {
  const isOwner =
    store.user.account.profile_id &&
    store.user.account.profile_id ===
      store.artist.currentArtist.account.profile_id;
  return {
    artist: store.artist.currentArtist,
    isOwner,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getArtistAccount,
      },
      dispatch
    ),
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InstagramPlaceholder)
);
