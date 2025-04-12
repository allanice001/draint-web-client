import { axiosInstance } from 'dataLayer/axiosInstance';

const checkIsActivatedUserRequest = params => {
  return axiosInstance().post(
    '/api/account/check-user-profile-activated-status',
    params
  );
};

export default checkIsActivatedUserRequest;
