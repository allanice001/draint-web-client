import './orders.scss';

import React, { useEffect, useMemo, useState } from 'react';
import {
  applyOrderFilters,
  closeOrdersSnackbar,
  getOrders,
  resetOrdersFilters,
  setOrdersFilter,
} from 'redux/master/actions/orders-actions';
import { useDispatch, useSelector } from 'react-redux';

import ArtworksSnack from 'components/snackbar/artworksSnack/artworksSnack';
import { DataGrid } from '@material-ui/data-grid';
import { ORDER_COLUMNS } from 'constants/master-orders-offers';
import { OrderFilters } from './order-filters';
import PaginationControlled from 'components/pagination/paginationNumbers';
import { Spinner } from 'components/loader/spinner-loader/spinner';

const OrderList = props => {
  const { orders, isLoading, pagination, page, setPage } = props;

  const DisplayOrders = useMemo(() => {
    return <DataGrid rows={orders} columns={ORDER_COLUMNS} pageSize={12} />;
  }, [orders]);

  if (isLoading) {
    return <Spinner full />;
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        className="orders-list-container"
        style={{ height: '800px', width: '100%' }}
      >
        {DisplayOrders}
      </div>
      {pagination && (
        <PaginationControlled
          handler={setPage}
          page={page}
          style={['dark']}
          totalPages={pagination.pageCount}
        />
      )}
    </div>
  );
};

export const MasterOrders = () => {
  const [page, setPage] = useState(1);

  const {
    isLoading,
    expandedOrderId,
    orders,
    snackbar,
    pagination,
  } = useSelector(state => state.master.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders({ page }));
  }, [dispatch, page]);

  const filterActions = {
    setFilter: value => dispatch(setOrdersFilter(value)),
    resetFilters: () => dispatch(resetOrdersFilters()),
    applyFilter: () => dispatch(applyOrderFilters()),
  };

  const handleClose = () => {
    dispatch(closeOrdersSnackbar);
  };

  return (
    <>
      <ArtworksSnack
        handleClose={handleClose}
        horizontal="left"
        message={snackbar.message}
        open={snackbar.open}
        style={snackbar.style}
        vertical="top"
      />

      <div className="orders-content">
        <OrderFilters
          actions={filterActions}
          getState={state => state.master.orders}
        />

        <OrderList
          isLoading={isLoading}
          orders={orders}
          expandedOfferId={expandedOrderId}
          pagination={pagination}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  );
};
