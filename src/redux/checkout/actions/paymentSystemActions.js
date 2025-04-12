import { SET_PAYMENT_SYSTEM_ACCESS, SET_PAYMENT_SYSTEM_IS_FROM_VALID } from '../../../constants/redux/checkout';

export const setPaymentSystemAccess = payload => ({ type: SET_PAYMENT_SYSTEM_ACCESS, payload });

export const setPaymentSystemIsFromValid = payload => ({ type: SET_PAYMENT_SYSTEM_IS_FROM_VALID, payload });
