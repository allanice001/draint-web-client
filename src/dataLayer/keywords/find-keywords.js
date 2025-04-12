import axios from 'dataLayer/axiosInstance';

/**
 * @param {string} name
 * @param {string} category
 */
export const findKeywords = async (name, category = '') => {
  const response = await axios.get(`/api/hashtags/`, {
    params: { name, category },
  });

  return response.data;
};
