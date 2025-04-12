import { AddArtworkToCartEvent } from 'redux/pricing/thunks/send-analytics-event';
import { HOVER_FROM } from 'constants/components/homepage';
import Icons from 'components/icons';
import React from 'react';
import styles from './artwork-page.module.scss';
import stylesArtworkCard from 'components/artwork/artwork-card/artwork-card.module.scss';
import stylesArtworkGallery from 'components/artwork/artwork-gallery-card/artwork-gallery-card.module.scss';
import stylesWatchlist from 'components/collector/collector-watchlist/collector-watchlist.module.scss';

const AddToCardButton = ({
  isFromArtworkCard,
  isFromWatchlist,
  inCart,
  IsArtworkParams,
  addToCart,
  checkUserInfo,
  checkDimension,
  checkIsInOrder,
  price,
  forSale,
}) => {
  function isDisabled() {
    return Boolean(inCart || IsArtworkParams() || checkUserInfo() || !forSale);
  }

  function onClick() {
    if (checkDimension() || checkIsInOrder()) {
      return false;
    }

    AddArtworkToCartEvent(price);
    return addToCart();
  }

  return (
    <button
      className={`primary-button ${
        isFromWatchlist
          ? stylesWatchlist.button__add
          : isFromArtworkCard === HOVER_FROM.artworkCard
          ? stylesArtworkCard.button__add
          : isFromArtworkCard === HOVER_FROM.artworkSearchCard
          ? stylesArtworkCard.button__add
          : isFromArtworkCard === HOVER_FROM.artworkGalleryCard
          ? stylesArtworkGallery.button__add
          : styles.button__add
      }`}
      disabled={isDisabled()}
      onClick={() => onClick()}
      type="button"
    >
      <Icons.Cart
        className={`${
          isFromWatchlist
            ? stylesWatchlist.icon
            : isFromArtworkCard === HOVER_FROM.artworkCard
            ? stylesArtworkCard.icon
            : isFromArtworkCard === HOVER_FROM.artworkSearchCard
            ? stylesArtworkCard.icon
            : isFromArtworkCard === HOVER_FROM.artworkGalleryCard
            ? stylesArtworkGallery.icon
            : styles.icon
        }`}
      />{' '}
      Add to Cart
    </button>
  );
};

export default AddToCardButton;
