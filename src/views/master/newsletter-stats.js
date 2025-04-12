import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '@material-ui/data-grid';
import { NewsletterNav } from 'components/nav/sub/newsletter';
import { Spinner } from '../../components/lib';
import { getStats } from '../../redux/master/actions/newslettersActions';
import styles from './newsletter-stats.module.scss';

const columns = [
  {
    field: 'time',
    headerName: 'Month',
    flex: 1,
    minWidth: 120,
    valueGetter: params =>
      new Date(params.value).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
      }),
  },
  {
    field: 'accepted',
    headerName: 'Sending',
    flex: 1,
    minWidth: 120,
    valueGetter: params => params.value.total,
  },
  {
    field: 'delivered',
    headerName: 'Delivered',
    flex: 1,
    minWidth: 120,
    valueGetter: params => params.value.total,
  },
  {
    field: 'failed',
    headerName: 'Failed',
    flex: 1,
    minWidth: 120,
    valueGetter: params => params.value.permanent.total,
  },
  {
    field: 'opened',
    headerName: 'Opened',
    flex: 1,
    minWidth: 120,
    valueGetter: params => params.value.total,
  },
  {
    field: 'clicked',
    headerName: 'Clicked',
    flex: 1,
    minWidth: 120,
    valueGetter: params => params.value.total,
  },
  {
    field: 'unsubscribed',
    headerName: 'Unsubscribed',
    flex: 1,
    minWidth: 120,
    valueGetter: params => params.value.total,
  },
];

const MasterNewsLetterStats = () => {
  const { loading, stats } = useSelector(state => state.master.newsletters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  const rows = stats.map((el, index) => ({
    ...el,
    id: index,
  }));

  return (
    <>
      <NewsletterNav />

      <div
        id="master-newsletter"
        className={styles.table}
        style={{ height: '800px', width: '100%' }}
      >
        {loading ? (
          <Spinner full />
        ) : (
          <DataGrid rows={rows} columns={columns} pageSize={10} />
        )}
      </div>
    </>
  );
};

export default MasterNewsLetterStats;
