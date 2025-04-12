/**
 * Takes names, return first valid name or empty string
 * @param  {...string} names
 * @returns {string} valid name or empty string
 */
export const getValidName = (...names) => {
  return names.find(name => {
    if (
      name &&
      name.trim().length > 0 &&
      !name.includes('null') &&
      !name.includes('undefined')
    ) {
      return name;
    }
    return '';
  });
};
