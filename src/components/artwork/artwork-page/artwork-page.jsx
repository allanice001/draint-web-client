import * as actions from 'redux/artwork/actions/artworkActions';
import {
  MEDIUM,
  META_TITLE_PAINTING,
  STYLE,
  SURFACE,
} from 'constants/components/artwork-page';
import React, { useEffect, useMemo, useState } from 'react';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import ArtistCollectorModal from 'components/basic-modal/artist-collector-modal/artist-collector-modal';
import ArtworkDeleteModal from 'components/basic-modal/artwork-delete-modal';
import ArtworkDeletedPage from 'components/artwork/artwork-page-deleted/artwork-page-deleted';
import ArtworkGalleryModal from 'components/artwork/artwork-gallery-modal/artwork-gallery-modal';
import ArtworkOfferModal from 'components/artwork/artwork-page-offer-modal/artwork-page-offer-modal';
import ArtworkPageBreadcrumbs from 'components/artwork/artwork-page-breadcrumbs/artwork-page-breadcrumbs';
import ArtworkPageFeatures from 'components/artwork/artwork-page-features/artwork-page-features';
import ArtworkPageUnloggedModal from 'components/artwork/artwork-page-unlogged-modal/artwork-page-unlogged-modal';
import ArtworkSalesHistory from 'views/website/artworks/layouts/artwork-sales-history';
import { DELETED } from 'constants/components/master/artists';
import { EditButtons } from './edit-buttons';
import Helmet from 'components/helmet';
import NotFoundPage from 'pages/not-found';
import { PENDING } from 'constants/statuses';
import PageDetails from 'components/artwork/artwork-page/page-details';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { TITLE_WASNT_SPECIFIED } from 'constants/components/artworks.contants';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { pageScroll } from 'services/pageScroller';
import { setPrevPrice } from 'helpers/artowork-card/set-prev-price';
import { useArtworkPage } from 'hooks/use-artwork-page';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { withRouter } from 'react-router';

const HelperForAnalytic = AnalyticHelper.create();

function ArtworkPage() {
  const [currentImg, setCurrent] = useState(0);
  const [hashtags, setHashtags] = useState([]);
  const [deletedHashtags, setDeletedHashtags] = useState([]);
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const {
    setDeleteModal,
    setGalleryModal,
    isArtistOwner,
    isArtworkArtist,
    isArtworkOwner,
    isAnyAdmins,
    verification,
    description,
    currentArtwork,
    mediumsList,
    stylesList,
    surfacesList,
    artworkHashtags,
    loading,
    breadcrumbs,
    artworkId,
    artworkName,
    purchaseHistoryData,
    isEditorOrAdmin,
    deleteModalOpen,
    galleryModalOpen,
    galleryImages,
    isHavePurchaseHistory,
    checkArtworkDimensions,
    handleSendRequest,
    editFormValues,
    authorUsername,
    setEditMode,
    fetching,
  } = useArtworkPage();

  const isNotFound = !loading && !isAnyAdmins && !isArtworkOwner;

  useEffect(() => {
    pageScroll();

    dispatch(
      actions.initialRequest({
        id: match.params.id,
        cartHash: localStorage.cartId,
      })
    );

    HelperForAnalytic.createEvent('PageView', {
      url: getArtworkUrl(artworkId, artworkName, authorUsername),
    });

    HelperForAnalytic.createEvent('ArtworkViewed', {
      contents: {
        id: artworkId,
        title: artworkName || TITLE_WASNT_SPECIFIED,
        author_username: authorUsername,
      },
    });

    return () => {
      setEditMode(false);
      setDeleteModal(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    setDeletedHashtags([]);
    setHashtags(artworkHashtags);
  }, [artworkHashtags]);

  function getCurrentValue(array, form, key) {
    return array
      .filter(obj => form[key].includes(obj.value))
      .map(obj => obj.id);
  }

  function prepareArtworkFormData() {
    return {
      ...editFormValues,
      medium: getCurrentValue(mediumsList, editFormValues, MEDIUM),
      style: getCurrentValue(stylesList, editFormValues, STYLE),
      surface: getCurrentValue(surfacesList, editFormValues, SURFACE),
      completed: Date.parse(new Date(editFormValues.completed)),
      hashtags: hashtags.filter(obj => !obj.hashtag_id).map(obj => obj.name),
      deletedHashtags: deletedHashtags,
      prevPrice: setPrevPrice(editFormValues.price, currentArtwork.price),
    };
  }

  // form submit
  function sendRequest() {
    if (!checkArtworkDimensions(true)) {
      handleSendRequest(prepareArtworkFormData());
    }
  }

  if (fetching || loading) return <Spinner full />;

  if (isNotFound && verification === PENDING) {
    return <NotFoundPage />;
  }

  if (verification === DELETED) {
    return <ArtworkDeletedPage permissions={isArtistOwner()} />;
  }

  return (
    <section>
      <Helmet title={currentArtwork.title + ' ' + META_TITLE_PAINTING} />
      <ArtworkPageBreadcrumbs list={breadcrumbs}>
        <EditButtons sendRequest={sendRequest} />
      </ArtworkPageBreadcrumbs>

      <ArtworkGalleryModal
        open={galleryModalOpen}
        currentImage={currentImg}
        setCurrentImage={setCurrent}
        handleClose={() => {
          setGalleryModal(false);
          setCurrent(currentImg);
        }}
        description={description}
        gallery={galleryImages.map(el => el.imgPath)}
      />

      <ArtworkOfferModal />

      <ArtworkDeleteModal
        artworkId={artworkId}
        isOpen={deleteModalOpen}
        setOpen={() => setDeleteModal(false)}
      />

      <PageDetails
        initialValues={currentArtwork}
        onSubmit={sendRequest}
        setCurrent={setCurrent}
        currentImg={currentImg}
        setHashtags={setHashtags}
        hashtags={hashtags}
        setDeletedHashtags={setDeletedHashtags}
        deletedHashtags={deletedHashtags}
      />

      {(isArtworkArtist ||
        isArtworkOwner ||
        isHavePurchaseHistory ||
        isEditorOrAdmin) && (
        <ArtworkSalesHistory
          loading={loading}
          purchaseHistory={purchaseHistoryData}
        />
      )}

      {!isArtworkArtist && !isEditorOrAdmin && <ArtworkPageFeatures />}

      <ArtworkPageUnloggedModal />

      <ArtistCollectorModal />
    </section>
  );
}

export default withRouter(ArtworkPage);
