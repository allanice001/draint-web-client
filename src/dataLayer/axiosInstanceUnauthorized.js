import axios from 'axios';
const Settings = require('settings.json');

const { api_server } = Settings[process.env.NODE_ENV];

const axiosUnauthorizedInstance = () => {
  return axios.create({
    baseURL: api_server,
    timeout: 5000,
  });
};

export default axiosUnauthorizedInstance();
