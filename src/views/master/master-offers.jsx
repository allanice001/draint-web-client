import './orders.scss';

import React, { useEffect } from 'react';
import {
  applyOfferFilters,
  closeOffersSnackbar,
  getOffers,
  resetOffersFilters,
  setOffersFilter,
} from 'redux/master/actions/offers-actions';
import { useDispatch, useSelector } from 'react-redux';

import ArtworksSnack from 'components/snackbar/artworksSnack/artworksSnack';
import { DataGrid } from '@material-ui/data-grid';
import { OFFER_COLUMNS } from 'constants/master-orders-offers';
import { OrderFilters } from './order-filters';
import { Spinner } from 'components/loader/spinner-loader/spinner';

function OfferList(props) {
  const { offers, isLoading } = props;

  if (isLoading) {
    return <Spinner full />;
  }

  return (
    <div
      className="orders-list-container"
      style={{ height: '1000px', width: '100%' }}
    >
      <DataGrid rows={offers} columns={OFFER_COLUMNS} pageSize={16} />
    </div>
  );
}

const MasterOffers = () => {
  const { isLoading, offers, snackbar, expandedOfferId } = useSelector(
    state => state.master.offers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  const handleClose = () => {
    dispatch(closeOffersSnackbar);
  };

  const filterActions = {
    setFilter: value => dispatch(setOffersFilter(value)),
    resetFilters: () => dispatch(resetOffersFilters()),
    applyFilter: () => dispatch(applyOfferFilters()),
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
          getState={state => state.master.offers}
        />

        <OfferList
          isLoading={isLoading}
          offers={offers}
          expandedOfferId={expandedOfferId}
        />
      </div>
    </>
  );
};

export default MasterOffers;
