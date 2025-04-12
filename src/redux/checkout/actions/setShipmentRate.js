import { SET_SHIPMENT_RATE } from '../../../constants/redux/checkout';

export default function setShipmentRate(payload) {
  return { type: SET_SHIPMENT_RATE, payload };
}
