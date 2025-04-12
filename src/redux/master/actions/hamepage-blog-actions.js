import {
  GET_LAST_BLOG_SUCCESS,
  GET_SlIDER_BLOG_SUCCESS,
} from '../../../constants/redux/publicHomepage';
import {
  getBlogPosts,
  getSliderBlogPosts,
} from '../../../dataLayer/homepage/homepage';
import errorMessageHandler from '../../global/notiifcation/actions/error-handler';
export const getBlogPostsSuccess = payload => ({
  type: GET_LAST_BLOG_SUCCESS,
  payload,
});

export const getSliderBlogPostsSuccess = payload => ({
  type: GET_SlIDER_BLOG_SUCCESS,
  payload,
});

export const getLastBlogPosts = () => dispatch => {
  getBlogPosts()
    .then(res => dispatch(getBlogPostsSuccess(res.data)))
    .catch(err => dispatch(errorMessageHandler(err)));
};

export const getBlogPostsForSlider = () => dispatch => {
  getSliderBlogPosts()
    .then(res => dispatch(getSliderBlogPostsSuccess(res.data)))
    .catch(err => dispatch(errorMessageHandler(err)));
};
