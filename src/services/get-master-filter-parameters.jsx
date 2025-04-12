import {
  ACTIVATED_FILTER_NAME,
  ARTWORK_FILTER_NAME,
  COUNTRY_NAME,
  DATE,
  DEFAULT_PAGE,
  DELETED_USER_FILER_NAME,
  FILTER_NAME,
  IMAGE_FILER_NAME,
  INSTAGRAM_FILER_NAME,
  PAGE,
  QUERY_NAME,
  ROLE_FILER_NAME,
  SUBSCRIPTION_FILER_NAME,
} from 'constants/components/master/filters-default';

function filtersCheck(parameters) {
  const filters = Object.values(parameters).filter(value => value !== '');
  if (filters.length === 1) return filters[0];
  if (filters.length === 0) return 'all';
  return false;
}

export function pageCheck(parameters, currentPages) {
  const activeFilter = filtersCheck(parameters);
  if (activeFilter) parameters.page = currentPages[activeFilter];
  else parameters.page = DEFAULT_PAGE;
  return parameters;
}

export function getArtistFilterParameters(data, updatedData = {}) {
  const filters = [
    QUERY_NAME,
    FILTER_NAME,
    SUBSCRIPTION_FILER_NAME,
    DELETED_USER_FILER_NAME,
    ARTWORK_FILTER_NAME,
    ROLE_FILER_NAME,
    IMAGE_FILER_NAME,
    INSTAGRAM_FILER_NAME,
    COUNTRY_NAME,
    DATE,
    PAGE,
    ACTIVATED_FILTER_NAME,
  ];

  const params = filters.reduce((acc, key) => {
    acc[key] = data[key];
    return acc;
  }, {});

  const parameters = {
    ...params,
    ...updatedData,
  };

  const { date, ...rest } = parameters;

  if (date.dateSelected) {
    const { from, to } = date;

    return {
      ...rest,
      from,
      to,
    };
  }

  return rest;
}

export function getArtworkFilterParameters(data, updatedData = {}) {
  const parameters = {
    page: data.page,
    query: data.query,
    filter: data.filter,
    subscriptionFilter: data.subscriptionFilter,
    verifiedFilter: data.verifiedFilter,
    alternateFilter: data.alternateFilter,
    deletedArtworkFilter: data.deletedArtworkFilter,
    ...updatedData,
  };

  if (data.date && data.date.dateSelected) {
    if (data.date.from) parameters.from = data.date.from;
    if (data.date.to) parameters.to = data.date.to;
  }

  return parameters;
}
