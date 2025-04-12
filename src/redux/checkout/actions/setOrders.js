import { SET_ORDERS } from '../../../constants/redux/checkout';

const setOrders = (orders) => ({ type: SET_ORDERS, payload: orders });

export default setOrders;
