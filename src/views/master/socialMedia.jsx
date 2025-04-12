import {
  DEFAULT_PAGE,
  FILTER_ENTITY_ACCOUNTS,
  FILTER_NAME,
} from 'constants/components/master/filters-default';
import React, { useEffect } from 'react';
import {
  downloadImage,
  pageChange,
  setFilter,
  setInitialFilter,
  verifySocialMedia,
} from 'redux/master/actions/socialMediaActions';
import {
  getDataFromStorage,
  setStorageData,
} from 'services/local-storage-service';
import { useDispatch, useSelector } from 'react-redux';

import ArtistMasterMediaCard from 'components/artist/artist-masters-card/artist-master-media-card';
import { LOCAL_STORAGE_MASTER_SOCIAL_MEDIA } from 'constants/components/master/local-storage-names';
import { MasterFilter } from 'components/filters/masterFilter';
import PaginationControlled from 'components/pagination/paginationNumbers';
import { Spinner } from 'components/lib';
import { roles } from 'helpers/get-role';

function SocialMediaMaster() {
  const {
    mediaList: accounts,
    filter,
    totalAccounts,
    totalPages,
    page,
    loading,
  } = useSelector(state => state.master.socialMedia);

  const { permission, new_permission } = useSelector(
    state => state.user.account
  );

  const role = roles({ permission, new_permission });

  const dispatch = useDispatch();

  useEffect(() => {
    const dataFromStorage = getDataFromStorage(
      LOCAL_STORAGE_MASTER_SOCIAL_MEDIA
    );

    return dispatch(setInitialFilter(dataFromStorage));
  }, [dispatch]);

  async function handlePageChange(currentPage) {
    const parameters = { filter, page: currentPage };

    dispatch(pageChange(parameters));

    return setStorageData(LOCAL_STORAGE_MASTER_SOCIAL_MEDIA, parameters);
  }

  async function filterChange(event) {
    const currentFilter = event.target.value;
    const parameters = { filter: currentFilter, page: DEFAULT_PAGE };

    dispatch(setFilter(FILTER_NAME, currentFilter));
    dispatch(pageChange(parameters));

    return setStorageData(LOCAL_STORAGE_MASTER_SOCIAL_MEDIA, parameters);
  }

  async function download(url, id) {
    const response = await dispatch(downloadImage(url, id));

    if (response?.filename && response?.base64) {
      const { filename, base64 } = response;
      const link = document.createElement('a');

      link.setAttribute('download', filename);
      link.setAttribute(
        'href',
        `data:application/octet-stream;base64,${base64}`
      );
      link.click();
    }
  }

  function onVerify(id, status) {
    dispatch(verifySocialMedia(id, status));
  }

  const countList = [{ title: FILTER_ENTITY_ACCOUNTS, value: totalAccounts }];

  return (
    <div>
      <MasterFilter
        countList={countList}
        disabled={loading}
        filter={filter}
        onChange={filterChange}
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
          accounts.map(account => (
            <ArtistMasterMediaCard
              isEditorOrAdmin={role.isEditorOrAdmin}
              key={account.id}
              account={account}
              onDownload={download}
              onVerify={(id, status) => onVerify(id, status)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SocialMediaMaster;
