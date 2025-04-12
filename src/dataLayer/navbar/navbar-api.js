import axios from '../axiosInstance';

export const navbarAPI = {
  getPopularNavBar() {
    return axios.get('/api/artists/popular');
  },
};
