import axios from '../axiosInstance';

export const getSlides = () => {
  return axios.get('/api/homepage/master/slides');
};

export const createSlide = values => {
  return axios.post('/api/homepage/master/create', values);
};

export const updateSlide = values => {
  return axios.put(`/api/homepage/master/update-slide/${values.id}`, values);
};

export const changeSlideStatus = (id, status) => {
  return axios.put(`/api/homepage/master/update/${id}`, status);
};

export const deleteCurrentSlide = id => {
  return axios.delete(`/api/homepage/master/delete/${id}`);
};
