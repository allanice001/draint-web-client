import { APPROVED, DISAPPROVED } from 'constants/statuses';
import {
  changeTitlesForAtelier,
  setFilteredAteliers,
  updateAtelierByMaster,
} from 'redux/master/actions/atelierActions';
import {
  getDataFromStorage,
  setStorageData,
} from 'services/local-storage-service';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { MASTER_ATELIER_PAGE } from 'constants/components/master/local-storage-names';
import { masterFormFields as fields } from 'constants/components/atelier';
import { setFilters } from 'redux/master/actions/blogActions';

const PAGE_LIMIT = 6;

export const useMasterAtelier = () => {
  const atelierStoragePage = getDataFromStorage(MASTER_ATELIER_PAGE);
  const [page, setPage] = useState(atelierStoragePage?.page || 1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editField, setEditField] = useState();

  const dispatch = useDispatch();
  const { posts, filters, pagination, titles } = useSelector(
    store => store.master.approvalAteliers
  );
  const { atelierTitles } = useSelector(state => state.form);

  const { account: user } = useSelector(store => store.user);

  const isSuperAdmin = user?.permission === 'master';
  const isAnalyst = user?.new_permission === 'analyst' && !isSuperAdmin;

  useEffect(() => {
    setStorageData(MASTER_ATELIER_PAGE, { page });
    dispatch(setFilteredAteliers({ ...filters, page, pageSize: PAGE_LIMIT }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  const handleFilterChange = (event, filter) => {
    setPage(1);
    dispatch(setFilters({ [filter]: event.target.value }));
  };

  const onStatusButtonClick = (values, type) => {
    if (isAnalyst) {
      return null;
    }

    const status = type === 'unverified' ? DISAPPROVED : APPROVED;

    if (status === DISAPPROVED) {
      dispatch(updateAtelierByMaster(values, { status, public: false }));
      return returnInitialState();
    }

    dispatch(updateAtelierByMaster(values, { status }));

    returnInitialState();
  };

  const returnInitialState = () => {
    setSelectedPost(null);
  };

  const handleCategoryChange = values => {
    if (isAnalyst) {
      return null;
    }

    dispatch(updateAtelierByMaster(values, { public: true }));
    returnInitialState();
  };

  const handleTitlesSubmit = () => {
    if (isAnalyst) {
      return null;
    }

    const values = Object.fromEntries(
      new Map(
        fields
          .map(el => {
            if (el.key === editField) {
              return {
                ...el,
                value: atelierTitles.values[el.name],
              };
            }

            return {
              ...el,
              value: titles[el.name],
            };
          })
          .map(el => [el.name, el.value])
      ).entries()
    );

    dispatch(changeTitlesForAtelier(titles.id, values));
    setEditField(null);
  };

  return {
    returnInitialState,
    selectedPost,
    filters,
    handleFilterChange,
    pagination,
    setPage,
    page,
    posts,
    setSelectedPost,
    onStatusButtonClick,
    handleCategoryChange,
    titles,
    handleTitlesSubmit,
    editField,
    setEditField,
    fields,
    isAnalyst,
  };
};
