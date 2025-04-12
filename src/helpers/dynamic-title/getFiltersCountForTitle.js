import { TabType } from 'constants/search.constants';

export const getFiltersCount = filters => {
  return Object.keys(filters).reduce((acc, curr) => {
    switch (curr) {
      case TabType.Medium:
      case TabType.Surface:
      case TabType.Countries:
      case TabType.Style: {
        return ++acc;
      }

      default: {
        return acc;
      }
    }
  }, 0);
};
