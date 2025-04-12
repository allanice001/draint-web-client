import axios from 'axios';
const Settings = require('settings.json');

const getApiUrl = () => {
  if (process.env.NODE_ENV === 'test') return undefined;

  const { api_server } = Settings[process.env.NODE_ENV];

  return api_server;
};

export const axiosInstance = (timeout = 18000) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.create({
    baseURL: getApiUrl(),
    timeout,
    headers: user ? { Authorization: `Bearer ${user.token}` } : '',
  });
};

export function getPrivateAxiosInstance(token) {
  return axios.create({
    baseURL: getApiUrl(),
    timeout: 18000,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default axiosInstance();
