import * as settings from 'settings.json';

import { getArtworkUrl } from 'helpers/artowork-card/get-artwork-url';
import { urls } from 'constants/urls';

const environment = process.env.NODE_ENV;

export const getArtworkLink = (artworkId, artworkTitle) => {
  const currentAddress = settings.default[environment]?.front_server;

  if (!artworkId) {
    return null;
  }

  const artworkUrl = getArtworkUrl(artworkId, artworkTitle);

  switch (currentAddress) {
    case urls.LOCAL:
      return urls.LOCAL + artworkUrl;

    case urls.STAGING:
      return urls.STAGING + artworkUrl;

    case urls.PROD:
      return urls.PROD + artworkUrl;

    default:
      return null;
  }
};
