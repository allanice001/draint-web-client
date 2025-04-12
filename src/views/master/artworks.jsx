import {
  ALTERNATE_FILTER_NAME,
  ARTWORKS_FIELD_NAME,
  DATE_FROM_FILER_NAME,
  DATE_SELECTED_FILER_NAME,
  DATE_TO_FILER_NAME,
  DEFAULT_PAGE,
  DELETED_ARTWORK_FILER_NAME,
  FILTER_ENTITY_ACCOUNTS,
  FILTER_ENTITY_ARTWORKS,
  FILTER_NAME,
  QUERY_NAME,
  SUBSCRIPTION_FILER_NAME,
} from 'constants/components/master/filters-default';
import { Card, CardContent } from '@material-ui/core';
import { MasterArtistsNav, Spinner } from 'components/lib';
import React, { useEffect, useState } from 'react';
import {
  getArtworkFilterParameters,
  pageCheck,
} from 'services/get-master-filter-parameters';
import {
  getArtworks,
  pageChange,
  recoverDeletedArtwork,
  setArtworksPage,
  setDateFilter,
  setFilter,
  setInitialFilter,
  updateArtworkStatus,
} from 'redux/master/actions/approvalArtworksActions';
import {
  getDataFromStorage,
  setStorageData,
} from 'services/local-storage-service';
import { useDispatch, useSelector } from 'react-redux';

import ArtworkMasterCard from 'components/artwork/artwork-master-card/artwork-masters-card';
import { LOCAL_STORAGE_MASTER_ARTWORKS } from 'constants/components/master/local-storage-names';
import MasterDateFilter from 'components/filters/masterDateFilter';
import { MasterFilter } from 'components/filters/masterFilter';
import PaginationControlled from 'components/pagination/paginationNumbers';
import SearchBar from 'components/searchBar/searchBar';

function MasterArtworks() {
  const [timeoutId, setTimeoutId] = useState(null);

  const dispatch = useDispatch();
  const { approvalArtworks } = useSelector(state => state.master);
  const { account: user } = useSelector(state => state.user);

  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  const {
    loading,
    totalArtworks,
    totalAccounts,
    currentArtworks,
    query,
    filter,
    alternateFilter,
    subscriptionFilter,
    date,
    page,
    totalPages,
    currentPages,
    deletedArtworkFilter,
  } = approvalArtworks;

  useEffect(() => {
    const dataFromStorage = getDataFromStorage(LOCAL_STORAGE_MASTER_ARTWORKS);

    dispatch(setInitialFilter(dataFromStorage));
  }, [dispatch]);

  function getRequest(parameters) {
    dispatch(setArtworksPage(parameters.page));
    dispatch(getArtworks(parameters));
    return setStorageData(
      LOCAL_STORAGE_MASTER_ARTWORKS,
      approvalArtworks,
      parameters,
      ARTWORKS_FIELD_NAME
    );
  }

  function handlePageChange(pageValue) {
    const parameters = getArtworkFilterParameters(approvalArtworks, {
      page: pageValue,
    });
    dispatch(pageChange(parameters));
    return setStorageData(
      LOCAL_STORAGE_MASTER_ARTWORKS,
      approvalArtworks,
      parameters,
      ARTWORKS_FIELD_NAME
    );
  }

  function handleFilterChange(event, type) {
    const select = event.target.value;
    dispatch(setFilter(type, select));

    const parameters = getArtworkFilterParameters(approvalArtworks, {
      [type]: select,
    });

    return getRequest(pageCheck(parameters, currentPages));
  }

  function handleSearch(value) {
    let parameters = getArtworkFilterParameters(approvalArtworks, {
      query: value,
    });
    parameters = pageCheck(parameters, currentPages);
    if (timeoutId) clearTimeout(timeoutId);
    dispatch(setFilter(QUERY_NAME, value));
    const currentTimeoutId = setTimeout(() => {
      getRequest(parameters);
    }, 1000);
    return setTimeoutId(currentTimeoutId);
  }

  function handleDateOptionChange(type, value) {
    const newDate = { ...date, [type]: value };
    dispatch(setDateFilter(newDate));
    const parameters = getArtworkFilterParameters(
      { ...approvalArtworks, date: newDate },
      {
        page: DEFAULT_PAGE,
      }
    );

    return getRequest(parameters);
  }

  function handleVerify(id, status, artist_id) {
    if (isAnalyst) {
      return null;
    }

    return dispatch(updateArtworkStatus(id, status, artist_id));
  }

  function handleRecover(artworkId, accountId) {
    if (isAnalyst) {
      return null;
    }

    return dispatch(recoverDeletedArtwork(artworkId, accountId));
  }

  return (
    <div className="master-artists-wrapper">
      <MasterArtistsNav />
      <Card>
        <CardContent>
          <SearchBar handleSearch={handleSearch} value={query} />
          <MasterFilter
            disabled={loading}
            filter={filter}
            artistFilter={alternateFilter}
            subscriptionFilter={subscriptionFilter}
            deletedArtworkFilter={deletedArtworkFilter}
            countList={[
              { title: FILTER_ENTITY_ARTWORKS, value: totalArtworks },
              { title: FILTER_ENTITY_ACCOUNTS, value: totalAccounts },
            ]}
            onChange={event => handleFilterChange(event, FILTER_NAME)}
            onArtistFilterChange={event =>
              handleFilterChange(event, ALTERNATE_FILTER_NAME)
            }
            subscriptionFilterChange={event =>
              handleFilterChange(event, SUBSCRIPTION_FILER_NAME)
            }
            deletedArtworkFilterChange={event =>
              handleFilterChange(event, DELETED_ARTWORK_FILER_NAME)
            }
          />
        </CardContent>
      </Card>

      <MasterDateFilter
        loading={loading}
        to={date.to}
        from={date.from}
        dateSelected={date.dateSelected}
        changeTo={value => handleDateOptionChange(DATE_TO_FILER_NAME, value)}
        changeFrom={value =>
          handleDateOptionChange(DATE_FROM_FILER_NAME, value)
        }
        onDateSelected={value =>
          handleDateOptionChange(DATE_SELECTED_FILER_NAME, value)
        }
      />

      <PaginationControlled
        style={['dark']}
        totalPages={totalPages}
        page={page}
        handler={handlePageChange}
      />
      <div className="d-flex d-wrap">
        {loading ? (
          <Spinner full />
        ) : (
          currentArtworks &&
          currentArtworks.map(artwork => (
            <ArtworkMasterCard
              key={artwork.id}
              artwork={artwork}
              onVerify={(id, status) => handleVerify(id, status, artwork.artist_id)}
              onRecover={handleRecover}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MasterArtworks;
