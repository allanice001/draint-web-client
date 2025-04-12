import { axiosInstance } from 'dataLayer/axiosInstance';

export const getInitialContent = params =>
  axiosInstance().get(`/api/homepage/random/initial-data`, { params });

export const getInitialSlides = () =>
  axiosInstance().get(`/api/homepage/slides`);

export const getMoreArtworkStyles = params =>
  axiosInstance().get('/api/homepage/styles', { params });

export const getBlogPosts = () => axiosInstance().get('/api/homepage/blog-posts');

export const getSliderBlogPosts = () =>
  axiosInstance().get('/api/homepage/slider-blog-posts');
