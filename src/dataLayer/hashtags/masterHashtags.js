import axios from '../axiosInstance';

export const getHashtagsRequest = params => axios.get('api/master/hashtags', { params });

export const deleteHashtagRequest = id => axios.delete(`api/master/hashtag/${id}`);

export const updateHashtagRequest = (id, name) => axios.put(`api/master/hashtag/${id}`, { name });
