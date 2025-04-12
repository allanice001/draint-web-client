import axiosInstance from '.';

export const validateAddress = ({
  country = '',
  city = '',
  postalCode = '',
  state = '',
  addressLine1 = '',
  addressLine2 = '',
}) =>
  axiosInstance.get(
    `https://international-street.api.smartystreets.com/verify?key=12422113830682615&country=${country}&address1=${addressLine1}&locality=${city}&administrative_area=${state}&postal_code=${postalCode}&geocode=true`
  );

export const getAddressPrecisionMessage = precision => {
  switch (precision) {
    case 'None':
      return 'Address not known, possibly because this address is invalid.';
    // eslint-disable-next-line max-len
    case 'AdministrativeArea':
      return 'Address is only verified down to the administrative area. (e.g., typically a state or province)';
    case 'Locality':
      return 'Address is only verified down to the locality. (e.g., typically a city or town)';
    case 'Thoroughfare':
      return 'Address is only verified down to the thoroughfare level. (e.g., typically a street)';
    // eslint-disable-next-line max-len
    case 'Premise':
      return 'Address is verified down to the premise level. (e.g., typically an individual property or building)';
    case 'DeliveryPoint':
      return 'Address is verified down to the delivery point. (e.g., rooftop level)';
    default:
      return 'Address not known, possibly because this address is invalid.';
  }
};
