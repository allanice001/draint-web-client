export const parseArtworkURL = artworkURL => {
  if (artworkURL) {
    return artworkURL.split('/id/')[1].split('/')[0];
  }
};
