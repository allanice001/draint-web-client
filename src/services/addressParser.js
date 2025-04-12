export const defineAddressParts = addressPartials => {
  const getAddressCollection = () => ({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  });
  const getAddressLine1 = (data) => {
    return `${data.addressLine2 ? (`${data.addressLine2.long_name} `) : ''}${data?.addressLine1?.long_name || ''}`
  };

  const addressCollection = getAddressCollection();
  const filteredData = {
    addressLine1: addressPartials.find(part => part.types.includes('route')),

    addressLine2: addressPartials.find(part =>
      part.types.includes('street_number')
    ),

    city: addressPartials.find(part => part.types.includes('locality')),

    state: addressPartials.find(part =>
      part.types.includes('administrative_area_level_1')
    ),

    country: addressPartials.find(part => part.types.includes('country')),
    zipcode: addressPartials.find(part => part.types.includes('postal_code')),
  };
  addressCollection.addressLine1 = getAddressLine1(filteredData);
  addressCollection.city = filteredData.city ? filteredData.city.long_name : '';
  addressCollection.state = filteredData?.state?.long_name || '';
  addressCollection.country = filteredData?.country?.long_name || '';
  addressCollection.zipcode = filteredData?.zipcode?.long_name || '';
  return addressCollection;
};
