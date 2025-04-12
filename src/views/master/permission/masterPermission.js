import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getUsersAction,
  setAccessFilters,
  setPermissionFilters,
  setSearchFilters,
  updateUserAction,
} from 'redux/master/actions/permissionActions';
import { useDispatch, useSelector } from 'react-redux';

import ArtistMasterCard from 'components/artist/artist-masters-card/artist-masters-card';
import { List } from 'components/shared/list';
import { MasterPermissionNav } from 'components/nav/sub/masterPermissionNav';
import PaginationControlled from 'components/pagination/paginationNumbers';
import { PermissionFilters } from './permissionFilters';
import { PermissionForm } from './permissionForm';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { UserPermissionModal } from './userPermissionModal';
import { masterUrls } from 'constants/master/master-urls';
import styles from './masterPermission.module.scss';

export const MasterPermission = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setTargetUser] = useState(null);
  const [page, setPage] = useState(1);

  const { users, loading, role, access, pagination, filters } = useSelector(
    state => state.master.permission
  );
  const permissionFormValues = useSelector(state => state.form?.permission);
  const { account } = useSelector(state => state.user);

  const isSuperAdmin = account?.permission === 'master';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAction({ team: true, page, ...filters }));
  }, [dispatch, filters, page]);

  const handlePermission = useCallback(
    item => {
      setIsOpen(true);
      setTargetUser(item);

      const selectCurrentUrls = user => {
        dispatch(setPermissionFilters({ role: user.new_permission }));

        const allUrls = masterUrls.slice(1, masterUrls.length);
        const userUrls = user?.urls.map(element => element.url);

        const filteredUrls = allUrls.map(item => ({
          name: item.label,
          value: item.link,
          selected: !!userUrls.find(element => element === item.link),
        }));

        const selectedUrls = filteredUrls
          .filter(item => !!item.selected)
          .map(element => element.value);

        if (!!selectedUrls.length) {
          dispatch(setAccessFilters(selectedUrls));
        }
      };

      selectCurrentUrls(item);
    },
    [dispatch]
  );

  const UsersList = useMemo(() => {
    return (
      <List className={styles.container}>
        {users.map(item => (
          <ArtistMasterCard
            account={item}
            key={item.id}
            onSettings={() => handlePermission(item)}
            permission={true}
          />
        ))}
      </List>
    );
  }, [handlePermission, users]);

  const optionsList = useMemo(() => {
    const allUrls = masterUrls.slice(1, masterUrls.length);

    return allUrls.map(item => ({
      name: item.label,
      value: item.link,
      selected: !!access.find(element => element === item.link),
    }));
  }, [access]);

  const handleSearch = () => {
    const search = permissionFormValues?.values?.query;

    dispatch(
      getUsersAction({ query: search, pageSize: 20, team: !search, ...filters })
    );
  };

  const handleModalClose = () => {
    dispatch(setPermissionFilters({ role: '' }));
    dispatch(setAccessFilters([]));

    setInitialState();
  };

  const setInitialState = () => {
    setIsOpen(false);
    setTargetUser(null);
  };

  const handleFilterChange = (event, filter) => {
    if (event.target.value === 'owner' && !!access.length) {
      dispatch(setAccessFilters([]));
    }

    dispatch(setPermissionFilters({ [filter]: event.target.value }));
  };

  const handleModalAccept = () => {
    dispatch(updateUserAction(user.id, { role, access }));

    setInitialState();
  };

  const handleUrlClick = (name, value) => {
    const alreadyInList = access.find(item => item === value);

    if (alreadyInList) {
      const newAccess = access.filter(item => item !== value);
      return dispatch(setAccessFilters(newAccess));
    }

    dispatch(setAccessFilters([...access, value]));
  };

  const handleFilter = (event, name) => {
    if (page > 1) {
      setPage(1);
    }
    dispatch(setSearchFilters({ [name]: event.target.value }));
  };

  const handleSelectAll = status => {
    const allUrls = masterUrls.slice(1, masterUrls.length);

    const selectNone = !status && allUrls.length === access.length;

    if (selectNone) {
      return dispatch(setAccessFilters([]));
    }

    if (status) {
      const currentUrls = allUrls.map(item => item.link);

      return dispatch(setAccessFilters(currentUrls));
    }
  };

  if (!isSuperAdmin) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <UserPermissionModal
        open={isOpen}
        user={user}
        role={role}
        access={access}
        options={optionsList}
        classes={styles}
        handleFilterChange={handleFilterChange}
        handleSubmit={handleModalAccept}
        handleUrlClick={handleUrlClick}
        closeModal={handleModalClose}
        selectAll={handleSelectAll}
      />
      <MasterPermissionNav />
      <PermissionFilters
        className={styles.filters}
        handleFilterChange={handleFilter}
        filters={filters}
      />
      <PermissionForm handleSubmit={handleSearch} search={true} />
      {pagination && (
        <PaginationControlled
          handler={setPage}
          page={page}
          style={['dark']}
          totalPages={pagination.pageCount}
        />
      )}
      {loading ? <Spinner full /> : UsersList}
    </div>
  );
};
