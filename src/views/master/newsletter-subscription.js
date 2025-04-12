import './newsletter-subscription.scss';

import { Card, CardContent } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { Spinner, countryName } from 'components/lib';
import {
  getSubscriptions,
  setSubscriptionsFilter,
} from 'redux/master/actions/newslettersActions';
import { useDispatch, useSelector } from 'react-redux';

import ClearIcon from '@material-ui/icons/Clear';
import { CustomRadioGroup } from 'components/master/custom-radio-group/custom-radio-group';
import { DataGrid } from '@material-ui/data-grid';
import DoneIcon from '@material-ui/icons/Done';
import { NewsletterNav } from 'components/nav/sub/newsletter';

const dateFormat = date => {
  return date.split('T').shift();
};

const columns = [
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'first_name',
    headerName: 'First Name',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'country',
    headerName: 'Country',
    flex: 1,
    minWidth: 120,
    valueGetter: params => (params.value ? countryName(params.value) : ''),
  },
  {
    field: 'date_add',
    headerName: 'Subscription Date',
    minWidth: 120,
    flex: 1,
    valueGetter: params => dateFormat(params.value),
  },
  {
    field: 'is_verified',
    headerName: 'Email Confirmed',
    minWidth: 120,
    flex: 1,
    renderCell: params => {
      return !params.value ? (
        <ClearIcon className="" fontSize="large" htmlColor="red" />
      ) : (
        <DoneIcon fontSize="large" htmlColor="green" />
      );
    },
  },
];

const MasterNewsLetterSubscription = () => {
  const dispatch = useDispatch();
  const newsletters = useSelector(store => store.master.newsletters);

  const { loading, newsletterSubscriptions, statusFilter, order } = newsletters;

  useEffect(() => {
    dispatch(getSubscriptions(statusFilter, order));
  }, [dispatch, statusFilter, order]);

  const handleVerificationFilterChange = async event => {
    const statusFilter = event.target.value;
    const { order } = newsletters;
    dispatch(setSubscriptionsFilter(statusFilter));
    dispatch(getSubscriptions(statusFilter, order));
  };

  const content = useMemo(() => {
    if (loading) return <Spinner full />;

    const data = newsletterSubscriptions.map((el, index) => {
      return {
        ...el,
        id: index,
      };
    });

    return (
      <div style={{ height: '1000px', width: '100%' }}>
        <DataGrid rows={data} columns={columns} pageSize={16} />
      </div>
    );
  }, [newsletterSubscriptions, loading]);

  return (
    <>
      <NewsletterNav />

      <div className="orders-content">
        <div className="filter-block">
          <Card>
            <CardContent>
              <CustomRadioGroup
                options={[
                  {
                    value: '',
                    label: 'All',
                  },
                  {
                    value: 'verified',
                    label: 'Confirmed',
                  },
                  {
                    value: 'noVerified',
                    label: 'Not confirmed',
                  },
                ]}
                label="Status"
                value={statusFilter}
                onChange={e =>
                  handleVerificationFilterChange(e, 'verification')
                }
                name="status"
                disabled={loading}
              />
            </CardContent>
          </Card>
        </div>

        {content}
      </div>
    </>
  );
};

export default MasterNewsLetterSubscription;
