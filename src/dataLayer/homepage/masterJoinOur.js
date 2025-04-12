import axios from '../axiosInstance';

export const getSections = () => {
  return axios.get('/api/master/join-our');
};

export const createNewSection = values => {
  return axios.post('/api/master/join-our', values);
};

export const updateSection = values => {
  return axios.put('/api/master/join-our', values);
};

export const changeStatus = (id, status, role) => {
  return axios.put('/api/master/join-our/change-status', {
    data: { id, status, role },
  });
};

export const deleteSection = id => {
  return axios.delete(`/api/master/join-our/${id}`);
};
