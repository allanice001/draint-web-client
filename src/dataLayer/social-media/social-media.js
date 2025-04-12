import axios from '../axiosInstanceMaster';

export const socialMediaAPI = {
  downloadImage: async imageURL => {
    return axios.post('/api/master/socialMedia/image', { image: imageURL });
  },
};
