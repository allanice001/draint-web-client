import './masterFilter.scss';

import { CustomRadioGroup } from 'components/master/custom-radio-group/custom-radio-group';
import MasterPeriodFilter from './masterPeriodFilter';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const verifiedFilters = [
  { value: 'verified', label: 'verified' },
  { value: 'unverified', label: 'unverified' },
  { value: 'pending', label: 'pending' },
  { value: '', label: 'All' },
];

const imagesFilters = [
  { value: 'within', label: 'with image' },
  { value: 'without', label: 'without image' },
  { value: '', label: 'All' },
];

const instagramFilters = [
  { value: 'with', label: 'with IG link' },
  { value: 'without', label: 'without IG link' },
  { value: '', label: 'All' },
];

const verifiedArtistArtworkFilters = [
  { value: 'verified', label: 'verified artists artworks' },
  { value: 'unverified', label: 'unverified artists artworks' },
  { value: 'pending', label: 'pending artists artworks' },
  { value: '', label: 'All' },
];

const subscriptionTypeFilters = [
  { value: 'type', label: 'by plan' },
  { value: 'payment_system', label: 'by payment system' },
];

const verifiedArtworkFilters = [
  { value: 'Arts_Verified', label: 'verified artworks' },
  { value: 'Arts_Unverified', label: 'unverified artworks' },
  { value: 'Arts_Pending', label: 'pending artworks' },
  { value: '', label: 'All' },
];

const rolesFilters = [
  { value: 'artist', label: 'Only Artists' },
  { value: 'collector', label: 'Only Collectors' },
  { value: 'become_artist', label: 'Become Artist' },
  { value: 'become_collector', label: 'Become Collector' },
  { value: '', label: 'All' },
];

const subscriptionFilters = [
  { value: 'none', label: 'Test' },
  { value: 'Basic', label: 'Basic' },
  { value: 'Basic Trial', label: 'Basic Trial' },
  { value: 'Basic Yearly', label: 'Basic Yearly' },
  { value: 'All-In-One', label: 'All-In-One' },
  { value: 'All-In-One Trial', label: 'All-In-One Trial' },
  { value: 'All-In-One Yearly', label: 'All-In-One Yearly' },
  { value: '', label: 'All' },
];

const deletedUserFilters = [
  { value: 'deleted', label: 'Deleted users' },
  { value: '', label: 'All' },
];

const deletedArtworkFilters = [
  { value: 'deleted', label: 'Deleted artworks' },
  { value: '', label: 'Not Deleted artworks' },
];

const artworkPriceFilters = [
  { value: 'price', label: 'By Price' },
  { value: '', label: 'By Counter' },
];

const shippingStatuses = [
  { value: 'verified', label: 'verified' },
  { value: 'declined', label: 'declined' },
  { value: 'pending', label: 'pending' },
  { value: '', label: 'All' },
];

const activated = [
  { value: 'activated', label: 'Activated' },
  { value: 'not_activated', label: 'Not Activated' },
  { value: '', label: 'All' },
];

const getOptions = (arr, value, onChange, disabled, label, name) => {
  return (
    <CustomRadioGroup
      name={name}
      label={label}
      options={arr}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export function MasterFilter({
  disabled,
  defaultFilter = true,
  shipmentFilter = false,
  countList,
  filter,
  onChange,
  options = null,
  artistFilter = null,
  artworkFilter = null,
  imageFilter = null,
  subscriptionFilter = null,
  deletedUserFilter = null,
  deletedArtworkFilter = null,
  subscriptionTypeFilter = null,
  dateFilter = null,
  roleFilter = null,
  artworkPriceFilter = null,
  instagramFilter = null,
  onArtistFilterChange,
  onArtworkFilterChange,
  onImageFilterChange,
  subscriptionFilterChange,
  deletedUserFilterChange,
  onDateChange,
  onRoleFilterChange,
  onArtworkPriceChange,
  onSubscriptionTypeChange,
  onInstagramFilterChange,
  customFilter = null,
  shippingStatus = null,
  shippingStatusChange,
  deletedArtworkFilterChange,
  column,
  activatedFilter,
  onActivatedFilterChange,
}) {
  const isNotNull = val => val != null;

  return (
    <div
      className={cx('filters', {
        column: column,
      })}
    >
      {!!countList && (
        <div className="total">
          {countList.map(({ title, value }) => (
            <span key={title}>
              Total {title}: <b>{value}</b>
            </span>
          ))}
        </div>
      )}

      {defaultFilter &&
        getOptions(
          options || verifiedFilters,
          filter,
          onChange,
          disabled,
          'Status',
          'status'
        )}

      {isNotNull(artistFilter) &&
        getOptions(
          verifiedArtistArtworkFilters,
          artistFilter,
          onArtistFilterChange,
          disabled,
          'Status Of',
          'status_of'
        )}

      {isNotNull(imageFilter) &&
        getOptions(
          imagesFilters,
          imageFilter,
          onImageFilterChange,
          disabled,
          'Image',
          'image'
        )}

      {isNotNull(instagramFilter) &&
        getOptions(
          instagramFilters,
          instagramFilter,
          onInstagramFilterChange,
          disabled,
          'Instagram',
          'instagram'
        )}

      {isNotNull(artworkFilter) &&
        getOptions(
          verifiedArtworkFilters,
          artworkFilter,
          onArtworkFilterChange,
          disabled,
          'Artwork status',
          'artwork_status'
        )}

      {isNotNull(subscriptionFilter) &&
        getOptions(
          subscriptionFilters,
          subscriptionFilter,
          subscriptionFilterChange,
          disabled,
          'Subscription',
          'subscription'
        )}

      {isNotNull(roleFilter) &&
        getOptions(
          rolesFilters,
          roleFilter,
          onRoleFilterChange,
          disabled,
          'Role',
          'role'
        )}

      {isNotNull(activatedFilter) &&
        getOptions(
          activated,
          activatedFilter,
          onActivatedFilterChange,
          disabled,
          'Active',
          'activated'
        )}

      {isNotNull(deletedUserFilter) &&
        getOptions(
          deletedUserFilters,
          deletedUserFilter,
          deletedUserFilterChange,
          disabled,
          'Users',
          'users'
        )}

      {isNotNull(deletedArtworkFilter) &&
        getOptions(
          deletedArtworkFilters,
          deletedArtworkFilter,
          deletedArtworkFilterChange,
          disabled,
          'Deleted',
          'deleted'
        )}

      {isNotNull(artworkPriceFilter) &&
        getOptions(
          artworkPriceFilters,
          artworkPriceFilter,
          onArtworkPriceChange,
          disabled,
          'Price',
          'price'
        )}

      {isNotNull(subscriptionTypeFilter) &&
        getOptions(
          subscriptionTypeFilters,
          subscriptionTypeFilter,
          onSubscriptionTypeChange,
          disabled,
          'Subscription',
          'subscription'
        )}

      {isNotNull(dateFilter) && (
        <MasterPeriodFilter
          dateFilter={dateFilter}
          disabled={filter !== ''}
          onDateChange={onDateChange}
        />
      )}

      {isNotNull(shippingStatuses) &&
        shipmentFilter &&
        getOptions(
          shippingStatuses,
          shippingStatus,
          shippingStatusChange,
          disabled
        )}

      <div>{customFilter}</div>
    </div>
  );
}

MasterFilter.defaultProps = {
  countList: [],
};

MasterFilter.propTypes = {
  countList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.number,
    })
  ),
};
