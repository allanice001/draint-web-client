export const hasValues = (obj, exclude = []) => {
  let keys = Object.keys(obj);
  if (exclude.length) {
    keys = keys.filter(key => exclude.indexOf(key) < 0);
  }

  return keys.some(key =>
    Array.isArray(obj[key]) ? obj[key].some(v => !!v) : !!obj[key]
  );
};
