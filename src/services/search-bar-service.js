import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';
import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';

export function viewSearchResults(obj) {
  if (!obj || !Object.keys(obj).length) return [];
  const res = [];

  if (obj.country.length) {
    obj.country.forEach(country => {
      res.push({ type: 'country', data: country.cname });
    });
  }

  if (obj.style.length) {
    obj.style.forEach(style => {
      res.push({
        type: 'style',
        data: [style.style],
        id: style.id,
      });
    });
  }

  if (obj.medium.length) {
    obj.medium.forEach(medium => {
      res.push({
        type: 'medium',
        data: [medium.medium],
        id: medium.id,
      });
    });
  }

  if (obj.surface.length) {
    obj.surface.forEach(surface => {
      res.push({
        type: 'surface',
        data: [surface.surface],
        id: surface.id,
      });
    });
  }

  if (obj.hashtag.length) {
    obj.hashtag.forEach(hashtag => {
      res.push({ type: 'hashtag', data: hashtag.name });
    });
  }

  if (obj.artist.length) {
    obj.artist.forEach(artist => {
      res.push({
        type: 'artist',
        data: artist.name,
        to: getArtistGalleryURL(artist.username),
        param: artist.username,
      });
    });
  }

  if (obj.artwork.length) {
    obj.artwork.forEach(artwork => {
      res.push({
        type: 'artwork',
        data: artwork.title,
        to: getArtworkUrl(artwork.id, artwork.title),
        param: artwork.id,
      });
    });
  }

  return res.sort((a, b) => {
    const nameA = a.type;
    const nameB = b.type;

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
}
