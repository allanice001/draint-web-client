import { axiosInstance } from 'dataLayer/axiosInstance';

export const getAllArtistPosts = (artistId, params) =>
  axiosInstance().get(`/api/blog/posts/artist/${artistId}`, { params });

export const getAllArtistPostsByUsername = username =>
  axiosInstance().get(`/api/blog/posts/${username}`);

export const saveArtistsBlogPost = (authorId, data) =>
  axiosInstance(100000).post(`/api/blog/posts`, data);

export const deleteArtistBlogPost = postId =>
  axiosInstance().delete(`/api/blog/posts/${postId}`);

export const updateArtistBlogPost = (postId, data) =>
  axiosInstance().put(`/api/blog/posts/${postId}`, data);

export const getSelectedArtistPost = postId =>
  axiosInstance().get(`/api/blog/posts/${postId}`);

export const getPopularPosts = () =>
  axiosInstance()
    .get(`/api/blog/posts/popular`)
    .then(response => response.data);

export const getPublicPosts = params =>
  axiosInstance()
    .get('api/blog/posts/custom/data', { params })
    .then(response => response.data);

export const getAtelierPosts = params =>
  axiosInstance()
    .get('api/atelier/posts/custom/data', { params })
    .then(response => response.data);

export const getPublicCategoryPosts = params =>
  axiosInstance()
    .get('api/blog/posts/custom/category', { params })
    .then(response => response.data);

export const getPostsCategories = () =>
  axiosInstance()
    .get('api/blog/categories')
    .then(response => {
      const data = response.data || [];

      return data.map(el => {
        return {
          ...el,
          key: el.name
            .toLowerCase()
            .split(' ')
            .join('-'),
        };
      });
    });

export const getFilteredPosts = params =>
  axiosInstance().get('api/blog/posts', { params });

export const updatePostByAdmin = (id, data) =>
  axiosInstance().put(`/api/blog/posts/update/${id}`, data);

export const getAllArtistPostsById = (id, params) =>
  axiosInstance().get(`/api/blog/template/${id}`, { params });

export const getFooterBlogsPosts = () =>
  axiosInstance().get('/api/blog/footer');
