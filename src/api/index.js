import axios from 'axios';
const Settings = require('settings.json');

const { api_server } = Settings[process.env.NODE_ENV];

const axiosInstance = axios.create({
  baseURL: api_server,
  timeout: 5000,
  headers: {},
});

export default axiosInstance;

export {
  validateAddress,
  getAddressPrecisionMessage,
} from './addressValidation';
