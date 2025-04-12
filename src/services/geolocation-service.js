import axios from 'axios';

export default function getGeolocation() {
  return new Promise((response, reject) => {
    navigator.geolocation.getCurrentPosition(response, reject, {
      timeout: 1000,
    });
  })
    .then(response => {
      if (response.coords) {
        return {
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        };
      }

      return undefined;
    })
    .catch(() => {
      return axios
        .get('https://geolocation-db.com/json/')
        .then(({ data }) => {
          if (data.latitude && data.longitude) {
            return {
              latitude: data.latitude,
              longitude: data.longitude,
            };
          }

          return undefined;
        })
        .catch(error => {
          console.log(error.message);
          return undefined;
        });
    });
}
