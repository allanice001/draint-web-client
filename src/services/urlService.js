export const getStringSearchParameter = string => {
  const search = window.location.search
    .slice(1)
    .split('&')
    .find(v => v.includes(string));
  return search !== undefined ? search.split('=')[1] : '';
};
