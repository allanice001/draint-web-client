import { axiosInstance } from 'dataLayer/axiosInstance';

const getImageFromS3Request = params =>
  axiosInstance(10000).get('/api/master/artists/prepare-image-object', {
    params,
  });

export default getImageFromS3Request;
