import {
  INVENTORY,
  NO_SALE,
  SALE,
  SOLD,
} from 'constants/artwork-sale-statuses';

export default function getSaleStatus(artwork) {
  const {
    artist_id: artistId,
    owner: ownerId,
    for_sale: forSale,
    isOwnerCanEditArtwork,
  } = artwork;

  if (!isOwnerCanEditArtwork) {
    return INVENTORY;
  }

  if (artistId === ownerId && forSale) {
    return SALE;
  }

  if (artistId === ownerId && !forSale) {
    return NO_SALE;
  }

  if (artistId !== ownerId && forSale) {
    return SOLD;
  }

  return undefined;
}
