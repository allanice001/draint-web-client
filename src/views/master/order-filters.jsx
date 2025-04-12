import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
} from '@material-ui/core';

import { CustomRadioGroup } from 'components/master/custom-radio-group/custom-radio-group';
import { CustomSelect } from 'components/master/custom-select/custom-select';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';

const SEARCH = 'search';
const STATUS = 'status';
const BUYER = 'buyer';
const SELLER = 'seller';

export const OrderFilters = props => {
  const { actions, getState } = props;
  const { sellersList, buyersList, isLoading, filters } = useSelector(getState);

  const handleFilterChange = (event, filter) => {
    actions.setFilter({ [filter]: event.target.value });
    if (filter !== SEARCH) actions.applyFilter();
  };

  const handleResetOfferFilters = () => {
    actions.resetFilters();
    actions.applyFilter();
  };

  const statusOptions = [
    {
      value: 'verified',
      label: 'Verified',
    },
    {
      value: 'pending',
      label: 'Pending',
    },
    {
      value: 'declined',
      label: 'Declined',
    },
  ];

  const sellerOptions = sellersList.map(el => {
    return {
      value: el.id,
      label: el.name,
    };
  });

  const buyerOptions = buyersList.map(el => {
    return {
      value: el.id,
      label: el.name,
    };
  });

  return (
    <Card>
      <CardContent>
        <div className="orders-actions-bar">
          <div className="search-block">
            <TextField
              aria-describedby="Search for"
              className="text-field-input"
              disabled={isLoading}
              id="search"
              label="Search for"
              onChange={event => handleFilterChange(event, SEARCH)}
              value={filters.search}
            />
            <IconButton
              aria-label="search"
              onClick={() => actions.applyFilter()}
            >
              <SearchIcon />
            </IconButton>
          </div>

          <div className="filter-block">
            <CustomRadioGroup
              label="Status"
              options={statusOptions}
              value={filters.status}
              disabled={isLoading}
              name="status"
              onChange={event => handleFilterChange(event, STATUS)}
            />

            <CustomSelect
              label="Seller"
              disabled={isLoading}
              onChange={event => handleFilterChange(event, SELLER)}
              value={filters.seller}
              options={sellerOptions}
            />

            <CustomSelect
              label="Buyer"
              disabled={isLoading}
              onChange={event => handleFilterChange(event, BUYER)}
              value={filters.buyer}
              options={buyerOptions}
            />
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          disabled={isLoading}
          onClick={handleResetOfferFilters}
          variant="contained"
        >
          Reset filters
        </Button>
      </CardActions>
    </Card>
  );
};
