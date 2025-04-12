import {
  GET_LAST_BLOG_SUCCESS,
  GET_SlIDER_BLOG_SUCCESS,
} from '../../../constants/redux/publicHomepage';

const initialState = {
  lastBlogPosts: [],
  sliderBlogPosts: [],
};
function homepageBlogReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LAST_BLOG_SUCCESS: {
      return {
        ...state,
        lastBlogPosts: action.payload,
      };
    }
    case GET_SlIDER_BLOG_SUCCESS: {
      return {
        ...state,
        sliderBlogPosts: action.payload,
      };
    }
    default:
      return state;
  }
}
export default homepageBlogReducer;
