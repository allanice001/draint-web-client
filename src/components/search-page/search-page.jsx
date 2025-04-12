import React, { createContext, useCallback, useEffect, useState } from 'react';
import { TabList, TabType } from 'constants/search.constants';
import {
  getSavedArtistFilter,
  getSavedArtworkFilter,
} from 'redux/search/selectors';
import { resetSearch, setMapOpen } from 'redux/global/filters/filtersActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { DynamicTitle } from './search-components/dynamic-title/dynamic-title';
import Helmet from 'components/helmet';
import MapToggle from './search-components/map/map-toggle';
import { MobileCountryBtn } from './search-components/mobile-country-btn/mobile-country-btn';
import { SearchMap } from './search-components/map/map';
import { SearchResult } from './search-result/search-result';
import { SearchTabs } from './search-components/tabs/tabs';
import clsx from 'classnames';
import { convertComponentToText } from 'helpers/search/convert-component-to-text';
import { getIndexOfTabType } from 'helpers/search/getIndexOfTabType';
import { metadata } from 'constants/meta-tags/search-page';
import { parseParams } from 'services/global';
import { setShowResultFor } from 'redux/search/action-creators';
import styles from './search-page.module.scss';
import theme from 'config/mui-theme';
import { updateQueryParams } from 'services/query-string.service';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSearch } from 'hooks/useSearch';
import useWelcomeModal from 'hooks/use-welcome-modal/use-welcome-modal';

export const SearchContext = createContext({});

const SearchPage = function() {
  useWelcomeModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const { type = TabType.Artwork } = useParams();
  const { filtersOptions, filtersFormValue } = useSearch();
  const activeTab = getIndexOfTabType(type);
  const matchesMd = useMediaQuery(
    theme.breakpoints.down(theme.breakpoints.values.md)
  );

  const {
    provedCountData,
    provedSearchQuery: query,
    mapIsOpen: mapOpen,
    countData: counts,
  } = useSelector(state => state.filters);
  const filtersValues = useSelector(
    state => state.form?.largeSearchForm?.values
  );
  const { URL: ArtistURL } = useSelector(getSavedArtistFilter);
  const { URL: ArtworkURL } = useSelector(getSavedArtworkFilter);
  const { savedOtherFilters } = useSelector(store => store.search);

  // For mobile country filter
  const [isOpenCountryFilter, setOpenCountryFilter] = useState(false);

  useEffect(() => {
    if (type === TabType.Artwork) {
      dispatch(setShowResultFor({ for: TabType.Artwork }));
    } else if (type === TabType.Artist) {
      dispatch(setShowResultFor({ for: TabType.Artist }));
    }
    !query && dispatch(resetSearch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ArtistURL, ArtworkURL, type]);

  const setActiveTab = useCallback(
    tabIdx => {
      const newTab = TabList[tabIdx].type;
      let savedFilter = savedOtherFilters[`${newTab}URL`] || '';
      if (newTab === TabType.Artist) {
        savedFilter = ArtistURL;
      }
      if (newTab === TabType.Artwork) {
        savedFilter = ArtworkURL;
      }

      updateQueryParams({
        path: `/search/${newTab}`,
        savedFilter,
        history,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ArtistURL, ArtworkURL, savedOtherFilters]
  );

  const handleTabChange = (_, newValue) => {
    if (mapOpen) {
      dispatch(setMapOpen(false));
    }

    setActiveTab(newValue);
  };

  const handleMapToggle = () => {
    if (type !== TabType.Artwork && type !== TabType.Artist) {
      setActiveTab(getIndexOfTabType(TabType.Artwork));
    }
    dispatch(setMapOpen(!mapOpen));
  };

  const metaTitle = convertComponentToText(
    <DynamicTitle
      query={query}
      activeTab={activeTab}
      data={parseParams(filtersFormValue, filtersOptions)}
      provedCountData={provedCountData}
    />
  );

  return (
    <section>
      <Helmet
        title={metaTitle}
        description={
          type === TabType.Artist
            ? metadata.ARTISTS_DESCRIPTION
            : metadata.ARTWORKS_DESCRIPTION
        }
      />
      <div className={styles.header__wrapper}>
        <div className={clsx('container', styles.header)}>
          <div
            className={clsx({ [styles.mobile__header__wrapper]: matchesMd })}
          >
            <DynamicTitle
              query={query}
              activeTab={activeTab}
              data={parseParams(filtersFormValue, filtersOptions)}
              provedCountData={provedCountData}
            />

            {matchesMd && (
              <MobileCountryBtn
                filtersValues={filtersValues}
                handleClick={setOpenCountryFilter}
              />
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.tabs}>
          <SearchTabs
            activeTab={activeTab}
            counts={counts}
            handleTabChange={handleTabChange}
          />

          <MapToggle onToggle={handleMapToggle} open={mapOpen} />
        </div>

        {mapOpen && (
          <SearchMap
            filtersValues={filtersValues}
            filtersOptions={filtersOptions}
            currentTabType={type}
          />
        )}
      </div>

      <SearchContext.Provider
        value={{
          setActiveTab,
          activeTab,
          isOpenCountryFilter,
          setOpenCountryFilter,
        }}
      >
        <SearchResult
          type={type}
          query={query}
          mapOpen={mapOpen}
          matchesMd={matchesMd}
          activeTab={activeTab}
          isOpenCountryFilter={isOpenCountryFilter}
          setOpenCountryFilter={setOpenCountryFilter}
          filtersOptions={filtersOptions}
          filtersFormValue={filtersFormValue}
        />
      </SearchContext.Provider>
    </section>
  );
};

export default SearchPage;
