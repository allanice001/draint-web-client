import axios from '../dataLayer/axiosInstance';

const getFormValue = (type, el) => {
  if (['surface', 'medium', 'style'].includes(type)) {
    return `${type}-${el.id}`;
  }

  if (type === 'country') {
    return el.ccode;
  }

  return el.name;
};

export class SearchService {
  baseUrl = '/api/search';

  searchByQuery(parameters) {
    return axios.get(`${this.baseUrl}/`, { params: parameters });
  }

  getTotalCount(parameters) {
    return axios.get(`${this.baseUrl}/total`, { params: parameters });
  }

  getListByType(parameters) {
    return this.searchByQuery(parameters).then(res => {
      res.data.searchData = res.data.searchData.map(el => {
        const formValue = getFormValue(parameters.type, el);
        return {
          ...el,
          formValue,
        };
      });

      return res.data;
    });
  }
}
