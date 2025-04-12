import {
  DELETE_SINGLE_BLOG_POST,
  GET_SUBSCRIBED_ARTIST_PAGINATION,
  GET_SUBSCRIBED_ARTIST_SUCCESS,
  GET_USER_ARTWORKS_PAGINATION,
  GET_USER_ARTWORKS_SUCCESS,
  GET_USER_AVATAR_SUCCESS,
  OPEN_BLOG_EDITING_MODAL,
  SET_BLOG_POST,
  SET_BLOG_POSTS,
  SET_FOR_SALE_STATUS,
  SET_GALLERY_LOADING,
  SET_SUBSCRIBED_ARTIST_ALL,
  SET_USER_AVATAR_LOADING,
  UPDATE_ARTWORK_PRICE,
  UPDATE_SINGLE_BLOG_POST,
} from 'constants/redux/dashboardGallery';
import {
  deleteArtistBlogPost,
  getAllArtistPosts,
  saveArtistsBlogPost,
  updateArtistBlogPost,
} from 'dataLayer/blog/posts';
import {
  getCollectorGalleryRequest,
  getSubscribedArtistFullRequest,
  getSubscribedArtistRequest,
  unsubscribeOfArtistRequest,
  updateArtworkPriceRequest,
} from 'dataLayer/gallery/collector-artowrks';
import { axiosInstance } from 'dataLayer/axiosInstance';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

export const setLoading = payload => ({
  type: SET_GALLERY_LOADING,
  payload,
});

export const getUserArtworksSuccess = payload => ({
  type: GET_USER_ARTWORKS_SUCCESS,
  payload,
});

export const getUserArtworksPagination = payload => ({
  type: GET_USER_ARTWORKS_PAGINATION,
  payload,
});

export const getSubscribedArtistSuccess = payload => ({
  type: GET_SUBSCRIBED_ARTIST_SUCCESS,
  payload,
});

export const setSubscribedArtistAll = payload => ({
  type: SET_SUBSCRIBED_ARTIST_ALL,
  payload,
});

export const getSubscribedArtistPagination = payload => ({
  type: GET_SUBSCRIBED_ARTIST_PAGINATION,
  payload,
});

export const setAvatarLoading = () => ({
  type: SET_USER_AVATAR_LOADING,
});

export const getUserAvatarSuccess = payload => ({
  type: GET_USER_AVATAR_SUCCESS,
  payload,
});

export const updateArtworkPrice = payload => ({
  type: UPDATE_ARTWORK_PRICE,
  payload,
});

export const getUserArtworks = (page = 1, pageSize = 6) => dispatch => {
  dispatch(setLoading());
  getCollectorGalleryRequest(page, pageSize)
    .then(({ data }) => {
      dispatch(getUserArtworksSuccess(data.artworks));
      dispatch(getUserArtworksPagination(data.pagination));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoading());
    });
};

export const getSubscribedArtist = (page = 1, pageSize = 6) => dispatch => {
  dispatch(setLoading());
  getSubscribedArtistRequest(page, pageSize)
    .then(({ data }) => {
      dispatch(getSubscribedArtistSuccess(data.subscriptions));
      dispatch(getSubscribedArtistPagination(data.pagination));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoading());
    });
};

export const getSubscribedArtistFull = () => dispatch => {
  dispatch(setLoading());
  getSubscribedArtistFullRequest()
    .then(({ data }) => {
      dispatch(setSubscribedArtistAll(data.subscriptions));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoading());
    });
};

export const unsubscribeOfArtist = id => dispatch => {
  dispatch(setLoading());
  unsubscribeOfArtistRequest(id)
    .then(response => {
      dispatch(getSubscribedArtist());
      dispatch(getSubscribedArtistFull());
      dispatch(displayMessage(response.data.message));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoading());
    });
};

export const unsubscribeOfArtistUnlogged = id => dispatch => {
  dispatch(setLoading());
  unsubscribeOfArtistRequest(id)
    .then(response => {
      dispatch(displayMessage(response.data.message));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setLoading());
    });
};

