import { axiosInstance } from 'dataLayer/axiosInstance';

function deleteAccountRequest(account_id, profile_id, feedback) {
  return axiosInstance().delete('/api/dashboard/account', {
    data: {
      account_id,
      profile_id,
      feedback,
    },
  });
}

export default deleteAccountRequest;
