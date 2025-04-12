import Icons from 'components/icons';
import React from 'react';
import { setArtworkPageUnloggedModal } from 'redux/artwork/actions/artworkActions';
import styles from './artwork-page.module.scss';
import stylesWatchlist from 'components/collector/collector-watchlist/collector-watchlist.module.scss';
import { useDispatch } from 'react-redux';

const watchlistStyles = `${stylesWatchlist.button} ${stylesWatchlist.button__offer}`;

const MakeAnOfferButton = ({
  currentArtwork,
  isArtist,
  IsArtworkParams,
  isForSale,
  isUser,
  isFromWatchlist,
  setOfferOpenCheck,
  checkUserInfo,
  checkDimension,
  ratesFetching,
}) => {
  const dispatch = useDispatch();

  function isDisabled() {
    return Boolean(
      isArtist ||
        IsArtworkParams() ||
        !isForSale ||
        checkUserInfo() ||
        ratesFetching
    );
  }

  function makeOffer() {
    if (!checkDimension()) {
      isUser
        ? setOfferOpenCheck()
        : dispatch(
            setArtworkPageUnloggedModal({
              id: currentArtwork.id,
              title: currentArtwork.title,
              username: currentArtwork.authorInfo.username,
            })
          );
    }
  }

  return (
    <button
      className={`${styles.button__offer} ${isFromWatchlist &&
        watchlistStyles}`}
      disabled={isDisabled()}
      onClick={makeOffer}
      type="button"
    >
      {!isFromWatchlist && <Icons.Chat className={styles.icon} />} Make an Offer
    </button>
  );
};

export default MakeAnOfferButton;
