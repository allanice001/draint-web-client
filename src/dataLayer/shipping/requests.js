import { axiosInstance } from 'dataLayer/axiosInstance';

export function publicRatesRequest(buyerData, sellerProfileId, artworkId) {
  return axiosInstance().post('/api/shipping/ups-get-artwork-rate', {
    buyerData,
    sellerProfileId,
    artworkId,
  });
}

export function confirmShipmentRequest(
  buyerProfileId,
  buyerAddress,
  artworkId,
  selectedRate,
  sellerProfileId
) {
  return axiosInstance().post(`/api/shipping/ups-ship-confirm`, {
    buyerProfileId,
    buyerAddress,
    artworkId,
    selectedRate,
    sellerProfileId,
  });
}

export function cancelShipmentRequest(shipmentId, artworkId) {
  return axiosInstance().post(`/api/shipping/ups-ship-confirm-cancel`, {
    shipmentId,
    artworkId,
  });
}

export function publicManualRatesRequest(
  buyerData,
  sellerProfileId,
  artworkId
) {
  return axiosInstance().post('/api/shipping/manual-get-artwork-rate', {
    buyerData,
    sellerProfileId,
    artworkId,
  });
}

export function confirmShipmentManualRequest(
  buyerProfileId,
  buyerAddress,
  artwork
) {
  return axiosInstance().post(`/api/shipping/manul-ship-confirm`, {
    buyerProfileId,
    buyerAddress,
    artwork,
  });
}

export function cancelManualShipmentRequest(shipmentId, artworkId) {
  return axiosInstance().post(`/api/shipping/manual-ship-confirm-cancel`, {
    shipmentId,
    artworkId,
  });
}
