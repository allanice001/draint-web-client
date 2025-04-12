import { GET_SHIPMENT_RATE } from '../../../constants/redux/checkout';

export default function getShipmentRate(payload) {
  return { type: GET_SHIPMENT_RATE, payload };
}
