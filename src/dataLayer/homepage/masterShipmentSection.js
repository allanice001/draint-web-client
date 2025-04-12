import axios from '../axiosInstance';

export const getSections = () => {
  return axios.get('/api/master/shipment-section');
};

export const createNewSection = values => {
  return axios.post('/api/master/shipment-section', values);
};

export const updateSection = values => {
  return axios.put('/api/master/shipment-section', values);
};

export const changeStatus = (id, status, role) => {
  return axios.put('/api/master/shipment-section/change-status', {
    data: { id, status, role },
  });
};

export const deleteSection = id => {
  return axios.delete(`/api/master/shipment-section/${id}`);
};
