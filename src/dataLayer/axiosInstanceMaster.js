import axios from 'axios';
const Settings = require('settings.json');
const { api_server } = Settings[process.env.NODE_ENV];

const axiosMasterInstance = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.create({
    baseURL: api_server,
    timeout: 15000,
    headers: user ? { Authorization: `Bearer ${user.token}` } : '',
  });
};

export default axiosMasterInstance();
