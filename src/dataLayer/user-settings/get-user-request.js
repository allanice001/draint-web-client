import { axiosInstance } from 'dataLayer/axiosInstance';

function getUserAccountRequest(geolocation) {
  return axiosInstance().get('/api/dashboard/account', {
    params: { ...geolocation },
  });
}

export default getUserAccountRequest;
