import axios from '../axiosInstance';

export const getSections = () => {
  return axios.get('/api/master/join-us');
};

export const createNewSection = values => {
  return axios.post('/api/master/join-us', values);
};

export const updateSection = values => {
  return axios.put('/api/master/join-us', values);
};

export const changeStatus = (id, status, role) => {
  return axios.put('/api/master/join-us/change-status', {
    data: { id, status, role },
  });
};

export const deleteSection = id => {
  return axios.delete(`/api/master/join-us/${id}`);
};
