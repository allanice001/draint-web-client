import { axiosInstance } from 'dataLayer/axiosInstance';

function saveNewsLetterEmail(param) {
  return axiosInstance().post('/api/newsletter-subscription', param)
}

export default saveNewsLetterEmail;
