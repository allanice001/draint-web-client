import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ARTWORK_WEIGHT_MINIMUM } from 'constants/components/artwork-page';
import AddToCardButton from '../artwork-page/add-to-card-button';
import { ButtonRounded } from 'components/button-rounded/button-rounded';
import { HOVER_FROM } from 'constants/components/homepage';
import Icons from 'components/icons';
import { RED_COLOR } from 'constants/colors';
import { SHOW_DETAILS } from 'constants/artwork';
import { addToWatchlist } from 'redux/dashboard/actions/watchlistActions';
import checkArtworkDimensions from 'redux/artwork/thunks/check-artwork-dimensions';
import { checkArtworkIsInWatchlist } from 'helpers/checkArtworkIsInWatchlist';
import checkIsArtworkInOrder from 'redux/artwork/thunks/check-is-artwork-in-order';
import { checkOrderAvailability } from 'redux/artwork/actions/artworkActions';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { useHistory } from 'react-router-dom';

export const ArtworkCardHover = ({ fullArtworkInfo, addToCartFrom }) => {
  const { watchlistFull } = useSelector(state => state.dashboard.watchlist);
  const { inTrade } = useSelector(state => state.search.searchResult);
  const { is_artist: isArtist } = useSelector(store => store.user.account);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
  const isShowButton = !isArtist && !inTrade;

  const addToCartWithCheck = () => {
    return dispatch(
      checkOrderAvailability({ ...fullArtworkInfo, addToCartFrom })
    );
  };

  const checkUserInfo = () => {
    const { ownerAddress = {}, ownerData } = fullArtworkInfo;

    return !Boolean(
      Object.keys(ownerAddress).length && Object.keys(ownerData).length
    );
  };

  const addArtworkToWatchlist = () =>
    dispatch(
      addToWatchlist(
        {
          id: fullArtworkInfo.id,
          owner_profile_id: fullArtworkInfo.owner_profile_id,
          title: fullArtworkInfo.title,
          username:
            fullArtworkInfo.profile?.username || fullArtworkInfo.username,
        },
        setIsAddedToWatchlist
      )
    );

  const IsArtworkParams = () =>
    !(
      fullArtworkInfo.styles?.length &&
      fullArtworkInfo.surfaces?.length &&
      fullArtworkInfo.mediums?.length &&
      fullArtworkInfo.width > 0 &&
      fullArtworkInfo.height > 0 &&
      fullArtworkInfo.thickness > 0 &&
      fullArtworkInfo.weight >= ARTWORK_WEIGHT_MINIMUM
    );

  const checkIsInOrder = () => {
    return dispatch(
      checkIsArtworkInOrder({
        inOrder: fullArtworkInfo.inOrder,
      })
    );
  };

  const checkDimension = () => {
    const artworkSizes = {
      width: fullArtworkInfo.width,
      height: fullArtworkInfo.height,
      thickness: fullArtworkInfo.thickness,
      length: fullArtworkInfo.length,
    };
    return dispatch(checkArtworkDimensions(false, artworkSizes));
  };

  useEffect(() => {
    setIsAddedToWatchlist(
      checkArtworkIsInWatchlist(watchlistFull, fullArtworkInfo.id)
    );
  }, [watchlistFull, fullArtworkInfo.id]);

  return (
    <>
      {isShowButton && (
        <AddToCardButton
          isFromArtworkCard={addToCartFrom}
          addToCart={addToCartWithCheck}
          inCart={fullArtworkInfo.inCart}
          checkUserInfo={checkUserInfo}
          checkIsInOrder={checkIsInOrder}
          price={fullArtworkInfo.price}
          forSale={fullArtworkInfo.forSale || fullArtworkInfo.sold}
          IsArtworkParams={IsArtworkParams}
          checkDimension={checkDimension}
        />
      )}
      <ButtonRounded
        classname={
          addToCartFrom === HOVER_FROM.artworkGalleryCard
            ? 'galleryCard'
            : 'artworkCard'
        }
        onClick={() =>
          history.push(
            getArtworkUrl(
              fullArtworkInfo.id,
              fullArtworkInfo.title,
              fullArtworkInfo.username
            )
          )
        }
        text={SHOW_DETAILS}
      />
      <ButtonRounded
        classname={
          addToCartFrom === HOVER_FROM.artworkGalleryCard
            ? 'iconGalleryHeart'
            : 'iconHeart'
        }
        disabled={isAddedToWatchlist}
        icon={<Icons.HeartBlank color={isAddedToWatchlist && RED_COLOR} />}
        onClick={() => {
          addArtworkToWatchlist();
        }}
      />
    </>
  );
};
