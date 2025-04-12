import {
  REMOVE,
  REMOVE_FROM_LIST,
} from 'constants/components/collector-watchlist';
import { useDispatch, useSelector } from 'react-redux';
import { ARTWORK_WEIGHT_MINIMUM } from 'constants/components/artwork-page';
import React from 'react';
import TradeButtons from '../../../artwork/artwork-page/trade-buttons';
import { checkOrderAvailability } from 'redux/artwork/actions/artworkActions';
import styles from '../collector-watchlist.module.scss';

function WatchlistButtons({
  artworkConverted,
  removeFromWatchlist,
  page,
  filter,
  sale,
  setCurrentArtwork,
  ratesFetching,
}) {
  const { account } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const IsArtworkParams = currentArtwork =>
    !(
      currentArtwork.style.length &&
      currentArtwork.surface.length &&
      currentArtwork.medium.length &&
      currentArtwork.width > 0 &&
      currentArtwork.height > 0 &&
      currentArtwork.thickness > 0 &&
      currentArtwork.weight >= ARTWORK_WEIGHT_MINIMUM
    );

  const addToCartWithCheck = artworkConverted => {
    return dispatch(
      checkOrderAvailability({ ...artworkConverted, fromWatchlist: true })
    );
  };

  return (
    <div
      className={`${styles.btns_wrapper} ${!sale &&
        styles.btns_wrapper__right}`}
    >
      <TradeButtons
        isFromWatchlist
        addToCart={() => addToCartWithCheck(artworkConverted)}
        isArtist={!!account.is_artist}
        currentArtwork={artworkConverted}
        isSold={
          artworkConverted.ownerInfo.profile_id !== artworkConverted.profile_id
        }
        inOffer={artworkConverted.inOffer}
        isArtworkOwner={
          account.profile_id === artworkConverted.ownerInfo.profile_id
        }
        setOfferOpenCheck={() => setCurrentArtwork(artworkConverted)}
        IsArtworkParams={() => IsArtworkParams(artworkConverted)}
        inCart={artworkConverted.inCart}
        isUser={!!account.token}
        ratesFetching={ratesFetching}
      />
      <button
        className={styles.button}
        onClick={() =>
          removeFromWatchlist({
            artworkId: artworkConverted.id,
            isSale: sale,
            filter,
            page,
          })
        }
        type="button"
      >
        <span className={styles.button__text}>{REMOVE_FROM_LIST}</span>
        <span className={styles.button__text_mobile}>{REMOVE}</span>
      </button>
    </div>
  );
}

export default WatchlistButtons;
