import axios from '../axiosInstance';

export const getLegal = (params) =>  axios.get('/api/legal/get-data', { params });

export const deleteLegal = (id) => axios.post('/api/legal/delete-legal', { id });

export const createLegal = (formData) => axios.post('/api/legal/add-legal', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const editLegal = (formData) => axios.put('/api/legal/update-legal', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const getSelectLegal = (query) => axios.get(`/api/legal/${query}`);

export const getImprintData = () => axios.get(`/api/legal/imprint/data`);
