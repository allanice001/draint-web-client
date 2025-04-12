import axios from '../axiosInstance';

export const getArtistAtelier = (profileId) => axios.get(`/api/atelier/artist/${profileId}`);

export const createAtelierContent = (values, type) => axios.post(`/api/atelier/create/${type}`, values );
export const createAtelierPage = (values) => axios.post(`/api/atelier/initialize/`, values);
export const updateAtelierContent = (values, type) => axios.put(`/api/atelier/update/${type}/${values.id}`, values );

export const createAtelier = (profileId) => axios.post(`/api/atelier/initialize`, { profileId })
