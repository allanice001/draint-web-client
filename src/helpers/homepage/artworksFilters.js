const getFilter = ({ filters, currentKey }) =>
  filters.find(({ key }) => key === currentKey);

const getOption = ({ filters, item }) =>
  getFilter({ filters, currentKey: item.key }).options.find(
    ({ key }) => key === item.value
  );

const transformFilters = ({ filter, item, pagination, option }) => {
  const filters = { ...pagination };
  if (filter?.size?.res) filters.size = filter.size.res;
  if (filter?.orientation?.res) filters.orientation = filter.orientation.res;
  if (filter?.price?.res) filters.price = filter.price.res;
  if (filter?.country?.res) filters.country = filter.country.res;

  if (!!item && !!option) {
    filters[item.key] = option.res;
  }
  return filters;
};

const getPagination = page =>
  page < 2 ? { page: 1, pageSize: 4 } : { page, pageSize: 8 };

const defaultFilter = filters => ({
  page: 1,
  pageSize: 4,
  orientation: getFilter({ filters, currentKey: 'orientation' }).options[0],
  size: getFilter({ filters, currentKey: 'size' }).options[0],
  price: getFilter({ filters, currentKey: 'price' }).options[0],
});

const defaultArtistFilter = filters => ({
  page: 1,
  pageSize: 4,
  price: getFilter({ filters, currentKey: 'price' }).options[0],
  country: getFilter({ filters, currentKey: 'country' }).options[0],
});

export {
  getFilter,
  getOption,
  transformFilters,
  getPagination,
  defaultFilter,
  defaultArtistFilter,
};