export const getUserAvatar = () => dispatch => {
  dispatch(setAvatarLoading());
  axiosInstance()
    .get('/api/artist/theme')
    .then(themeData => {
      dispatch(
        getUserAvatarSuccess({
          scale: themeData.data.scale || 0,
          left: themeData.data.left || 0,
          top: themeData.data.top || 0,
          bottom: 100 - themeData.data.top,
          backgroundUrl: themeData.data.backgroundUrl,
          artworkUrl: themeData.data.artworkUrl,
          artworkOptions: themeData.data.artworkOptions,
        })
      );
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setAvatarLoading());
    });
};

export const updateUserAvatar = data => dispatch => {
  dispatch(setAvatarLoading());
  axiosInstance()
    .post('/api/artist/theme', data)
    .then(res => dispatch(displayMessage(res.data.message)))
    .then(() => dispatch(getUserAvatar()))
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(setAvatarLoading());
    });
};

export const uploadUserAvatar = (data, size, accountAvatar) => dispatch => {
  if (size === 'big') {
    dispatch(setAvatarLoading());
    axiosInstance()
      .post('/api/artwork/upload/updateThemeBig', data)
      .then(res => {
        const updated = accountAvatar;
        updated.backgroundUrl = res.data.avatarImage;
        dispatch(getUserAvatarSuccess(updated));
        dispatch(displayMessage(res.data.message));
      })
      .catch(error => {
        dispatch(errorMessageHandler(error));
        dispatch(setAvatarLoading());
      });
  }
  if (size === 'small') {
    axiosInstance()
      .post('/api/artwork/upload/updateThemeSmall', data)
      .catch(error => dispatch(errorMessageHandler(error)));
  }
};

export const getArtistPosts = artistId => (dispatch, getState) => {
  const { posts } = getState().dashboard.gallery;
  if (posts.length === 0) {
    getAllArtistPosts(artistId).then(posts =>
      dispatch({ type: SET_BLOG_POSTS, payload: posts.data })
    );
  }
};

export const saveBlogPost = (authorId, data) => dispatch =>
  saveArtistsBlogPost(authorId, data)
    .then(post => {
      dispatch({ type: SET_BLOG_POST, payload: post.data.post });
      dispatch(displayMessage(post.data.message));
      return true;
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      return false;
    });

export const deleteSinglePostBlogPost = postId => dispatch =>
  deleteArtistBlogPost(postId)
    .then(() => {
      dispatch({ type: DELETE_SINGLE_BLOG_POST, payload: postId });
      dispatch(displayMessage('Your post was deleted'));
      return true;
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      return false;
    });

export const updateBlogPost = (postId, data) => dispatch =>
  updateArtistBlogPost(postId, data)
    .then(res => {
      dispatch({ type: UPDATE_SINGLE_BLOG_POST, payload: res.data.post });
      dispatch(displayMessage(res.data.message));
      return true;
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      return false;
    });

export const setForSaleStatus = payload => ({
  type: SET_FOR_SALE_STATUS,
  payload,
});

export const changeArtworkSaleStatus = (artworkId, status) => dispatch => {
  setLoading(true);
  axiosInstance()
    .post('/api/artwork/update/status', { artworkId, status })
    .then(res => {
      dispatch(setForSaleStatus({ id: artworkId, for_sale: res.data }));
      setLoading(false);
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      setLoading(false);
    });
};

export const changeArtworkSalePrice = (
  artworkId,
  price,
  prevPrice
) => dispatch => {
  setLoading(true);

  updateArtworkPriceRequest({ artworkId, price, prevPrice })
    .then(data => {
      dispatch(
        updateArtworkPrice({
          id: artworkId,
          price: data.data,
        })
      );
      setLoading(false);
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      setLoading(false);
    });
};

export const handleOpenEditingBlogModal = () => ({
  type: OPEN_BLOG_EDITING_MODAL,
});
