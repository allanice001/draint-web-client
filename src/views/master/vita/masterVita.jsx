import { Card, CardContent } from '@material-ui/core';
import {
  LOCAL_STORAGE_MASTER_ARTISTS,
  MASTER_VITA_PAGE,
} from 'constants/components/master/local-storage-names';
import { List, Record } from 'components/shared/list';
import React, { useEffect } from 'react';

import { Artist } from 'models';
import ArtistLongCard from 'components/artist/artist-long-card/artist-long-card';
import { CustomRadioGroup } from 'components/master/custom-radio-group/custom-radio-group';
import { MasterMyVitaNav } from 'components/nav/sub/myVita';
import PaginationControlled from 'components/pagination/paginationNumbers';
import { VERIFICATION_OPTIONS } from 'constants/filters';
import cx from 'classnames';
import { getArtistMyVitaURL } from 'helpers/artist/get-artist-my-vita-url';
import { getDataFromStorage } from 'services/local-storage-service';
import { setInitialFilter } from 'redux/master/actions/approvalArtistsActions';
import styles from '../master-vita.module.scss';
import { useDispatch } from 'react-redux';
import { useMasterVita } from 'hooks/use-master-vita';

export const MasterVita = () => {
  const {
    pagination,
    setPage,
    loading,
    page,
    profiles,
    filter,
    handleVerificationFilterChange,
  } = useMasterVita();
  const dispatch = useDispatch();

  useEffect(() => {
    const dataFromStorage = getDataFromStorage(LOCAL_STORAGE_MASTER_ARTISTS);
    return dispatch(setInitialFilter(dataFromStorage));
  }, [dispatch]);

  return (
    <>
      <MasterMyVitaNav />
      <div className={styles.wrapper}>
        <div className="orders-content">
          <div className="filter-block">
            <Card>
              <CardContent>
                <CustomRadioGroup
                  options={VERIFICATION_OPTIONS}
                  label="Status"
                  value={filter}
                  onChange={e => handleVerificationFilterChange(e)}
                  name="status"
                  disabled={loading}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        {pagination && (
          <PaginationControlled
            pageName={MASTER_VITA_PAGE}
            handler={setPage}
            page={page}
            style={['dark']}
            totalPages={pagination?.pageCount}
          />
        )}
        {profiles.length ? (
          <>
            <h2>Profiles</h2>
            <List horizontal className={styles.profiles}>
              {profiles.map(profile => (
                <Record>
                  <ArtistLongCard
                    key={profile.id}
                    url={getArtistMyVitaURL(profile.username)}
                    artist={Artist.create({
                      ...profile,
                      artworks: [],
                    })}
                  />
                  <CardContent className={styles.content}>
                    <div
                      className={cx(
                        styles.verification,
                        `${
                          !profile.verification ||
                          profile.verification === 'legacy'
                            ? 'pending'
                            : profile.verification
                        }`
                      )}
                    >
                      {!profile.verification ? 'Pending' : profile.verification}
                    </div>
                  </CardContent>
                </Record>
              ))}
            </List>
          </>
        ) : (
          <div className={styles.empty}>
            <p>There are no user’s answers yet</p>
          </div>
        )}
      </div>
    </>
  );
};
