import axios from '../axiosInstance';

export const setCurrentUrls = (urls) => axios.post(`/api/permission/master/urls`, { urls });

export const getUsers = (params) => axios.get(`/api/permission/master/users`, { params });

export const sendPermissionToken = (params) => axios.get(`/api/invitation/token`, { params } );

export const updateUser = (userId, permission) => axios.put(`/api/permission/master/access/${userId}`, permission);

export const sendUserInvite = (values) => axios.post(`/api/invitation/user`, values );
