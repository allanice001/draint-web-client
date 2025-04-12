export const prepareData = (form) => {
  const result = {};

  Object.keys(form).forEach((key) => {
    result[key] = typeof form[key] === 'string' ? form[key].trim() : form[key];
  });

  return result;
};
