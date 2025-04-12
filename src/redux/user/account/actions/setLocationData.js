import { SET_LOCATION_DATA_SUCCESS } from 'constants/redux/user';

export default function setLocationData(location) {
  const {
    id, addressLine1, addressLine2, city, state, zipcode, region, country, latitude, longitude,
  } = location;
  return {
    type: SET_LOCATION_DATA_SUCCESS,

    payload: {
      location: {
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          zipcode,
          country,
          region,
        },

        locationId: id,
        coords: { latitude, longitude },
      },
    },
  };
  
}
