import axios from '../axiosInstance';

export const UpdateKlarnaOrders = params => axios.post('/api/checkout/klarna', params);
