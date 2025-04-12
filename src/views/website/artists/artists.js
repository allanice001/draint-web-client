import { ArtistsList, ArtistsSearch, Counter, Reasons } from 'components/lib';
import {
  getFirstArtists,
  getMoreNewArtist,
  getMorePublicArtist,
  getNewPublicArtist,
  getPublicArtist,
  setChecked,
  setPage,
  setSearch,
  setStateFromCookies,
} from 'redux/artists/actions/artistsActions';
import { resetFilters, setFilter } from 'redux/global/filters/filtersActions';

import ArtistFeatures from 'components/artist/artist-features/artist-features';
import Helmet from 'components/helmet';
import PinterestTag from 'external-lib/pinterestTag';
import React from 'react';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pageScroll } from 'services/pageScroller';
import styles from './artists.module.scss';
import { withRouter } from 'react-router';

class Artists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    ReactGA.pageview(window.location.pathname);
    ReactPixel.pageView();
    PinterestTag.pageView();
    const { actions, filters } = this.props;
    const { currentArtists } = this.props.publicArtists;
    if (!currentArtists.length) {
      actions.getPublicArtist(false, filters.name, 1, filters.country);
      actions.getNewPublicArtist();
      actions.setPage({ allCurrentPage: 1, newArtistPage: 1 });
    }
    pageScroll();
  }

  handleSearch = async data => {
    const { country, name, hashtag } = data;
    Object.entries(data).forEach(([key, value]) =>
      this.props.actions.setFilter(key, value)
    );
    const { getPublicArtist } = this.props.actions;
    await getPublicArtist(false, name, 1, country, hashtag);
  };

  onShowMore = async (curPage, type) => {
    const page = curPage + 1;
    if (type === 'new') {
      const { newArtists } = this.props.publicArtists;
      const { getMoreNewArtist, setPage } = this.props.actions;
      await setPage({ newArtistPage: page });
      getMoreNewArtist(newArtists, page);
    } else {
      const { currentArtists } = this.props.publicArtists;
      const { getMorePublicArtist, setPage } = this.props.actions;
      const { country, name, hashtag } = this.props.filters;
      await setPage({ allCurrentPage: page });
      getMorePublicArtist(currentArtists, name, page, country, hashtag);
    }
  };

  onFirstPage = async (artists, type = '') => {
    this.props.actions.getFirstArtists(artists, type);
  };

  render() {
    const {
      loadingAll,
      loadingNew,
      currentArtists,
      checked,
      totalPages,
      sellerCurrentPage,
      allCurrentPage,
      totalCountries,
      totalArtists,
      totalArtworks,
      countries,
      newArtists,
      newArtistPages,
      newArtistPage,
    } = this.props.publicArtists;
    const { country, name, hashtag } = this.props.filters;
    const { resetFilters } = this.props.actions;
    const { hasSearchParams } = this.props;

    const isShowMore = checked
      ? totalPages > 1 && totalPages !== sellerCurrentPage
      : totalPages > 1 && totalPages !== allCurrentPage;

    const description =
      'We accompany artists through the digital age. With our profiles we become the single' +
      ' place for artists to show up online. Manage your social media appearance and sell your work with us.';
    const keywords =
      'find artists, find art, find artworks, find paintings, search art,' +
      'search artists, search galleries';
    return (
      <>
        <Helmet description={description} keywords={keywords} />

        <ArtistsSearch
          loading={loadingAll}
          country={country}
          countries={hasSearchParams ? countries : []}
          name={name}
          hashtag={hashtag}
          resetFilters={resetFilters}
          handleSearch={this.handleSearch}
        >
          {hasSearchParams && (
            <Counter
              loading={loadingAll}
              countries={hasSearchParams ? totalCountries : 0}
              artists={hasSearchParams ? totalArtists : 0}
              artworks={hasSearchParams ? totalArtworks : 0}
            />
          )}
        </ArtistsSearch>

        <ArtistsList
          loading={loadingAll}
          list={currentArtists}
          onShowMore={() => this.onShowMore(allCurrentPage)}
          onFirstPage={() => this.onFirstPage(currentArtists)}
          isShowMore={isShowMore}
          isShowFirst={allCurrentPage > 1}
        />

        <ArtistFeatures isArtist={this.props.user.is_artist} />

        <ArtistsList
          title="New Artists"
          length={4}
          loading={loadingNew}
          className={styles.artists}
          list={newArtists}
          onShowMore={() => this.onShowMore(newArtistPage, 'new')}
          onFirstPage={() => this.onFirstPage(newArtists, 'new')}
          isShowMore={newArtistPages !== newArtistPage}
          isShowFirst={newArtistPage > 1}
        />

        <Reasons showFooter is_artist={this.props.user.is_artist} />
      </>
    );
  }
}

function mapStateToProps(store) {
  const { filters } = store;
  const { name, country, hashtag } = filters;

  return {
    user: store.user.account,
    publicArtists: store.artists.publicArtists,
    filters: store.filters,
    hasSearchParams: name || country.length || hashtag,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setFilter,
        resetFilters,
        setChecked,
        setPage,
        setSearch,
        setStateFromCookies,
        getPublicArtist,
        getMorePublicArtist,
        getNewPublicArtist,
        getMoreNewArtist,
        getFirstArtists,
      },
      dispatch
    ),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Artists)
);
