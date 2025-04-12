import { axiosInstance } from '../axiosInstance';
import { handleInstagramUsername } from 'helpers/social-media/handle-instagram-username';

export default function updateUserAccountRequest(formData) {
  return axiosInstance().put('/api/dashboard/account', {
    updates: {
      ...formData,
      instagram: handleInstagramUsername(formData.instagram),
      accountId: formData.id || formData.account_id,
    },
  });
}
