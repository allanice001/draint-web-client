export const getYearsList = () => {
  const yearList = [];

  for (let i = parseInt(new Date().getFullYear()); i >= 1900; i--) {
    yearList.push({ id: i, key: i, label: i });
  }

  return yearList;
};
