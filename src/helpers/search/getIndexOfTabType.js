import { TabList } from 'constants/search.constants';

export const getIndexOfTabType = tabType => {
  let result;

  TabList.forEach((tab, idx) => {
    if (tab.type === tabType) {
      result = idx;
    }
  });

  return result;
};
