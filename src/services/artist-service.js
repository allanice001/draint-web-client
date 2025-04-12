import { axiosInstance } from 'dataLayer/axiosInstance';
import staticUrls from 'constants/images/static-urls';

export class ArtistService {
  baseUrl = '/api/artists/';

  getAllArtists = async parameters => {
    const res = await axiosInstance().get(`${this.baseUrl}all`, {
      params: parameters,
    });

    return {
      countries: res.data.countries,
      data: res.data.searchByNameRes,
      total: res.data.totalArtists,
      totalPages: res.data.totalPages,
    };
  };

  filterArtistAvatar = source => {
    if (source) {
      return source.includes('https://res.cloudinary.com') ||
        source.includes('https://instagram')
        ? staticUrls.image.avatarPlaceholder
        : source;
    }
    return source;
  };
}
