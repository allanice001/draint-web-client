import axios from 'dataLayer/axiosInstance';

export const getAteliers = params =>
  axios.get(`/api/atelier/master/posts`, { params });

export const updateAtelier = (id, values) =>
  axios.put(`/api/atelier/master/update/${id}`, values);

export const deleteAtelierPost = id =>
  axios.delete(`/api/atelier/master/delete/${id}`);

export const updateAtelierTitles = (id, values) =>
  axios.put(`/api/atelier/master/titles/update/${id}`, values);
