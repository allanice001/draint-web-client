import axios, { axiosInstance } from '../dataLayer/axiosInstance';
import { isoCountries } from '../components/countries/list';
import staticUrls from 'constants/images/static-urls';

export class ArtworkService {
  baseUrl = '/api/artworks/';

  countries = isoCountries.map((element, index) => ({
    id: index,
    key: element.ccode,
    label: element.cname,
  }));

  getArtworks = params =>
    axiosInstance()
      .get(`${this.baseUrl}all/?cartHash=${localStorage.cartId}`, { params })
      .then(res => ({
        data: res.data.searchResult,
        total: res.data.totalArtworks,
        totalPages: res.data.totalPages,
        inTrade: false,
      }));

  getArtworksHomepage = params =>
    axiosInstance().get(`${this.baseUrl}allOnHomepage`, { params });

  getStyles = () =>
    axios
      .get(`${this.baseUrl}styles`)
      .then(({ data }) =>
        data.map(({ id, value }) => ({ id, key: value, label: value }))
      );

  getMediums = () =>
    axios
      .get(`${this.baseUrl}medium`)
      .then(({ data }) =>
        data.map(({ id, value }) => ({ id, key: value, label: value }))
      );

  getSurfaces = () =>
    axios
      .get(`${this.baseUrl}surface`)
      .then(({ data }) =>
        data.map(({ id, value }) => ({ id, key: value, label: value }))
      );

  getCountries = () => [...this.countries];

  getAllTrade = params =>
    axiosInstance(15000)
      .get(`${this.baseUrl}trade`, { params })
      .then(res => ({
        data: res.data.artworks,
        totalPages: res.data.pagination.pageCount,
        total: res.data.pagination.rowCount,
        inTrade: true,
      }));

  getInvestedArtworks = parameters =>
    axios.get(`${this.baseUrl}frequently-invested`, { params: parameters });

  getTradeHistory = () => axios.get(`${this.baseUrl}trade-history`);

  filterArtworkSrc = source =>
    source.includes('https://res.cloudinary.com') ||
    source.includes('https://instagram')
      ? staticUrls.image.artworkPlaceholder
      : source;
}
