import { TabType } from 'constants/search.constants';

/**
 * Returns all search page tab types divided by "|"
 *
 * @returns {string} "type1|type2|type3"
 */
export const getInlineTabTypes = () => {
  let result = '';
  const array = Object.entries(TabType);

  array.forEach(([_, value], idx) => {
    result += value;
    if (idx !== array.length - 1) {
      result += '|';
    }
  });

  return result;
};
