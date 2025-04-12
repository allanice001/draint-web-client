/**
 * @example
 * getParameterValues('foo', 'bar')
 * //returns '(foo|bar)'
 * @param  {...string} values
 * @returns {string}
 */
export const getParameterValues = (...values) => {
  const result = values.join('|').split();
  result.unshift('(');
  result.push(')');
  return result.join('');
};
