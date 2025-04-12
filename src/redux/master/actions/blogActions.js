import {
  CREATE_MASTER_POST,
  DELETE_POST,
  SET_CATEGORIES,
  SET_FILTERS,
  SET_LOADING,
  SET_POSTS,
  UPDATE_POST,
} from 'constants/redux/masterBlog';
import {
  deleteArtistBlogPost,
  getFilteredPosts,
  getPostsCategories,
  saveArtistsBlogPost,
  updatePostByAdmin,
} from 'dataLayer/blog/posts';
import { BLOG_DELETED } from 'constants/blog';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { saveBlogContentImages } from 'services/blogService';
import { successHandler } from 'helpers/redux-helpers/helper';

export const setFilters = payload => ({
  type: SET_FILTERS,
  payload,
});

export const setLoading = payload => ({
  type: SET_LOADING,
  payload,
});

export const setBlogCategories = () => dispatch => {
  dispatch({ type: SET_CATEGORIES });
  getPostsCategories()
    .then(result => dispatch(successHandler(SET_CATEGORIES, result)))
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const setFilteredPosts = params => dispatch => {
  dispatch(setLoading(true));
  getFilteredPosts(params)
    .then(posts => {
      dispatch(successHandler(SET_POSTS, posts.data));
      dispatch(setLoading(false));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(error));
    });
};

export const saveBlogPostByMaster = (authorId, data) => dispatch => {
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

      dispatch(successHandler(CREATE_MASTER_POST, data.post));
      dispatch(setLoading(false));
      dispatch(displayMessage(data.message));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(error));
    });
};

export const updatePost = (id, data) => dispatch => {
  dispatch(setLoading(true));
  const image = !data.status && !data.category_id && data.get('file');
  const images = !data.status && !data.category_id && data.getAll('image');
  updatePostByAdmin(id, data)
    .then(async ({ data }) => {
      const files = images ? images : [];

      await saveBlogContentImages(
        files.concat(image),
        data.blogImageUrls?.concat(data.presignedUrl)
      );

      dispatch(successHandler(UPDATE_POST, data.post));
      dispatch(setLoading(false));
      dispatch(displayMessage(data.message));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(error));
    });
};

export const deletePostByAdmin = postId => dispatch => {
  dispatch(setLoading(true));
  deleteArtistBlogPost(postId)
    .then(() => {
      dispatch(successHandler(DELETE_POST, postId));
      dispatch(setLoading(false));
      dispatch(displayMessage(BLOG_DELETED));
    })
    .catch(error => {
      dispatch(setLoading(false));
      dispatch(errorMessageHandler(error));
    });
};
