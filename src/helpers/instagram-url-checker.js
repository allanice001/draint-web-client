import { INSTAGRAM_LINKS_LEGACY } from 'constants/global';
import { INSTAGRAM_URL } from 'constants/components/master/filters-default';

export const hasInstagramLink = url => {
  if (hasLegacyInstagramLink(url)) {
    return false;
  }

  return url.includes(INSTAGRAM_URL);
};

export const getInstagramUsername = username => {
  if (hasLegacyInstagramLink(username)) {
    return null;
  }

  if (username.includes(INSTAGRAM_URL)) {
    return username.split(INSTAGRAM_URL)[1];
  }

  return username;
};

export const hasLegacyInstagramLink = url =>
  !url || INSTAGRAM_LINKS_LEGACY.find(link => url === link);


export const getContactsInstagram = username => {
  const instagram = getInstagramUsername(username);

  if (instagram && instagram.includes('@')) {
    return instagram.split('@')[1];
  }

  return instagram;
}
