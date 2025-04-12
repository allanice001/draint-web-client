import { axiosInstance } from 'dataLayer/axiosInstance';

const updateUserProfileRoleRequest = params => {
  return axiosInstance().post('/api/account/update-user-profile-role', params);
};

export default updateUserProfileRoleRequest;
