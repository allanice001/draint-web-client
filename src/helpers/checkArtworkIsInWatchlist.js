export const checkArtworkIsInWatchlist = (watchlist, currentArtworkId) => {
  return watchlist.find(
    liked =>
      (liked.artwork_id ? liked.artwork_id : liked.currentArtwork.id) ===
      currentArtworkId
  );
};
