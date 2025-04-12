import AddToCardButton from 'components/artwork/artwork-page/add-to-card-button';
import MakeAnOfferButton from 'components/artwork/artwork-page/make-an-offer-button';
import React from 'react';
import { Skeleton } from '@material-ui/lab';
import checkArtworkDimensions from 'redux/artwork/thunks/check-artwork-dimensions';
import checkIsArtworkInOrder from 'redux/artwork/thunks/check-is-artwork-in-order';
import classnames from 'classnames';
import { getValidPrice } from 'helpers/getValidPrice';
import styles from './artwork-page.module.scss';
import stylesWatchlist from 'components/collector/collector-watchlist/collector-watchlist.module.scss';
import { useDispatch } from 'react-redux';

function TradeButtons({
  isFromWatchlist,
  addToCart,
  loading,
  isArtist,
  currentArtwork,
  isSold,
  inOffer,
  isArtworkOwner,
  setOfferOpenCheck,
  IsArtworkParams,
  inCart,
  isUser,
  ratesFetching,
}) {
  const dispatch = useDispatch();
  const detailsActions = classnames(
    `${
      isFromWatchlist
        ? stylesWatchlist.details__actions
        : styles.details__actions
    }`
  );

  function checkUserInfo() {
    const { ownerAddress, ownerInfo } = currentArtwork;

    return !Boolean(
      Object.keys(ownerAddress).length && Object.keys(ownerInfo).length
    );
  }

  function checkDimension() {
    const artworkSizes = {
      width: currentArtwork.width,
      height: currentArtwork.height,
      thickness: currentArtwork.thickness,
      length: currentArtwork.length,
    };
    return dispatch(checkArtworkDimensions(false, artworkSizes));
  }

  function checkIsInOrder() {
    return dispatch(
      checkIsArtworkInOrder({
        inOrder: currentArtwork.inOrder,
      })
    );
  }

  const showAddToCartBtn =
    !isArtist &&
    !isArtworkOwner &&
    !isSold &&
    currentArtwork.for_sale &&
    getValidPrice(currentArtwork.price);

  if (loading && !currentArtwork.id) {
    return (
      <div className={styles.details__actions}>
        <Skeleton height={60} variant="rect" width="100%" />
      </div>
    );
  }

  return showAddToCartBtn ? (
    <div className={detailsActions}>
      <AddToCardButton
        isFromWatchlist={isFromWatchlist}
        addToCart={addToCart}
        inCart={inCart}
        inOffer={inOffer}
        checkUserInfo={checkUserInfo}
        checkDimension={checkDimension}
        checkIsInOrder={checkIsInOrder}
        IsArtworkParams={IsArtworkParams}
        price={currentArtwork.price}
        forSale={currentArtwork.for_sale}
      />
      <MakeAnOfferButton
        currentArtwork={currentArtwork}
        isFromWatchlist={isFromWatchlist}
        inOffer={inOffer}
        isArtist={isArtist}
        IsArtworkParams={IsArtworkParams}
        isForSale={currentArtwork.for_sale}
        isUser={isUser}
        checkUserInfo={checkUserInfo}
        checkDimension={checkDimension}
        setOfferOpenCheck={setOfferOpenCheck}
        ratesFetching={ratesFetching}
      />
    </div>
  ) : (
    <div className={detailsActions}>
      <MakeAnOfferButton
        currentArtwork={currentArtwork}
        isFromWatchlist={isFromWatchlist}
        inOffer={inOffer}
        isArtist={isArtist}
        checkUserInfo={checkUserInfo}
        checkDimension={checkDimension}
        IsArtworkParams={IsArtworkParams}
        isForSale={currentArtwork.for_sale}
        isUser={isUser}
        setOfferOpenCheck={setOfferOpenCheck}
        ratesFetching={ratesFetching}
      />
    </div>
  );
}

export default TradeButtons;
