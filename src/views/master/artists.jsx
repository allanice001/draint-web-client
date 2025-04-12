import {
  ACCOUNTS_FIELD_NAME,
  ACTIVATED_FILTER_NAME,
  ARTWORK_FILTER_NAME,
  DATE_FROM_FILER_NAME,
  DATE_SELECTED_FILER_NAME,
  DATE_TO_FILER_NAME,
  DEFAULT_COUNTRY,
  DEFAULT_PAGE,
  DELETED_USER_FILER_NAME,
  FILTER_ENTITY_ACCOUNTS,
  FILTER_NAME,
  IMAGE_FILER_NAME,
  INSTAGRAM_FILER_NAME,
  QUERY_NAME,
  ROLE_FILER_NAME,
  SUBSCRIPTION_FILER_NAME,
} from 'constants/components/master/filters-default';
import { Card, CardContent } from '@material-ui/core';
import { MasterArtistsNav, Spinner } from 'components/lib';
import React, { useEffect, useState } from 'react';
import {
  generateCSV,
  getAccounts,
  getAccountsSuccess,
  pageChange,
  setAccountsPage,
  setCountryFilter,
  setDateFilter,
  setFilter,
  setInitialFilter,
  updateAccountStatus,
} from 'redux/master/actions/approvalArtistsActions';
import {
  getArtistFilterParameters,
  pageCheck,
} from 'services/get-master-filter-parameters';
import {
  getDataFromStorage,
  setStorageData,
} from 'services/local-storage-service';
import { useDispatch, useSelector } from 'react-redux';

import ArtistCardDownloadModal from 'components/basic-modal/artist-card-download-modal';
import ArtistMasterCard from 'components/artist/artist-masters-card/artist-masters-card';
import { LOCAL_STORAGE_MASTER_ARTISTS } from 'constants/components/master/local-storage-names';
import MasterArtistsCsvButton from 'components/filters/master-artists-csv-button';
import MasterCountryFilter from 'components/filters/master-country-filter';
import MasterDateFilter from 'components/filters/masterDateFilter';
import { MasterFilter } from 'components/filters/masterFilter';
import MaterArtistSettingsModal from './artists-settings-modal';
import PaginationControlled from 'components/pagination/paginationNumbers';
import SearchBar from 'components/searchBar/searchBar';
import Settings from 'settings.json';
import styles from './artists.module.scss';

