import React, { useEffect, useState } from 'react';
import {
  addToCatalog,
  closeFbCatalogSnackbar,
  getArtworks,
  pageChange,
} from 'redux/master/actions/fbCatalogActions';
import { connect, useSelector } from 'react-redux';

import ArtworkCardSkeleton from 'components/skeletons/artwork-card/artwork-card-sk';
import ArtworkMasterCard from 'components/artwork/artwork-master-card/artwork-masters-card';
import { MasterFBCatalogNav } from 'components/nav/sub/fbCatalog';
import PaginationControlled from 'components/pagination/paginationNumbers';
import SearchBar from 'components/searchBar/searchBar';
import { bindActionCreators } from 'redux';
import styles from './artists.module.scss';

const FbCatalog = ({ actions }) => {
  const { totalPages, page, currentArtworks } = useSelector(
    store => store.master.fbCatalog
  );

  const [query, setQuery] = useState(null);

  useEffect(() => {
    actions.getArtworks(page, query);
  }, [actions, page, query]);

  const handlePageChange = page => {
    actions.pageChange(page, query);
  };

  const addToCatalog = id => {
    actions.addToCatalog(id, page);
  };

  const handleSearch = value => {
    setQuery(value);
  };

  return (
    <div className={styles.wrapper}>
      <MasterFBCatalogNav />
      <SearchBar handleSearch={handleSearch} value={query} />

      <PaginationControlled
        style={['dark']}
        totalPages={totalPages}
        page={page}
        handler={handlePageChange}
      />
      <div className={styles.content}>
        {currentArtworks?.map((artwork, i) =>
          artwork ? (
            <ArtworkMasterCard
              key={artwork.id}
              artwork={artwork}
              isCatalog
              addToCatalog={addToCatalog}
            />
          ) : (
            <ArtworkCardSkeleton key={i} />
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  rfbCatalog: store.master.fbCatalog,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(
    {
      getArtworks,
      pageChange,
      addToCatalog,
      closeFbCatalogSnackbar,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(FbCatalog);
