import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import { fetchBillingHistoryData } from 'redux/billing/billing-actions';

export const useBilling = () => {
  const dispatch = useDispatch();
  const { history, address, loading } = useSelector(state => state.billing);
  const { id: accountId } = useSelector(state => state.user.account);

  useEffect(() => {
    if (accountId) {
      dispatch(fetchBillingHistoryData());
    }
  }, [dispatch, accountId]);

  const { billingHistory, pagination } = history;
  const [pages, setPages] = useState({
    page: pagination.page,
    pageCount: pagination.pageSize,
  });

  useMemo(() => {
    if (Object.keys(pagination).length) {
      setPages({ page: pagination.page, pageCount: pagination.pageCount });
    }
  }, [pagination]);

  function handlePage(value) {
    setPages({ page: value, pageCount: pagination.pageCount });
  }

  useMemo(() => {
    if (pages.page) {
      dispatch(fetchBillingHistoryData(pages.page));
    }
  }, [dispatch, pages.page]);

  return {
    billingHistory,
    handlePage,
    pages,
    address,
    loading,
  };
};
