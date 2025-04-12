import React, { useCallback, useEffect, useState } from 'react';
import { TabList, TabType } from 'constants/search.constants';
import {
  resetSearch,
  setProvedData,
} from 'redux/global/filters/filtersActions';
import { setSavedURL, setShowResultFor } from 'redux/search/action-creators';
import { useDispatch, useSelector } from 'react-redux';
import ArtistFullSearch from 'components/artist/artist-full-search/artist-full-search';
import { ArtistService } from 'services/artist-service';
import ArtworkFullSearch from 'components/artwork/artwork-full-search/artwork-full-search';
import { ArtworkService } from 'services/artwork-service';
import FiltersListResult from './filters-list-result';
import { SEARCH_ARTWORKS } from 'constants/routes/publicModule/artwork';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { getFilters } from '../search-components/filters/get-filters';
import { parseParams } from 'services/global';
import { updateQueryParams } from 'services/query-string.service';
import { useHistory } from 'react-router-dom';

const artworkService = new ArtworkService();
const artistService = new ArtistService();

export const SearchResult = ({
  type,
  query,
  mapOpen,
  matchesMd,
  activeTab,
  isOpenCountryFilter,
  setOpenCountryFilter,
  filtersOptions,
  filtersFormValue,
}) => {
  const history = useHistory();
  const URLSearch = history.location.search;
  const user = useSelector(store => store.user.account);
  const [cleanPage, setCleanPage] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.loading) window.scrollTo(0, 0);
  }, [user.loading]);

  const onFilter = useCallback(
    params => {
      const parsedParams = parseParams(params, filtersOptions);
      updateQueryParams({
        history,
        parsedParams,
        path: SEARCH_ARTWORKS,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filtersOptions]
  );

  const onFilterChange = () => {
    setCleanPage(true);
    if (Boolean(query)) {
      dispatch(resetSearch());
      dispatch(setProvedData());
    }

    dispatch(setShowResultFor({ for: type }));
  };

  const filters = getFilters({
    isOpen,
    isOpenCountryFilter,
    filtersOptions,
    mapOpen,
    type,
    matchesMd,
    setOpenCountryFilter,
    handleChange: onFilterChange,
  });

  useEffect(() => {
    dispatch(setSavedURL({ type, URL: URLSearch }));
  }, [dispatch, URLSearch, type]);

  if (user.loading) return <Spinner full />;

  switch (type) {
    case TabType.Artwork: {
      return (
        <>
          <ArtworkFullSearch
            cleanPage={cleanPage}
            setCleanPage={setCleanPage}
            filtersOptions={filtersOptions}
            method={artworkService.getArtworks}
            query={query}
            isOpen={isOpen}
            setOpen={setOpen}
            filters={filters}
            initialValues={filtersFormValue}
            matchesMd={matchesMd}
          />
        </>
      );
    }
    case TabType.Artist: {
      return (
        <>
          <ArtistFullSearch
            cleanPage={cleanPage}
            setCleanPage={setCleanPage}
            filtersOptions={filtersOptions}
            method={artistService.getAllArtists}
            query={query}
            isOpen={isOpen}
            setOpen={setOpen}
            filters={filters}
            initialValues={filtersFormValue}
            matchesMd={matchesMd}
          />
        </>
      );
    }
    default: {
      return (
        <FiltersListResult
          name={TabList[activeTab].name}
          initialValues={filtersFormValue}
          onFilter={onFilter}
          query={query}
          type={type}
        />
      );
    }
  }
};
