import * as actions from 'redux/artwork/actions/artworkActions';
import { NAME, USERNAME } from 'constants/profile-settings';
import { useDispatch, useSelector } from 'react-redux';
import { ARTWORK_WEIGHT_MINIMUM } from 'constants/components/artwork-page';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import { SEARCH_ARTISTS } from 'constants/routes/publicModule/artist';
import checkArtworkDimensions from 'redux/artwork/thunks/check-artwork-dimensions';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { roles } from 'helpers/get-role';
import { useHistory } from 'react-router';

const HelperForAnalytic = AnalyticHelper.create();

export const useArtworkPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { artworkData } = useSelector(store => store.artwork);
  const { makeOfferForm } = useSelector(store => store.form);

  const {
    account,
    account: {
      id: artworkBuyerAccountId,
      profile_id: buyerProfileId,
      is_artist: isArtistRole,
    },
    account: { id: accountId, profile_id: accountProfileId, subscription },
    query: { success: isLoadingUser, fetching },
  } = useSelector(store => store.user);

  const { artworkDetailForm } = useSelector(store => store.form);

  const {
    gallerySteps,
    currentArtwork,
    mediumsList,
    stylesList,
    surfacesList,
    hashtags: artworkHashtags,
    inOrder,
    inOffer,
    inCart,
    loading,
    isOwnerCanEditArtwork,
    offerModalOpen,
    deleteModalOpen,
    editMode,
    isUsername,
    galleryModalOpen,
    profile_id: artistProfileId,
    artworkPageUnloggedModal,
  } = artworkData;

  const {
    id: artworkId,
    title: artworkName,
    price: artworkPrice,
    small_image: smallImage,
    primary_image: primaryImage,
    ownerInfo: {
      account_id: artworkSellerAccountId,
      profile_id: sellerProfileId,
      firstName: ownerFirstName,
      lastName: ownerLastName,
      username: ownerUsername,
      isArtist: ownerIsArtist,
    },
    authorInfo: {
      firstName: authorFirstName,
      lastName: authorLastName,
      username: authorUsername,
    },
    for_sale: forSale,
    verification,
    description,
    owner_profile_id: ownerProfileId,
    purchase_history: purchaseHistoryData,
    purchase_history: { artworks_purchase_history: artworkPurchaseHistory },
    shipping: { rates: shippingRates, lowestRatePrice: lowesRate },
    ownerAddress: artworkOwnerAddress,
    ratesFetching,
    ratesRequested,
    style,
    surface,
    medium,
    width,
    height,
    thickness,
    weight,
    completed,
  } = currentArtwork;

  const {
    isEditorOrAdmin,
    canEditArtistArtwork,
    isSuperAdmin,
    isAnyAdmins,
  } = roles({
    permission: account.permission,
    new_permission: account.new_permission,
    urls: account.urls,
  });

  const isUser = !!accountId;
  const canEditRoles =
    isSuperAdmin || (isEditorOrAdmin && canEditArtistArtwork);
  const isArtist = !!isArtistRole;
  const isArtworkArtist = accountProfileId === artistProfileId;
  const isArtworkOwner = accountProfileId === ownerProfileId;
  const isSold = ownerProfileId !== artistProfileId;
  const breadcrumbs = [
    { url: '/', label: 'Home' },
    { url: SEARCH_ARTISTS, label: 'Artists' },
    {
      url: getArtistGalleryURL(authorUsername),
      label: !loading && getArtistName(),
      isArtist: ownerIsArtist,
    },
    {
      url: getArtworkUrl(artworkId, artworkName, authorUsername),
      label: !loading && artworkName,
    },
  ];

  function isArtistOwner() {
    return (isArtworkArtist && isArtworkOwner) || canEditRoles;
  }

  function isOwner() {
    return isOwnerCanEditArtwork && isArtworkOwner;
  }

  function canEdit() {
    return (isOwner() || canEditRoles) && (isOwnerCanEditArtwork || !isSold);
  }

  function canDelete() {
    return isOwnerCanEditArtwork && !isSold;
  }

  const artworkSaleStatusData = {
    artist_id: artistProfileId,
    owner: ownerProfileId,
    for_sale: forSale,
    isOwnerCanEditArtwork,
  };

  function addToCart() {
    dispatch(actions.checkOrderAvailability());
  }

  function setOfferOpenCheck() {
    if (!account?.location) {
      return true;
    }

    dispatch(actions.checkOfferAvailability(history, getOfferShipmentRates));
  }

  function sendOffer() {
    dispatch(
      actions.sendOfferRequest({
        price: makeOfferForm.values.price,
        artwork_id: artworkId,
        to_account: artworkSellerAccountId,
        from_account: artworkBuyerAccountId,
      })
    );
    // dispatch(actions.setOfferModal(false));
  }

  function forSaleStatusChange() {
    dispatch(actions.changeArtworkSaleStatus(artworkId, forSale));
    const eventName = !forSale
      ? 'ArtworkStatusChangedForSale'
      : 'ArtworkStatusChangedNotForSale';

    HelperForAnalytic.createEvent(eventName);
  }

  function getOfferShipmentRates() {
    if (!!!shippingRates.length) {
      getShipmentRates();
      dispatch(actions.setOfferModal(true));
    }

    if (!!shippingRates.length) {
      dispatch(actions.setOfferModal(true));
    }
  }

  function getShipmentRates() {
    dispatch(actions.getRates(buyerProfileId, sellerProfileId, artworkId));
  }

  function verify(id, status, artistId) {
    dispatch(actions.changeArtworkStatus(id, status, artistId));
  }

  function getArtistName() {
    const default_name =
      authorFirstName && authorLastName
        ? `${authorFirstName} ${authorLastName}`
        : authorFirstName || authorLastName || authorUsername;

    if (authorFirstName && authorLastName && isUsername === NAME)
      return `${authorFirstName} ${authorLastName}`;

    if (authorUsername && isUsername === USERNAME) return authorUsername;

    return default_name;
  }

  function getOwnerName() {
    const default_name =
      ownerFirstName && ownerLastName
        ? `${ownerFirstName} ${ownerLastName}`
        : ownerFirstName || ownerLastName || ownerUsername;

    if (ownerFirstName && ownerLastName && isUsername === NAME)
      return `${ownerFirstName} ${ownerLastName}`;

    if (ownerUsername && isUsername === USERNAME) return ownerUsername;

    return default_name;
  }

  function IsArtworkParams() {
    return !(
      style.length &&
      surface.length &&
      medium.length &&
      width > 0 &&
      height > 0 &&
      thickness > 0 &&
      weight >= ARTWORK_WEIGHT_MINIMUM
    );
  }

  return {
    fetching,
    addToCart,
    setOfferOpenCheck,
    sendOffer,
    closeOfferModal: () => dispatch(actions.setOfferModal(false)),
    checkRequiredInfoForSale: () =>
      dispatch(actions.checkRequiredInfoForSale()),
    setDeleteModal: state => dispatch(actions.setDeleteModal(state)),
    setEditMode: state => dispatch(actions.setEditMode(state)),
    setGalleryModal: state => dispatch(actions.setGalleryModal(state)),
    forSaleStatusChange,
    getShipmentRates,
    getArtistName,
    getOwnerName,
    verify,
    isOwner,
    canEdit,
    canDelete,
    isUser,
    isArtist,
    isArtistOwner,
    isSold,
    isArtworkArtist,
    isArtworkOwner,
    isAnyAdmins,
    account,
    isLoadingUser,
    artistProfileId,
    ownerProfileId,
    forSale,
    verification,
    description,
    gallerySteps,
    currentArtwork,
    mediumsList,
    stylesList,
    surfacesList,
    artworkHashtags,
    inOrder,
    inOffer,
    inCart,
    loading,
    isOwnerCanEditArtwork,
    offerModalOpen,
    artworkData,
    artworkSaleStatusData,
    artworkEditForm: artworkDetailForm,
    editFormValues: artworkDetailForm?.values,
    breadcrumbs,
    artworkId,
    artworkName,
    artworkPrice,
    smallImage,
    primaryImage,
    purchaseHistoryData,
    shippingRates,
    lowesRate,
    isEditorOrAdmin,
    canEditArtistArtwork,
    isSuperAdmin,
    canEditRoles,
    deleteModalOpen,
    editMode,
    galleryModalOpen,
    galleryImages: Object.values(gallerySteps),
    subscription,
    IsArtworkParams,
    isHavePurchaseHistory: !!artworkPurchaseHistory.length,
    checkArtworkDimensions: state => dispatch(checkArtworkDimensions(state)),
    handleSendRequest: state => dispatch(actions.sendRequest(state)),
    ratesFetching,
    ratesRequested,
    setArtworkPageUnloggedModal: state =>
      dispatch(actions.setArtworkPageUnloggedModal(state)),
    artworkOwnerAddress,
    accountProfileId,
    style,
    surface,
    medium,
    width,
    height,
    thickness,
    weight,
    completed,
    artworkPageUnloggedModal,
  };
};
