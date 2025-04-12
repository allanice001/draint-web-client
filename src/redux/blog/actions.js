import * as ACTION from './constants';
import * as api from 'dataLayer/blog/posts';

const createAction = type => payload => ({ type, payload });

const setLoading = createAction(ACTION.SET_LOADING);
const getPostsSuccess = createAction(ACTION.GET_POSTS_SUCCESS);
const getPostsError = createAction(ACTION.GET_POSTS_ERROR);
const getCategoriesSuccess = createAction(ACTION.GET_CATEGORIES_SUCCESS);
const getCategoriesError = createAction(ACTION.GET_CATEGORIES_ERROR);
const getCategoryPostsSuccess = createAction(ACTION.GET_CATEGORY_POSTS_SUCCESS);
const getCategoryPostsError = createAction(ACTION.GET_CATEGORY_POSTS_ERROR);
const getFooterBlogsPostsSuccess = createAction(
  ACTION.GET_FOOTER_POSTS_SUCCESS
);
const getFooterBlogsPostsError = createAction(ACTION.GET_FOOTER_POSTS_ERROR);
const getPopularPostsSuccess = createAction(ACTION.GET_POPULAR_POSTS_SUCCESS);
const getPopularPostsError = createAction(ACTION.GET_POPULAR_POSTS_ERROR);

export const getCategoryPosts = (params, categoryName) => async dispatch => {
  const request = params.categoryId
    ? api.getPublicCategoryPosts
    : api.getAtelierPosts;

  try {
    dispatch(setLoading(true));

    const data = await request(params);
    dispatch(
      getCategoryPostsSuccess({
        [categoryName]: data.posts,
        pagination: data.pagination,
      })
    );
  } catch (error) {
    dispatch(getCategoryPostsError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getPosts = params => async dispatch => {
  try {
    dispatch(setLoading(true));

    const posts = await api.getPublicPosts(params);
    dispatch(getPostsSuccess(posts));
  } catch (error) {
    dispatch(getPostsError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getPopularPosts = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const posts = await api.getPopularPosts();
    dispatch(getPopularPostsSuccess(posts));
  } catch (error) {
    dispatch(getPopularPostsError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getFooterBlogs = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const posts = await api.getFooterBlogsPosts();
    dispatch(getFooterBlogsPostsSuccess(posts));
  } catch (error) {
    dispatch(getFooterBlogsPostsError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getCategories = () => async dispatch => {
  try {
    dispatch(setLoading(true));

    const categories = await api.getPostsCategories();
    dispatch(
      getCategoriesSuccess([
        ...categories,
        { name: 'My Atelier', key: 'atelier', title: 'My Atelier' },
      ])
    );
  } catch (error) {
    dispatch(getCategoriesError(error));
  } finally {
    dispatch(setLoading(false));
  }
};
