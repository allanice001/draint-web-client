export const checkSubscription = (artistSubscribed, currentArtistId) => {
  return artistSubscribed.find(subscribe => subscribe.artist_profile_id === currentArtistId);
};
