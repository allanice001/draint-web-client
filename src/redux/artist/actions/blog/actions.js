import {
  RESET_CURRENT_ARTIST_BLOG_POST,
  SET_CURRENT_ARTIST_BLOG_POST,
  SET_CURRENT_ARTIST_BLOG_POSTS,
  SET_INITIAL_VALUE_OF_CURRENT_ARTIST_POSTS,
} from 'constants/redux/publicArtistProfile';

export const setSelectedPostToBlog = post => ({
  type: SET_CURRENT_ARTIST_BLOG_POST,
  payload: post,
});

export const resetSelectedPostToBlog = () => ({
  type: RESET_CURRENT_ARTIST_BLOG_POST,
});

export const setInitialValueOfCurrentArtistsPosts = () => ({
  type: SET_INITIAL_VALUE_OF_CURRENT_ARTIST_POSTS,
});

export const setCurrentArtistPosts = posts => ({
  type: SET_CURRENT_ARTIST_BLOG_POSTS,
  payload: posts,
});
