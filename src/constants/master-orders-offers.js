import React from 'react';
import dateHelper from '../helpers/date.helper';
import { imageSizes } from './media-query/image-sizes';

const FIELD = {
  seller: {
    seller: 'seller',
    location: 'sellerLocation',
    toLocation: 'to_location',
  },
  buyer: {
    buyer: 'buyer',
    location: 'buyerLocation',
    fromLocation: 'from_location',
  },
  order: {
    verification: 'verification',
    artwork: 'artwork',
    created: 'created_at',
    price: 'price',
    shippingCost: 'shipping_cost',
    reason: 'cancelled_reason',
  },
};

const HEADER_NAME = {
  seller: {
    name: 'Seller',
    address: 'Address',
  },
  buyer: {
    name: 'Buyer',
    address: 'Address',
  },
  order: {
    created: 'Created',
    verification: 'Status',
    reason: 'Reason',
    artwork: 'Artwork',
    price: 'Price',
    shippingCost: 'Shipping',
  },
};

export const ORDER_COLUMNS = [
  {
    field: FIELD.seller.seller,
    headerName: HEADER_NAME.seller.name,
    flex: 1,
    minWidth: 120,
    valueGetter: params => params.value.name,
  },
  {
    field: FIELD.seller.location,
    headerName: HEADER_NAME.seller.address,
    flex: 1,
    minWidth: 250,
    renderCell: params =>
      `${params.value.addressLine1 ? params.value.addressLine1 : ''}
      ${params.value.country ? params.value.country : ''}`.trim(),
  },
  {
    field: FIELD.buyer.buyer,
    headerName: HEADER_NAME.buyer.name,
    flex: 1,
    minWidth: 120,
    valueGetter: params => params.value.name,
  },
  {
    field: FIELD.buyer.location,
    headerName: HEADER_NAME.buyer.address,
    flex: 1,
    minWidth: 250,
    valueGetter: params =>
      `${params.value.addressLine1 ? params.value.addressLine1 : ''}
      ${params.value.country ? params.value.country : ''}`.trim(),
  },
  {
    field: FIELD.order.created,
    headerName: HEADER_NAME.order.created,
    minWidth: 120,
    flex: 1,
    valueGetter: params => dateHelper.getReadableDateString(params.value),
  },
  {
    field: FIELD.order.verification,
    headerName: HEADER_NAME.order.verification,
    minWidth: 120,
    flex: 1,
    renderCell: params => {
      const status = params.value ? params.value : 'pending';

      return <span className={status}>{status}</span>;
    },
  },
  {
    field: FIELD.order.reason,
    headerName: HEADER_NAME.order.reason,
    minWidth: 120,
    flex: 1,
    valueGetter: params => {
      return params.value && params.value;
    },
  },
  {
    field: FIELD.order.price,
    headerName: HEADER_NAME.order.price,
    minWidth: 120,
    flex: 1,
    valueGetter: params => params.value,
  },
  {
    field: FIELD.order.shippingCost,
    headerName: HEADER_NAME.order.shippingCost,
    minWidth: 120,
    flex: 1,
    valueGetter: params => params.value,
  },
  {
    field: FIELD.order.artwork,
    headerName: HEADER_NAME.order.artwork,
    minWidth: 150,
    renderCell: params => {
      const {
        title,
        artwork: { small_image, primary_image },
      } = params.value;

      return (
        <img
          alt={title}
          srcSet={`${small_image || primary_image}`}
          sizes={imageSizes.SM}
          title={title}
        />
      );
    },
  },
];

export const OFFER_COLUMNS = [
  {
    field: FIELD.buyer.buyer,
    headerName: HEADER_NAME.buyer.name,
    flex: 1,
    minWidth: 120,
    valueGetter: params => params.value.name,
  },
  {
    field: FIELD.buyer.fromLocation,
    headerName: HEADER_NAME.buyer.address,
    flex: 1,
    minWidth: 250,
    valueGetter: params =>
      `${params.value.addressLine1 ? params.value.addressLine1 : ''}
      ${params.value.country ? params.value.country : ''}`.trim(),
  },
  {
    field: FIELD.seller.seller,
    headerName: HEADER_NAME.seller.name,
    flex: 1,
    minWidth: 120,
    valueGetter: params => params.value.name,
  },
  {
    field: FIELD.seller.toLocation,
    headerName: HEADER_NAME.seller.address,
    flex: 1,
    minWidth: 250,
    valueGetter: params =>
      `${params.value.addressLine1 ? params.value.addressLine1 : ''}
      ${params.value.country ? params.value.country : ''}`.trim(),
  },
  {
    field: FIELD.order.created,
    headerName: HEADER_NAME.order.created,
    minWidth: 120,
    flex: 1,
    valueGetter: params => dateHelper.getReadableDateString(params.value),
  },
  {
    field: FIELD.order.verification,
    headerName: HEADER_NAME.order.verification,
    minWidth: 120,
    flex: 1,
    renderCell: params => {
      const status = params.value ? params.value : 'pending';

      return <span className={status}>{status}</span>;
    },
  },
  {
    field: FIELD.order.price,
    headerName: HEADER_NAME.order.price,
    minWidth: 120,
    flex: 1,
    valueGetter: params => params.value,
  },
  {
    field: FIELD.order.artwork,
    headerName: HEADER_NAME.order.artwork,
    minWidth: 150,
    renderCell: params => {
      const { title, small_image, primary_image } = params.value;

      return (
        <img
          alt={title}
          srcSet={`${small_image || primary_image}`}
          sizes={imageSizes.SM}
          title={title}
        />
      );
    },
  },
];