function MasterArtists() {
  const [accountId, setAccountId] = useState(null);
  const [openSettings, setOpenSettings] = useState(false);
  const [openCardDownload, setOpenCardDownload] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const { approvalArtists } = useSelector(state => state.master);
  const { account: user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  const {
    totalAccounts,
    currentAccounts,
    filter,
    subscriptionFilter,
    roleFilter,
    page,
    totalPages,
    artworkFilter,
    query,
    loading,
    countryList,
    country,
    date,
    imageFilter,
    instagramFilter,
    currentPages,
    deletedUserFilter,
    activatedFilter,
  } = approvalArtists;

  useEffect(() => {
    const dataFromStorage = getDataFromStorage(LOCAL_STORAGE_MASTER_ARTISTS);

    return dispatch(setInitialFilter(dataFromStorage));
  }, [dispatch]);

  function getRequest(parameters) {
    dispatch(setAccountsPage(parameters.page));
    dispatch(getAccounts(parameters));
    return setStorageData(
      LOCAL_STORAGE_MASTER_ARTISTS,
      approvalArtists,
      parameters,
      ACCOUNTS_FIELD_NAME
    );
  }

  async function handleGenerateCSV() {
    const apiServer = Settings[process.env.NODE_ENV].api_server;
    const parameters = getArtistFilterParameters(approvalArtists);
    const csvReady = await dispatch(generateCSV(parameters, totalAccounts));
    if (csvReady) {
      const link = document.createElement('a');
      link.setAttribute('href', `${apiServer}/artists.csv`);
      link.setAttribute('download', 'download');
      link.click();
    }
  }

  function handlePageChange(pageValue) {
    const parameters = getArtistFilterParameters(approvalArtists, {
      page: pageValue,
    });
    dispatch(pageChange(parameters));
    return setStorageData(
      LOCAL_STORAGE_MASTER_ARTISTS,
      approvalArtists,
      parameters,
      ACCOUNTS_FIELD_NAME
    );
  }

  function handleFilterChange(event, type) {
    const select = event.target.value;
    dispatch(setFilter(type, select));
    let parameters = getArtistFilterParameters(approvalArtists, {
      [type]: select,
    });
    parameters = pageCheck(parameters, currentPages);
    return getRequest(parameters);
  }

  function handleSearch(value) {
    let parameters = getArtistFilterParameters(approvalArtists, {
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

  function handleSelectCounty(event) {
    const select = event.target.value;
    const isAll = select.includes(DEFAULT_COUNTRY);
    const value = isAll ? [DEFAULT_COUNTRY] : select;
    const parameters = getArtistFilterParameters(approvalArtists, {
      country: value,
      page: DEFAULT_PAGE,
    });

    if (timeoutId) clearTimeout(timeoutId);
    event.persist();
    dispatch(setCountryFilter(value));
    const currentTimeoutId = setTimeout(() => {
      getRequest(parameters);
    }, 1500);
    return setTimeoutId(currentTimeoutId);
  }

  function handleDateOptionChange(type, value) {
    const newDate = { ...date, [type]: value };
    dispatch(setDateFilter(newDate));
    const parameters = getArtistFilterParameters(
      { ...approvalArtists, date: newDate },
      {
        page: DEFAULT_PAGE,
      }
    );

    return getRequest(parameters);
  }

  function onSettings(id) {
    if (isAnalyst) {
      return null;
    }

    setAccountId(id);
    return setOpenSettings(true);
  }

  function onDownload(id) {
    if (isAnalyst) {
      return null;
    }

    setAccountId(id);
    setOpenCardDownload(true);
  }

  function onClose() {
    setOpenCardDownload(false);
  }

  function onSettingsUpdateAccounts(id, data) {
    return dispatch(
      getAccountsSuccess({
        currentAccounts: currentAccounts.map(element =>
          element.id !== id ? element : { ...element, ...data }
        ),
      })
    );
  }

  function handleVerify(id, status) {
    if (isAnalyst) {
      return null;
    }

    return dispatch(updateAccountStatus(id, status));
  }

  return (
    <div className={styles.wrapper}>
      {openSettings && (
        <MaterArtistSettingsModal
          current_id={accountId}
          onAccountUpdate={onSettingsUpdateAccounts}
          open={openSettings}
          setOpen={() => {
            setOpenSettings(false);
            setAccountId(null);
          }}
        />
      )}
      <ArtistCardDownloadModal
        id={accountId}
        open={openCardDownload}
        setOpen={() => {
          setOpenCardDownload(false);
          setAccountId(null);
        }}
        handleClose={onClose}
      />
      <MasterArtistsNav />
      <Card>
        <CardContent>
          <div className={styles.search}>
            <SearchBar handleSearch={handleSearch} value={query} />
          </div>
          <MasterFilter
            artworkFilter={artworkFilter}
            deletedUserFilter={deletedUserFilter}
            countList={[
              { title: FILTER_ENTITY_ACCOUNTS, value: totalAccounts },
            ]}
            disabled={loading}
            filter={filter}
            imageFilter={imageFilter}
            instagramFilter={instagramFilter}
            onArtworkFilterChange={event =>
              handleFilterChange(event, ARTWORK_FILTER_NAME)
            }
            onChange={event => handleFilterChange(event, FILTER_NAME)}
            onImageFilterChange={event =>
              handleFilterChange(event, IMAGE_FILER_NAME)
            }
            onInstagramFilterChange={event =>
              handleFilterChange(event, INSTAGRAM_FILER_NAME)
            }
            onRoleFilterChange={event =>
              handleFilterChange(event, ROLE_FILER_NAME)
            }
            roleFilter={roleFilter}
            subscriptionFilter={subscriptionFilter}
            subscriptionFilterChange={event =>
              handleFilterChange(event, SUBSCRIPTION_FILER_NAME)
            }
            deletedUserFilterChange={event =>
              handleFilterChange(event, DELETED_USER_FILER_NAME)
            }
            activatedFilter={activatedFilter}
            onActivatedFilterChange={event => {
              handleFilterChange(event, ACTIVATED_FILTER_NAME);
            }}
          />
        </CardContent>
      </Card>

      <MasterDateFilter
        changeFrom={value =>
          handleDateOptionChange(DATE_FROM_FILER_NAME, value)
        }
        changeTo={value => handleDateOptionChange(DATE_TO_FILER_NAME, value)}
        onDateSelected={value =>
          handleDateOptionChange(DATE_SELECTED_FILER_NAME, value)
        }
        dateSelected={date.dateSelected}
        from={date.from}
        to={date.to}
        loading={loading}
      />
      <div className={styles.filters__row}>
        <MasterCountryFilter
          country={country}
          countryList={countryList}
          selectCounty={handleSelectCounty}
        />
        {!isAnalyst && (
          <MasterArtistsCsvButton generateCSV={handleGenerateCSV} />
        )}
      </div>

      <PaginationControlled
        handler={handlePageChange}
        page={page}
        style={['dark']}
        totalPages={totalPages}
      />
      <div className={styles.content}>
        {loading ? (
          <Spinner full />
        ) : (
          currentAccounts &&
          currentAccounts.map(account => (
            <ArtistMasterCard
              key={account.id}
              account={account}
              onDownload={() => onDownload(account.id)}
              onSettings={() => onSettings(account.id)}
              onVerify={(id, status) => handleVerify(id, status)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MasterArtists;
