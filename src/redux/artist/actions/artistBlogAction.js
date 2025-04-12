import {
  ADD_CURRENT_ARTIST_BLOG_POSTS,
  DELETE_CURRENT_SINGLE_BLOG_POST,
  SET_ARTIST_POSTS_LOADING,
  SET_CURRENT_ARTIST_BLOG_POSTS,
  UPDATE_CURRENT_SINGLE_BLOG_POST,
} from 'constants/redux/publicArtistProfile';
import {
  deleteArtistBlogPost,
  getAllArtistPosts,
  getSelectedArtistPost,
  saveArtistsBlogPost,
  updateArtistBlogPost,
} from 'dataLayer/blog/posts';
import { DELETED } from 'constants/blog';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { saveBlogContentImages } from 'services/blogService';
import { setSelectedPostToBlog } from './blog/actions';

export const setLoading = payload => ({
  type: SET_ARTIST_POSTS_LOADING,
  payload,
});

export const getCurrentArtistPosts = (artistId, params) => dispatch => {
  dispatch(setLoading(true));
  getAllArtistPosts(artistId, params)
    .then(posts => {
      dispatch({ type: SET_CURRENT_ARTIST_BLOG_POSTS, payload: posts.data });
      dispatch(setLoading(false));
    })
    .catch(err => {
      dispatch(setLoading(false));
      errorMessageHandler(err);
    });
};

export const saveBlogPost = (authorId, data) => dispatch => {
  dispatch(setLoading(true));
  const image = data.get('file');
  const images = data.getAll('image');
  saveArtistsBlogPost(authorId, data)
    .then(async ({ data }) => {
      const files = images ? images : [];

      await saveBlogContentImages(
        files.concat(image),
        data.blogImageUrls.concat(data.presignedUrl)
      );

      dispatch({ type: ADD_CURRENT_ARTIST_BLOG_POSTS, payload: data.post });
      dispatch(setLoading(false));
      dispatch(displayMessage(data.message));
    })
    .catch(err => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(err));
    });
};

export const deleteSinglePostBlogPost = postId => dispatch => {
  dispatch(setLoading(true));
  return deleteArtistBlogPost(postId)
    .then(() => {
      dispatch({ type: DELETE_CURRENT_SINGLE_BLOG_POST, payload: postId });
      dispatch(setLoading(false));
      dispatch(displayMessage(DELETED));
    })
    .catch(err => {
      dispatch(setLoading(false));
      errorMessageHandler(err);
    });
};

export const updateBlogPost = (postId, data) => dispatch => {
  dispatch(setLoading(true));
  const image = data.get('file');
  const images = data.getAll('image');
  updateArtistBlogPost(postId, data)
    .then(async ({ data }) => {
      const files = images ? images : [];

      await saveBlogContentImages(
        files.concat(image),
        data.blogImageUrls.concat(data.presignedUrl)
      );
      dispatch({ type: UPDATE_CURRENT_SINGLE_BLOG_POST, payload: data.post });
      dispatch(setLoading(false));
      dispatch(displayMessage(data.message));
    })
    .catch(err => {
      dispatch(setLoading(false));
      errorMessageHandler(err);
    });
};

export const getSelectedArtistPosts = postId => dispatch => {
  getSelectedArtistPost(postId)
    .then(({ data }) => {
      dispatch(setLoading(true));
      dispatch(setSelectedPostToBlog(data));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(error));
    });
};
