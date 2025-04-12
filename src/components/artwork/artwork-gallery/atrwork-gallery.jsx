import {
  LIST_OF_PAGE_SIZE,
  SERIES,
  SUBS_MODAL_TITLE,
} from 'constants/components/artwork-gallery/constants';
import React, { useEffect, useState } from 'react';
import {
  addToSeries,
  artworksGalleryRequest,
  artworksInitialRequest,
  createSeries,
  deleteSeries,
  getArtistArtworks,
  getArtistSeries,
  removeFromSeries,
  updateSeries,
  uploadArtistArtwork,
} from 'redux/artist/actions/artistProfileActions';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import ArtistCollectorModal from 'components/basic-modal/artist-collector-modal/artist-collector-modal';
import ArtworkConnectSeriesModal from 'components/artwork/artwork-series-modal/artwork-series-connect-modal';
import ArtworkCreateSeriesModal from 'components/artwork/artwork-series-modal/artwork-series-modal';
import ArtworkPageUnloggedModal from 'components/artwork/artwork-page-unlogged-modal/artwork-page-unlogged-modal';
import { ArtworksList } from './artworks-list';
import { FilterList } from './filter-list-flag';
import { GalleryButtons } from './gallery-buttons';
import Pagination from 'components/collector/collector-offers/components/pagination/pagination';
import PricingModal from 'views/website/pricing/pricing-modal/pricing-modal';
import { Skeleton } from '@material-ui/lab';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { bindActionCreators } from 'redux';
import checkIsArtworkCanUpload from 'redux/artwork/thunks/check-is-artwork-can-upload';
import { connect } from 'react-redux';
import { pageScroll } from 'services/pageScroller';
import styles from './artwork-gallery.module.scss';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

const Analytic = AnalyticHelper.create();

function ArtworkGallery({
  actions,
  artworks,
  series,
  loading,
  username,
  isMaster,
  isOwner,
  canEdit,
  account,
  currentUserProfile,
  pagination,
}) {
  const [filterBy, setFilterBy] = useState('');
  const [currentSeries, setSeries] = useState('');
  const [isPricingOpen, setIsPricingIsOpen] = useState(false);
  const [seriesIsOpen, setSeriesIsOpen] = useState(false);
  const [connectIsOpen, setConnectIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(6);
  const { params } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    actions.artworksGalleryRequest(username);
  }, [username, actions]);

  useEffect(() => {
    if (!!params.username) {
      return Analytic.createEvent('PageView');
    }
  }, [params]);

  const editSeries = id => {
    setSeries(id);
    setConnectIsOpen(true);
  };

  const deleteSeries = id => {
    Analytic.createEvent('SeriesWereDeleted');
    actions.deleteSeries({ id }, series);
  };

  const createSeries = async data => {
    Analytic.createEvent('NewSeriesWereCreated');
    data.profile_id = account.profile_id;
    const newId = await actions.createSeries(data, series);
    setSeriesIsOpen(false);
    editSeries(newId);
  };

  const connectClose = () => {
    setConnectIsOpen(false);
    setSeries('');
    actions.artworksGalleryRequest(username);
  };

  const handleAddPainting = () => {
    actions.checkIsArtworkCanUpload(history, setIsPricingIsOpen);
  };

  function handlePage(page) {
    pageScroll(600);
    actions.artworksGalleryRequest(username, page, pageSize);
  }

  function handelPageSize(limit) {
    setPageSize(limit);
    pageScroll(600);
    actions.artworksGalleryRequest(username, 1, limit);
  }

  const viewedArtworks = FilterList({
    list: artworks,
    filterBy,
    canEdit,
    series,
    editSeries,
    deleteSeries,
    handleAddPainting,
    total: pagination.rowCount,
  });

  if (loading) {
    return <Skeleton height={250} variant="text" />;
  }

  if (currentUserProfile.loading) return <Spinner full />;

  return (
    <>
      <div className={styles.wrapper}>
        {canEdit && (
          <GalleryButtons
            isMaster={isMaster}
            isOwner={isOwner}
            canEdit={canEdit}
            setSeriesIsOpen={setSeriesIsOpen}
            setFilterBy={setFilterBy}
            handleAddPainting={handleAddPainting}
          />
        )}

        <ArtworksList
          viewedArtworks={viewedArtworks}
          isMaster={isMaster}
          isArtist={account.isArtist}
          canEdit={canEdit}
        />

        <ArtworkCreateSeriesModal
          handleClose={() => setSeriesIsOpen(false)}
          onSubmit={createSeries}
          open={seriesIsOpen}
        />

        <ArtworkConnectSeriesModal
          add={actions.addToSeries}
          artworks={artworks}
          handleClose={connectClose}
          open={connectIsOpen}
          remove={actions.removeFromSeries}
          series={series}
          seriesId={currentSeries}
          updateSeries={actions.updateSeries}
        />

        <ArtworkPageUnloggedModal />

        <ArtistCollectorModal />

        <PricingModal
          isOpen={isPricingOpen}
          handleClose={setIsPricingIsOpen}
          title={SUBS_MODAL_TITLE}
        />

        {pagination.rowCount > 6 && filterBy !== SERIES && (
          <div className={styles.pagination_wrapper}>
            <Pagination
              listOfPageSize={LIST_OF_PAGE_SIZE}
              page={pagination.page}
              maxCount={pagination.rowCount}
              pages={pagination.pageCount}
              setPage={page => {
                handlePage(page);
              }}
              setCount={limit => {
                handelPageSize(limit);
              }}
              count={artworks.length}
            />
          </div>
        )}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.artist.currentArtist.artworkLoading,
    artworks: state.artist.currentArtist.artworks,
    account: state.artist.currentArtist.account,
    avatar: state.artist.currentArtist.account.avatar,
    theme: state.artist.currentArtist.account.theme,
    series: state.artist.currentArtist.series,
    pagination: state.artist.currentArtist.pagination,
    currentUserProfile: state.user.account,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        artworksGalleryRequest,
        artworksInitialRequest,
        getArtistArtworks,
        getArtistSeries,
        uploadArtistArtwork,
        addToSeries,
        removeFromSeries,
        createSeries,
        deleteSeries,
        updateSeries,
        checkIsArtworkCanUpload,
      },
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkGallery);
