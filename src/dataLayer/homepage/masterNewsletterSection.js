import axios from '../axiosInstance';

export const getSections = () => {
  return axios.get('/api/master/newsletter-section');
};

export const createNewSection = values => {
  return axios.post('/api/master/newsletter-section', values);
};

export const updateSection = values => {
  return axios.put('/api/master/newsletter-section', values);
};

export const changeStatus = (id, status, role) => {
  return axios.put('/api/master/newsletter-section/change-status', {
    data: { id, status, role },
  });
};

export const deleteSection = id => {
  return axios.delete(`/api/master/newsletter-section/${id}`);
};
