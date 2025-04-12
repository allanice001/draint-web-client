import {
  CATEGORIES,
  DELETED,
  DELETED_LABEL,
  EMPTY_SERIES,
  FOR_SALE,
  NOT_FOR_SALE,
  PAINTINGS,
  PENDING,
  PENDING_LABEL,
  SERIES,
  SOLD,
  STATUS,
  UNIT,
  UNVERIFIED,
  UNVERIFIED_LABEL,
  VERIFIED,
  VERIFIED_LABEL,
} from 'constants/components/artwork-gallery/constants';
import { EditButtonGroup } from './edit-button-group';
import React from 'react';

export function FilterList(config) {
  const {
    list = [],
    filterBy,
    canEdit,
    series,
    editSeries,
    deleteSeries,
    handleAddPainting,
    total,
  } = config;

  const data = list.map(el => ({
    src: el.small_image || el.primary_image,
    forSale: el.for_sale,
    price: el.price,
    last_price: el.last_price,
    size: el.height && el.width && `${el.height}x${el.width}${UNIT}`,
    id: el.id,
    paints: el.style,
    username: el.username,
    artist_id: el.artist_id,
    owner_id: el.owner,
    verification: el.verification,
    isOwnerCanEditArtwork: el.isOwnerCanEditArtwork,
    IsArtistsHavePaidOrders: el.IsArtistsHavePaidOrders,
    IsArtistsHaveVerifiedOrders: el.IsArtistsHaveVerifiedOrders,
    artworkDeleted: el.verification === DELETED,
    isSold: el.owner !== el.artist_id,
    title: el.title,
    surfaces: el.surfaces,
    styles: el.styles,
    mediums: el.mediums,
    inOrder: el.inOrder,
    inOffer: el.inOffer,
    inCart: el.inCart,
    ownerAddress: el.ownerAddress,
    ownerData: el.ownerData,
    width: el.width,
    height: el.height,
    thickness: el.thickness,
    weight: el.weight,
  }));

  if (filterBy === SERIES) {
    return !series.length
      ? [
          {
            label: EMPTY_SERIES,
            artworks: [],
          },
        ]
      : series.map(s => ({
          label: s.name,
          artworks: data.filter(el => s.artworks.includes(el.id)),
          buttons: canEdit ? (
            <EditButtonGroup
              deleteSeries={() => deleteSeries(s.id)}
              editSeries={() => editSeries(s.id)}
            />
          ) : null,
        }));
  }

  if (filterBy === CATEGORIES) {
    return [
      {
        label: FOR_SALE,
        artworks: data.filter(el => el.forSale && el.artist_id === el.owner_id),
      },
      {
        label: NOT_FOR_SALE,
        artworks: data.filter(
          el => !el.forSale && el.artist_id === el.owner_id
        ),
      },
      {
        label: SOLD,
        artworks: data.filter(el => el.artist_id !== el.owner_id),
      },
    ];
  }

  if (filterBy === STATUS) {
    return [
      {
        label: VERIFIED_LABEL,
        artworks: data.filter(el => el.verification === VERIFIED),
      },
      {
        label: UNVERIFIED_LABEL,
        artworks: data.filter(el => el.verification === UNVERIFIED),
      },
      {
        label: PENDING_LABEL,
        artworks: data.filter(el => el.verification === PENDING),
      },
      {
        label: DELETED_LABEL,
        artworks: data.filter(el => el.verification === DELETED),
      },
    ];
  }

  if (canEdit) {
    data.push({
      id: 'upload',
      upload: true,
      onClick: handleAddPainting,
    });
  }

  return [
    {
      label: `${total ? total : 0} ${PAINTINGS}`,
      artworks: data,
    },
  ];
}
